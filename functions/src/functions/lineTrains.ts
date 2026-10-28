// HTTP トリガー（POST /api/line-trains）。
// ブラウザ → この関数 → Logic Apps の順に呼び出す。署名付き URL は、アプリ設定 LOGIC_APP_URL にだけ置く。
//
// authLevel を 'anonymous' にしている理由：ブラウザに関数キーを持たせても、公開された鍵になり意味がないため。
// 代わりに、Origin 確認・許可リスト検証・レート制限・キャッシュ・インスタンス数の上限で保護する。

import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { TtlCache } from '../lib/cache';
import { loadConfig } from '../lib/config';
import { clientIpFrom, handleLineTrains, ipBucket, ProxyDeps } from '../lib/handler';
import { RateLimiter } from '../lib/rateLimit';
import { fetchUpstream } from '../lib/upstream';

const config = loadConfig();
const cache = new TtlCache<unknown>(config.cacheTtlMs, config.staleIfErrorMs);
const limiter = new RateLimiter(config.rateLimitPerMinute);

export async function lineTrains(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const deps: ProxyDeps = {
        config,
        cache,
        limiter,
        loadUpstream: (flowType, lineName) => fetchUpstream(config.logicAppUrl, flowType, lineName, config.upstreamTimeoutMs),
        log: message => context.warn(message),
    };

    const result = await handleLineTrains(
        {
            origin: request.headers.get('origin'),
            contentType: request.headers.get('content-type'),
            clientIp: ipBucket(clientIpFrom(request.headers.get('x-forwarded-for'))),
            readBody: () => request.text(),
        },
        deps,
    );

    return {
        status: result.status,
        headers: result.headers,
        body: JSON.stringify(result.body),
    };
}

app.http('lineTrains', {
    route: 'line-trains',
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: lineTrains,
});
