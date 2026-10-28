// 有効期限付きのメモリキャッシュ。
// ・同じキーの取得が同時に走った場合は、上流への呼び出しを 1 回にまとめる（アクセス集中時の保護）
// ・上流が失敗した場合は、一定期間内の古い結果を代わりに返す（stale-if-error）
// ※ メモリ上のキャッシュはインスタンスごとに別々で、スケールインや再起動で消える（十数人規模では十分）

export type CacheSource = 'miss' | 'hit' | 'stale' | 'shared';

export interface CacheResult<T> {
    value: T;
    source: CacheSource;
}

interface Entry<T> {
    value: T;
    storedAt: number;
}

export class TtlCache<T> {
    private readonly entries = new Map<string, Entry<T>>();
    private readonly inFlight = new Map<string, Promise<T>>();

    constructor(
        private readonly ttlMs: number,
        private readonly staleIfErrorMs: number,
        private readonly maxEntries = 200,
        private readonly now: () => number = Date.now,
    ) {}

    async getOrLoad(key: string, loader: () => Promise<T>): Promise<CacheResult<T>> {
        const current = this.entries.get(key);
        if (current && this.now() - current.storedAt < this.ttlMs) {
            return { value: current.value, source: 'hit' };
        }

        const pending = this.inFlight.get(key);
        if (pending) {
            return { value: await this.withStaleFallback(key, pending), source: 'shared' };
        }

        const promise = loader();
        this.inFlight.set(key, promise);
        try {
            const value = await promise;
            this.store(key, value);
            return { value, source: 'miss' };
        } catch (error) {
            const stale = this.staleValue(key);
            if (stale !== undefined) return { value: stale, source: 'stale' };
            throw error;
        } finally {
            this.inFlight.delete(key);
        }
    }

    private async withStaleFallback(key: string, pending: Promise<T>): Promise<T> {
        try {
            return await pending;
        } catch (error) {
            const stale = this.staleValue(key);
            if (stale !== undefined) return stale;
            throw error;
        }
    }

    private staleValue(key: string): T | undefined {
        const entry = this.entries.get(key);
        if (entry && this.now() - entry.storedAt < this.ttlMs + this.staleIfErrorMs) return entry.value;
        return undefined;
    }

    private store(key: string, value: T): void {
        this.entries.delete(key);
        this.entries.set(key, { value, storedAt: this.now() });
        // 件数の上限を超えたら、古いものから捨てる（メモリの無制限な増加を防ぐ）
        while (this.entries.size > this.maxEntries) {
            const oldest = this.entries.keys().next().value;
            if (oldest === undefined) break;
            this.entries.delete(oldest);
        }
    }
}
