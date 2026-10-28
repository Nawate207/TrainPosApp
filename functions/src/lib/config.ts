// 環境変数（Function App のアプリ設定）から読み取る設定値。不正な値や範囲外の値は、既定値に丸める。

export interface Config {
    /** 上流（Logic Apps）の署名付き URL。ブラウザには出さず、アプリ設定または Key Vault 参照で持つ */
    logicAppUrl: string;
    /** 呼び出しを許可するブラウザの Origin（GitHub Pages の https://<account>.github.io など） */
    allowedOrigins: ReadonlySet<string>;
    /** 取得結果をそのまま返す期間（ミリ秒） */
    cacheTtlMs: number;
    /** 上流が失敗したときに、古い結果を代わりに返してよい期間（ミリ秒） */
    staleIfErrorMs: number;
    /** 1 クライアント（IP）あたりの、1 分間の上限リクエスト数 */
    rateLimitPerMinute: number;
    /** 上流の応答を待つ最大時間（ミリ秒） */
    upstreamTimeoutMs: number;
}

function intFromEnv(env: NodeJS.ProcessEnv, name: string, fallback: number, min: number, max: number): number {
    const raw = env[name];
    if (raw === undefined || raw.trim() === '') return fallback;
    const value = Number(raw);
    if (!Number.isInteger(value) || value < min || value > max) return fallback;
    return value;
}

/** Origin の最大長。これより長いものは、正規の Origin ではないため扱わない */
const MAX_ORIGIN_LENGTH = 256;

/**
 * Origin の末尾のスラッシュを 1 つだけ取り除く（"https://a.github.io/" → "https://a.github.io"）。
 * 正規表現で連続するスラッシュを繰り返し取り除くと、長い入力で処理時間が二乗で増えるため、使わない。
 * 長すぎる値は空文字にして、許可リストに一致しないようにする。
 */
export function normalizeOrigin(origin: string): string {
    if (origin.length > MAX_ORIGIN_LENGTH) return '';
    return origin.endsWith('/') ? origin.slice(0, -1) : origin;
}

/**
 * 上流の URL として受け付けるのは、https の Logic Apps（*.logic.azure.com）のみ。
 * 設定ミスや改ざんで、任意のホストへ中継してしまう（SSRF）ことを防ぐ。
 * ローカルでの動作確認のため、localhost / 127.0.0.1 は http でも許可する。
 */
export function isAllowedUpstreamUrl(value: string): boolean {
    let url: URL;
    try {
        url = new URL(value);
    } catch {
        return false;
    }
    if (url.username !== '' || url.password !== '') return false;
    if (url.protocol === 'https:' && url.hostname.endsWith('.logic.azure.com')) return true;
    return url.protocol === 'http:' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1');
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
    const origins = (env.ALLOWED_ORIGINS ?? '')
        .split(',')
        .map(s => normalizeOrigin(s.trim()))
        .filter(s => s !== '');
    const upstreamUrl = env.LOGIC_APP_URL ?? '';
    return {
        // 不正な URL は「未設定」として扱う（呼び出し時に 502 となり、サーバーのログに原因が残る）
        logicAppUrl: isAllowedUpstreamUrl(upstreamUrl) ? upstreamUrl : '',
        allowedOrigins: new Set(origins),
        cacheTtlMs: intFromEnv(env, 'CACHE_TTL_SECONDS', 30, 0, 3600) * 1000,
        staleIfErrorMs: intFromEnv(env, 'STALE_IF_ERROR_SECONDS', 300, 0, 86400) * 1000,
        rateLimitPerMinute: intFromEnv(env, 'RATE_LIMIT_PER_MINUTE', 30, 1, 10000),
        upstreamTimeoutMs: intFromEnv(env, 'UPSTREAM_TIMEOUT_MS', 15000, 1000, 60000),
    };
}
