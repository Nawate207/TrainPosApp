// リクエスト処理の本体。Azure Functions の型に依存させず、単体テストできるようにしてある。

import { isAllowedLine } from './allowlist';
import { CacheResult, TtlCache } from './cache';
import { Config, normalizeOrigin } from './config';
import { RateLimiter } from './rateLimit';
import { UpstreamError } from './upstream';

/** リクエストのうち、処理に必要な部分だけを抜き出したもの */
export interface ProxyRequest {
    origin: string | null;
    contentType: string | null;
    clientIp: string;
    readBody(): Promise<string>;
}

export interface ProxyResponse {
    status: number;
    /** JSON として返す内容 */
    body: unknown;
    headers: Record<string, string>;
}

export interface ProxyDeps {
    config: Config;
    cache: TtlCache<unknown>;
    limiter: RateLimiter;
    /** 検証済みの (flowType, getLineName) で上流を呼び出す */
    loadUpstream(flowType: string, lineName: string): Promise<unknown>;
    log(message: string): void;
}

/** 受け付けるリクエスト本文の最大サイズ（バイト）。{ "getLineName": "...", "flowType": "..." } には十分な大きさ */
const MAX_BODY_BYTES = 1024;

const BASE_HEADERS: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
};

function reply(status: number, body: unknown, extra: Record<string, string> = {}): ProxyResponse {
    return { status, body, headers: { ...BASE_HEADERS, ...extra } };
}

function error(status: number, code: string, extra: Record<string, string> = {}): ProxyResponse {
    return reply(status, { error: code }, extra);
}

export async function handleLineTrains(req: ProxyRequest, deps: ProxyDeps): Promise<ProxyResponse> {
    const { config } = deps;

    // 1. Origin の確認（ブラウザ以外からは偽装できるため、境界ではなく多層防御の一つ）
    if (req.origin !== null && !config.allowedOrigins.has(normalizeOrigin(req.origin))) {
        return error(403, 'origin_not_allowed');
    }

    // 2. レート制限
    const decision = deps.limiter.check(req.clientIp);
    if (!decision.allowed) {
        return error(429, 'too_many_requests', { 'Retry-After': String(decision.retryAfterSeconds) });
    }

    // 3. 入力の検証（形式・サイズ・内容）。許可リストに無い値は上流へ転送しない
    if (!(req.contentType ?? '').toLowerCase().includes('application/json')) {
        return error(415, 'content_type_must_be_json');
    }
    const raw = await req.readBody();
    if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) return error(413, 'request_too_large');

    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch {
        return error(400, 'invalid_json');
    }
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return error(400, 'invalid_request');

    const { getLineName, flowType } = parsed as Record<string, unknown>;
    if (!isAllowedLine(flowType, getLineName)) return error(400, 'unknown_line');
    const lineName = getLineName as string;

    // 4. キャッシュ経由で上流を呼び出す
    let result: CacheResult<unknown>;
    try {
        result = await deps.cache.getOrLoad(`${flowType}\u0000${lineName}`, () => deps.loadUpstream(flowType, lineName));
    } catch (e) {
        // 詳細はサーバーのログにだけ残し、利用者には一般的なメッセージだけを返す
        const detail = e instanceof UpstreamError ? `${e.message}${e.status ? ` (status ${e.status})` : ''}` : 'unexpected error';
        deps.log(`upstream failure for ${flowType}/${lineName}: ${detail}`);
        return error(502, 'upstream_unavailable');
    }

    return reply(200, result.value, { 'X-Cache': result.source });
}

/**
 * クライアント IP の取り出し。x-forwarded-for は、利用者が自分で付けた値の後ろに、
 * Azure のフロントエンドが実際の接続元を追記するため、右端の値を使う（左端は偽装できる）。
 */
export function clientIpFrom(forwardedFor: string | null): string {
    if (!forwardedFor) return 'unknown';
    const parts = forwardedFor.split(',').map(s => s.trim()).filter(s => s !== '');
    const last = parts[parts.length - 1];
    if (!last) return 'unknown';
    // "1.2.3.4:5678" → "1.2.3.4"、"[2001:db8::1]:443" → "2001:db8::1"
    const bracketed = /^\[([^\]]+)\](?::\d+)?$/.exec(last);
    if (bracketed) return bracketed[1];
    const ipv4WithPort = /^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/.exec(last);
    return ipv4WithPort ? ipv4WithPort[1] : last;
}

/**
 * レート制限のキー。IPv6 は、1 つの利用者が /64 の範囲で多数のアドレスを使い分けられるため、
 * 先頭 64 ビット（/64）にまとめる。IPv4 と、IPv4 射影アドレス（::ffff:a.b.c.d）はそのまま使う。
 */
export function ipBucket(ip: string): string {
    if (!ip.includes(':')) return ip;
    const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(ip);
    if (mapped) return mapped[1];
    if (ip.includes('.')) return ip;

    const halves = ip.split('::');
    if (halves.length > 2) return ip;
    const head = halves[0] ? halves[0].split(':') : [];
    const tail = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
    let groups: string[];
    if (halves.length === 2) {
        const missing = 8 - head.length - tail.length;
        if (missing < 0) return ip;
        groups = [...head, ...new Array<string>(missing).fill('0'), ...tail];
    } else {
        groups = head;
    }
    if (groups.length !== 8) return ip;
    return groups.slice(0, 4).map(g => (parseInt(g, 16) || 0).toString(16)).join(':') + '::/64';
}
