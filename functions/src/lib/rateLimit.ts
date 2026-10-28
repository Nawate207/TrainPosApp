// 固定ウィンドウ（1 分）方式の簡易レート制限。キーはクライアントの IP アドレス。
// ※ インスタンスごとのメモリ上で数えるため、複数インスタンスに分散した場合は厳密ではない。
//   Function App の「最大インスタンス数」を小さく絞って併用する（README 参照）。

interface Counter {
    windowStart: number;
    count: number;
}

export interface RateLimitDecision {
    allowed: boolean;
    /** 拒否した場合に、再試行できるまでの秒数 */
    retryAfterSeconds: number;
}

export class RateLimiter {
    private readonly counters = new Map<string, Counter>();
    private static readonly WINDOW_MS = 60_000;

    constructor(
        private readonly limitPerMinute: number,
        private readonly maxKeys = 5000,
        private readonly now: () => number = Date.now,
    ) {}

    check(key: string): RateLimitDecision {
        const t = this.now();
        this.evictExpired(t);

        const counter = this.counters.get(key);
        if (!counter || t - counter.windowStart >= RateLimiter.WINDOW_MS) {
            this.counters.set(key, { windowStart: t, count: 1 });
            return { allowed: true, retryAfterSeconds: 0 };
        }
        if (counter.count >= this.limitPerMinute) {
            const retryAfterMs = RateLimiter.WINDOW_MS - (t - counter.windowStart);
            return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
        }
        counter.count += 1;
        return { allowed: true, retryAfterSeconds: 0 };
    }

    // キーが増え続けないよう、期限切れのものを掃除する。それでも上限を超える場合は全消去（安全側に倒す）
    private evictExpired(t: number): void {
        if (this.counters.size < this.maxKeys) return;
        for (const [key, counter] of this.counters) {
            if (t - counter.windowStart >= RateLimiter.WINDOW_MS) this.counters.delete(key);
        }
        if (this.counters.size >= this.maxKeys) this.counters.clear();
    }
}
