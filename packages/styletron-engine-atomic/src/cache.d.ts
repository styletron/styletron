import SequentialIDGenerator from "./sequential-id-generator";
declare type OnNewCacheFn<T> = (c: string, b: Cache<T>, a?: string | null) => any;
declare type OnNewValueFn<T> = (cache: Cache<T>, id: string, value: T) => any;
export declare class MultiCache<T> {
    caches: {
        [x: string]: Cache<T>;
    };
    idGenerator: SequentialIDGenerator;
    onNewCache: OnNewCacheFn<T>;
    onNewValue: OnNewValueFn<T>;
    sortedCacheKeys: string[];
    constructor(idGenerator: SequentialIDGenerator, onNewCache: OnNewCacheFn<T>, onNewValue: OnNewValueFn<T>);
    getCache(key: string): Cache<T>;
    getSortedCacheKeys(): string[];
}
export declare class Cache<T> {
    cache: {
        [x: string]: string;
    };
    idGenerator: SequentialIDGenerator;
    key: string;
    onNewValue: (cache: Cache<T>, id: string, value: any) => any;
    constructor(idGenerator: SequentialIDGenerator, onNewValue: (cache: Cache<T>, id: string, value: any) => any);
    addValue(key: string, value: T): string;
}
export {};
