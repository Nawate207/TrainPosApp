import assert from 'node:assert/strict';
import { test } from 'node:test';
import { TtlCache } from '../src/lib/cache';
import { loadConfig } from '../src/lib/config';
import { clientIpFrom, handleLineTrains, ipBucket, ProxyDeps, ProxyRequest } from '../src/lib/handler';
import { RateLimiter } from '../src/lib/rateLimit';
import { fetchUpstream, UpstreamError } from '../src/lib/upstream';

const ORIGIN = 'https://example.github.io';

function makeDeps(overrides: Partial<ProxyDeps> = {}, env: NodeJS.ProcessEnv = {}) {
    const logs: string[] = [];
    const upstreamCalls: Array<[string, string]> = [];
    const config = loadConfig({ ALLOWED_ORIGINS: ORIGIN, LOGIC_APP_URL: 'https://logic.example/secret?sig=SECRET', ...env });
    const deps: ProxyDeps = {
        config,
        cache: new TtlCache<unknown>(config.cacheTtlMs, config.staleIfErrorMs),
        limiter: new RateLimiter(config.rateLimitPerMinute),
        loadUpstream: async (flowType, lineName) => { upstreamCalls.push([flowType, lineName]); return [{ ok: true }]; },
        log: m => logs.push(m),
        ...overrides,
    };
    return { deps, logs, upstreamCalls };
}

function req(body: unknown, init: Partial<ProxyRequest> = {}): ProxyRequest {
    return {
        origin: ORIGIN,
        contentType: 'application/json',
        clientIp: '203.0.113.1',
        readBody: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
        ...init,
    };
}

test('正常系：許可された路線は上流の結果を返し、2 回目はキャッシュを使う', async () => {
    const { deps, upstreamCalls } = makeDeps();
    const first = await handleLineTrains(req({ getLineName: '1', flowType: 'Toei' }), deps);
    assert.equal(first.status, 200);
    assert.deepEqual(first.body, [{ ok: true }]);
    assert.equal(first.headers['X-Cache'], 'miss');
    assert.equal(first.headers['Cache-Control'], 'no-store');
    assert.equal(first.headers['X-Content-Type-Options'], 'nosniff');
    const second = await handleLineTrains(req({ getLineName: '1', flowType: 'Toei' }), deps);
    assert.equal(second.headers['X-Cache'], 'hit');
    assert.equal(upstreamCalls.length, 1);
});

test('Origin：許可外は 403 で、上流は呼ばない。Origin なし（サーバー間）は通す', async () => {
    const { deps, upstreamCalls } = makeDeps();
    assert.equal((await handleLineTrains(req({ getLineName: '1', flowType: 'Toei' }, { origin: 'https://evil.example' }), deps)).status, 403);
    assert.equal(upstreamCalls.length, 0);
    assert.equal((await handleLineTrains(req({ getLineName: '1', flowType: 'Toei' }, { origin: ORIGIN + '/' }), deps)).status, 200, '末尾スラッシュは無視');
    assert.equal((await handleLineTrains(req({ getLineName: '2', flowType: 'Toei' }, { origin: null }), deps)).status, 200);
});

test('入力検証：不正な値は 4xx で、上流へ転送しない', async () => {
    const { deps, upstreamCalls } = makeDeps();
    const cases: Array<[string, ProxyRequest, number]> = [
        ['未許可の路線', req({ getLineName: 'evil', flowType: 'Toei' }), 400],
        ['未許可の flowType', req({ getLineName: '1', flowType: 'Shell' }), 400],
        ['URL 注入の試み', req({ getLineName: '../../admin?x=', flowType: 'Toei' }), 400],
        ['型違い', req({ getLineName: 1, flowType: 'Toei' }), 400],
        ['壊れた JSON', req('{not json'), 400],
        ['配列', req([{ getLineName: '1', flowType: 'Toei' }]), 400],
        ['null', req('null'), 400],
        ['JSON ではない Content-Type', req({ getLineName: '1', flowType: 'Toei' }, { contentType: 'text/plain' }), 415],
        ['Content-Type なし', req({ getLineName: '1', flowType: 'Toei' }, { contentType: null }), 415],
        ['大きすぎる本文', req({ getLineName: '1', flowType: 'Toei', pad: 'x'.repeat(2000) }), 413],
    ];
    for (const [name, r, status] of cases) {
        const res = await handleLineTrains(r, deps);
        assert.equal(res.status, status, name);
    }
    assert.equal(upstreamCalls.length, 0);
});

test('レート制限：超過は 429 と Retry-After。上流の負荷にもならない', async () => {
    const { deps, upstreamCalls } = makeDeps({}, { RATE_LIMIT_PER_MINUTE: '2' });
    const call = () => handleLineTrains(req({ getLineName: '1', flowType: 'Toei' }), deps);
    assert.equal((await call()).status, 200);
    assert.equal((await call()).status, 200);
    const limited = await call();
    assert.equal(limited.status, 429);
    assert.ok(Number(limited.headers['Retry-After']) >= 1);
    assert.equal(upstreamCalls.length, 1, 'キャッシュのおかげで上流は 1 回だけ');
    const other = await handleLineTrains(req({ getLineName: '1', flowType: 'Toei' }, { clientIp: '198.51.100.9' }), deps);
    assert.equal(other.status, 200);
});

test('上流エラー：利用者には一般的な 502 だけを返し、署名付き URL を漏らさない', async () => {
    const { deps, logs } = makeDeps({ loadUpstream: async () => { throw new UpstreamError('upstream returned an error status', 500); } });
    const res = await handleLineTrains(req({ getLineName: '1', flowType: 'Toei' }), deps);
    assert.equal(res.status, 502);
    assert.deepEqual(res.body, { error: 'upstream_unavailable' });
    assert.ok(!JSON.stringify(res).includes('SECRET'));
    assert.ok(logs.some(l => l.includes('Toei/1') && l.includes('status 500')));
    assert.ok(!logs.join('\n').includes('SECRET'));
});

