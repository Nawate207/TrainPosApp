import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isAllowedLine } from '../src/lib/allowlist';
import { TtlCache } from '../src/lib/cache';
import { loadConfig, isAllowedUpstreamUrl, normalizeOrigin } from '../src/lib/config';
import { RateLimiter } from '../src/lib/rateLimit';

test('許可リスト：定義済みの組み合わせだけを通す', () => {
    assert.equal(isAllowedLine('Toei', '1'), true);
    assert.equal(isAllowedLine('Jrc', 'zaisenichijoho_99999'), true);
    assert.equal(isAllowedLine('KinkiUrban', 'kyoto'), true);
    assert.equal(isAllowedLine('Aonami', 'Aonami'), true);
});

test('許可リスト：未定義・型違い・プロトタイプ汚染系の値を拒否する', () => {
    assert.equal(isAllowedLine('Toei', '9'), false);
    assert.equal(isAllowedLine('Toei', 'kyoto'), false, 'flowType と路線コードの組み合わせ違い');
    assert.equal(isAllowedLine('Unknown', '1'), false);
    assert.equal(isAllowedLine('constructor', '1'), false);
    assert.equal(isAllowedLine('__proto__', '1'), false);
    assert.equal(isAllowedLine('Toei', '__proto__'), false);
    assert.equal(isAllowedLine('Toei', 1), false);
    assert.equal(isAllowedLine(undefined, undefined), false);
    assert.equal(isAllowedLine('Toei', '1 OR 1=1'), false);
});

test('設定：不正な値は既定値に丸める', () => {
    const c = loadConfig({ CACHE_TTL_SECONDS: 'abc', RATE_LIMIT_PER_MINUTE: '-5', UPSTREAM_TIMEOUT_MS: '999999', ALLOWED_ORIGINS: ' https://a.github.io/ , ,http://localhost:8765 ' });
    assert.equal(c.cacheTtlMs, 30_000);
    assert.equal(c.rateLimitPerMinute, 30);
    assert.equal(c.upstreamTimeoutMs, 15_000);
    assert.deepEqual([...c.allowedOrigins].sort(), ['http://localhost:8765', 'https://a.github.io']);
    assert.equal(c.logicAppUrl, '');
});

test('キャッシュ：TTL 内は上流を呼ばず、期限後は再取得する', async () => {
    let t = 0;
    let calls = 0;
    const cache = new TtlCache<number>(1000, 5000, 10, () => t);
    const load = async () => ++calls;
    assert.deepEqual(await cache.getOrLoad('k', load), { value: 1, source: 'miss' });
    t = 999;
    assert.deepEqual(await cache.getOrLoad('k', load), { value: 1, source: 'hit' });
    t = 1000;
    assert.deepEqual(await cache.getOrLoad('k', load), { value: 2, source: 'miss' });
    assert.equal(calls, 2);
});

test('キャッシュ：同時リクエストは上流呼び出しを 1 回にまとめる', async () => {
    let calls = 0;
    const cache = new TtlCache<string>(1000, 0);
    const load = async () => { calls++; await new Promise(r => setTimeout(r, 20)); return 'v'; };
    const results = await Promise.all([cache.getOrLoad('k', load), cache.getOrLoad('k', load), cache.getOrLoad('k', load)]);
    assert.equal(calls, 1);
    assert.deepEqual(results.map(r => r.source).sort(), ['miss', 'shared', 'shared']);
});

test('キャッシュ：上流が失敗したら、期限内の古い結果を返す。無ければ例外', async () => {
    let t = 0;
    const cache = new TtlCache<string>(1000, 5000, 10, () => t);
    await cache.getOrLoad('k', async () => 'old');
    t = 3000;
    const failing = async () => { throw new Error('boom'); };
    assert.deepEqual(await cache.getOrLoad('k', failing), { value: 'old', source: 'stale' });
    t = 6001;
    await assert.rejects(() => cache.getOrLoad('k', failing), /boom/);
    await assert.rejects(() => cache.getOrLoad('other', failing), /boom/);
});

test('キャッシュ：件数の上限を超えたら古いものから捨てる', async () => {
    const cache = new TtlCache<number>(60_000, 0, 2);
    let calls = 0;
    const load = async () => ++calls;
    await cache.getOrLoad('a', load); await cache.getOrLoad('b', load); await cache.getOrLoad('c', load);
    assert.equal((await cache.getOrLoad('a', load)).source, 'miss', 'a は押し出されている');
    assert.equal((await cache.getOrLoad('c', load)).source, 'hit');
});

test('レート制限：上限までは通し、超えたら Retry-After 付きで拒否。ウィンドウ経過で回復', () => {
    let t = 0;
    const limiter = new RateLimiter(3, 100, () => t);
    for (let i = 0; i < 3; i++) assert.equal(limiter.check('1.1.1.1').allowed, true);
    const denied = limiter.check('1.1.1.1');
    assert.equal(denied.allowed, false);
    assert.equal(denied.retryAfterSeconds, 60);
    assert.equal(limiter.check('2.2.2.2').allowed, true, '別の IP は別カウント');
    t = 30_000;
    assert.equal(limiter.check('1.1.1.1').retryAfterSeconds, 30);
    t = 60_000;
    assert.equal(limiter.check('1.1.1.1').allowed, true);
});

test('レート制限：キー数が上限に達しても無制限に増えない', () => {
    let t = 0;
    const limiter = new RateLimiter(1, 3, () => t);
    for (let i = 0; i < 20; i++) limiter.check('ip' + i);
    assert.equal(limiter.check('ip-new').allowed, true);
});

test('Origin の正規化：末尾スラッシュは 1 つだけ除き、長大な入力は一致しない値にする', () => {
    assert.equal(normalizeOrigin('https://a.github.io'), 'https://a.github.io');
    assert.equal(normalizeOrigin('https://a.github.io/'), 'https://a.github.io');
    assert.equal(normalizeOrigin('https://a.github.io//'), 'https://a.github.io/', '2 つ目以降は残す（許可リストに一致しない）');
    assert.equal(normalizeOrigin('x'.repeat(257)), '');
    const started = performance.now();
    normalizeOrigin('/'.repeat(100_000));
    assert.ok(performance.now() - started < 50, '連続スラッシュの長い入力でも、処理時間が増えない');
});

test('上流 URL の検証：https の Logic Apps だけを許可（ローカル検証用の localhost は http も可）', () => {
    const ok = [
        'https://prod-38.japaneast.logic.azure.com:443/workflows/x/triggers/t/paths/invoke?sig=S',
        'http://127.0.0.1:8080/x', 'http://localhost:7000/x',
    ];
    const ng = [
        '', 'not a url', 'http://prod-38.japaneast.logic.azure.com/x', 'https://evil.example/x',
        'https://logic.azure.com.evil.example/x', 'https://x.logic.azure.com@evil.example/x',
        'https://user:pw@x.logic.azure.com/x', 'ftp://x.logic.azure.com/x', 'http://169.254.169.254/latest',
    ];
    for (const u of ok) assert.equal(isAllowedUpstreamUrl(u), true, u);
    for (const u of ng) assert.equal(isAllowedUpstreamUrl(u), false, u);
    assert.equal(loadConfig({ LOGIC_APP_URL: 'https://evil.example/x' }).logicAppUrl, '', '不正な URL は未設定として扱う');
    assert.equal(loadConfig({ LOGIC_APP_URL: 'https://a.logic.azure.com/x' }).logicAppUrl, 'https://a.logic.azure.com/x');
});
