import SequentialIDGenerator from "./sequential-id-generator";
import sortMq from "./sort-css-media-queries";

type OnNewCacheFn<T> = (
  key: string,
  cache: Cache<T>,
  value?: string | null,
) => any;
type OnNewValueFn<T> = (cache: Cache<T>, id: string, value: T) => any;

export class MultiCache<T> {
  caches: {
    [x: string]: Cache<T>;
  };
  idGenerator: SequentialIDGenerator;
  onNewCache: OnNewCacheFn<T>;
  onNewValue: OnNewValueFn<T>;
  sortedCacheKeys: string[];

  constructor(
    idGenerator: SequentialIDGenerator,
    onNewCache: OnNewCacheFn<T>,
    onNewValue: OnNewValueFn<T>,
  ) {
    this.idGenerator = idGenerator;
    this.onNewCache = onNewCache;
    this.onNewValue = onNewValue;
    this.sortedCacheKeys = [];
    this.caches = {};
  }

  getCache(key: string): Cache<T> {
    if (!this.caches[key]) {
      const cache = new Cache(this.idGenerator, this.onNewValue);
      cache.key = key;
      this.sortedCacheKeys.push(key);
      this.sortedCacheKeys.sort(sortMq);
      const keyIndex = this.sortedCacheKeys.indexOf(key);
      const insertBeforeMedia =
        keyIndex < this.sortedCacheKeys.length - 1
          ? this.sortedCacheKeys[keyIndex + 1]
          : void 0;
      this.caches[key] = cache;
      this.onNewCache(key, cache, insertBeforeMedia);
    }
    return this.caches[key];
  }

  getSortedCacheKeys() {
    return this.sortedCacheKeys;
  }
}

export class Cache<T> {
  cache: {
    [x: string]: string;
  };
  idGenerator: SequentialIDGenerator;
  key: string;
  onNewValue: (cache: Cache<T>, id: string, value: any) => any;

  constructor(
    idGenerator: SequentialIDGenerator,
    onNewValue: (cache: Cache<T>, id: string, value: any) => any,
  ) {
    this.cache = {};
    this.idGenerator = idGenerator;
    this.onNewValue = onNewValue;
  }

  addValue(key: string, value: T) {
    const cached = this.cache[key];
    if (cached) {
      return cached;
    }
    const id = this.idGenerator.next();
    this.cache[key] = id;
    this.onNewValue(this, id, value);
    return id;
  }
}