test('上流エラー：予期しない例外でも内容を返さない', async () => {
    const { deps } = makeDeps({ loadUpstream: async () => { throw new Error('connect ECONNREFUSED https://logic.example/secret?sig=SECRET'); } });
    const res = await handleLineTrains(req({ getLineName: '1', flowType: 'Toei' }), deps);
    assert.equal(res.status, 502);
    assert.ok(!JSON.stringify(res).includes('SECRET'));
});

test('clientIpFrom：右端の値を使い、ポートや括弧を除く', () => {
    assert.equal(clientIpFrom(null), 'unknown');
    assert.equal(clientIpFrom(''), 'unknown');
    assert.equal(clientIpFrom('203.0.113.7:51234'), '203.0.113.7');
    assert.equal(clientIpFrom('6.6.6.6, 203.0.113.7:51234'), '203.0.113.7', '左端（利用者が付けられる値）は使わない');
    assert.equal(clientIpFrom('[2001:db8::1]:443'), '2001:db8::1');
    assert.equal(clientIpFrom('2001:db8::1'), '2001:db8::1');
});

test('fetchUpstream：URL・本文・タイムアウトを渡し、JSON を返す', async () => {
    let seen: { url: string; init: RequestInit } | undefined;
    const fetcher = (async (url: string, init: RequestInit) => {
        seen = { url, init };
        return new Response(JSON.stringify([1, 2]), { status: 200, headers: { 'content-type': 'application/json; charset=utf-8' } });
    }) as unknown as typeof fetch;
    const data = await fetchUpstream('https://logic.example/x?sig=S', 'Toei', '1', 5000, fetcher);
    assert.deepEqual(data, [1, 2]);
    assert.equal(seen?.url, 'https://logic.example/x?sig=S');
    assert.equal(seen?.init.method, 'POST');
    assert.deepEqual(JSON.parse(String(seen?.init.body)), { getLineName: '1', flowType: 'Toei' });
    assert.ok(seen?.init.signal instanceof AbortSignal);
});

test('ipBucket：IPv6 は /64 にまとめ、IPv4 と IPv4 射影アドレスはそのまま', () => {
    assert.equal(ipBucket('203.0.113.7'), '203.0.113.7');
    assert.equal(ipBucket('::ffff:203.0.113.7'), '203.0.113.7');
    assert.equal(ipBucket('unknown'), 'unknown');
    assert.equal(ipBucket('2001:db8::1'), ipBucket('2001:db8::ffff'), '同じ /64 は同じキー');
    assert.equal(ipBucket('2001:0db8:0000:0000:aaaa:bbbb:cccc:dddd'), ipBucket('2001:db8::1'), '表記ゆれがあっても同じキー');
    assert.notEqual(ipBucket('2001:db8:0:1::1'), ipBucket('2001:db8::1'), '/64 が違えば別キー');
    assert.equal(ipBucket('2001:db8::1'), '2001:db8:0:0::/64');
    assert.equal(ipBucket('1:2:3:4:5:6:7:8:9'), '1:2:3:4:5:6:7:8:9', '不正な形式は変換しない');
});

test('Origin：連続スラッシュの長大な値でも、素早く 403 を返す', async () => {
    const { deps } = makeDeps();
    const started = performance.now();
    const res = await handleLineTrains(req({ getLineName: '1', flowType: 'Toei' }, { origin: '/'.repeat(16_000) }), deps);
    assert.equal(res.status, 403);
    assert.ok(performance.now() - started < 50);
});

test('fetchUpstream：リダイレクトには従わない', async () => {
    let init: RequestInit | undefined;
    const fetcher = (async (_url: string, i: RequestInit) => { init = i; return new Response('[]', { status: 200, headers: { 'content-type': 'application/json' } }); }) as unknown as typeof fetch;
    await fetchUpstream('https://x.logic.azure.com/x', 'Toei', '1', 1000, fetcher);
    assert.equal(init?.redirect, 'error');
});

test('fetchUpstream：異常な応答は UpstreamError（URL は含めない）', async () => {
    const mk = (res: Response | Error) => (async () => { if (res instanceof Error) throw res; return res; }) as unknown as typeof fetch;
    const URL_ = 'https://logic.example/x?sig=SECRET';
    await assert.rejects(() => fetchUpstream('', 'Toei', '1', 1000, mk(new Response('[]'))), /not configured/);
    await assert.rejects(() => fetchUpstream(URL_, 'Toei', '1', 1000, mk(new Response('x', { status: 500 }))), (e: unknown) => e instanceof UpstreamError && e.status === 500);
    await assert.rejects(() => fetchUpstream(URL_, 'Toei', '1', 1000, mk(new Response('<html>', { status: 200, headers: { 'content-type': 'text/html' } }))), /did not return JSON/);
    await assert.rejects(() => fetchUpstream(URL_, 'Toei', '1', 1000, mk(new Response('{bad', { status: 200, headers: { 'content-type': 'application/json' } }))), /invalid JSON/);
    await assert.rejects(() => fetchUpstream(URL_, 'Toei', '1', 1000, mk(new Response('[]', { status: 200, headers: { 'content-type': 'application/json', 'content-length': '99999999' } }))), /too large/);
    await assert.rejects(() => fetchUpstream(URL_, 'Toei', '1', 1000, mk(Object.assign(new Error(`failed ${URL_}`), { name: 'TimeoutError' }))), (e: unknown) => e instanceof UpstreamError && !e.message.includes('SECRET') && e.message.includes('TimeoutError'));
});
