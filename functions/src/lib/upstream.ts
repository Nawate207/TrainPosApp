// 上流（Logic Apps）の呼び出し。署名付き URL はここ（サーバー側）だけが知る。

/** 上流の応答として受け付ける最大サイズ（バイト）。想定外に大きな応答でメモリを消費しないための上限 */
const MAX_RESPONSE_BYTES = 2_000_000;

export class UpstreamError extends Error {
    constructor(message: string, readonly status?: number) {
        super(message);
        this.name = 'UpstreamError';
    }
}

export type Fetcher = typeof fetch;

/**
 * Logic Apps に { getLineName, flowType } を POST し、JSON を返す。
 * 呼び出し側で許可リスト検証を済ませた値だけを渡すこと。
 */
export async function fetchUpstream(
    url: string,
    flowType: string,
    lineName: string,
    timeoutMs: number,
    fetcher: Fetcher = fetch,
): Promise<unknown> {
    if (url === '') throw new UpstreamError('LOGIC_APP_URL is not configured');

    let response: Response;
    try {
        response = await fetcher(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ getLineName: lineName, flowType }),
            signal: AbortSignal.timeout(timeoutMs),
            // リダイレクトには従わない（署名付き URL を含むリクエストを、別のホストへ転送させない）
            redirect: 'error',
        });
    } catch (error) {
        // タイムアウト・接続エラー。URL（署名を含む）がメッセージに入らないよう、種類だけを残す
        const name = error instanceof Error ? error.name : 'Error';
        throw new UpstreamError(`upstream request failed (${name})`);
    }

    if (!response.ok) throw new UpstreamError('upstream returned an error status', response.status);

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) throw new UpstreamError('upstream did not return JSON', response.status);

    const declaredLength = Number(response.headers.get('content-length') ?? '0');
    if (declaredLength > MAX_RESPONSE_BYTES) throw new UpstreamError('upstream response too large', response.status);

    const text = await response.text();
    if (text.length > MAX_RESPONSE_BYTES) throw new UpstreamError('upstream response too large', response.status);

    try {
        return JSON.parse(text);
    } catch {
        throw new UpstreamError('upstream returned invalid JSON', response.status);
    }
}
