// @flow

import SequentialIDGenerator from "./sequential-id-generator.js";
import sortMq from "./sort-css-media-queries.js";

export class MultiCache<T> {
  caches: {[string]: Cache<T>};
  idGenerator: SequentialIDGenerator;
  onNewCache: (string, Cache<T>, number) => any;
  onNewValue: (cache: Cache<T>, id: string, value: T) => any;
  sortedCacheKeys: string[];

  constructor(
    idGenerator: SequentialIDGenerator,
    onNewCache: Function,
    onNewValue: Function,
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
      const insertAtIndex = this.sortedCacheKeys.indexOf(key);
      this.caches[key] = cache;
      this.onNewCache(key, cache, insertAtIndex);
    }
    return this.caches[key];
  }

  getSortedCacheKeys() {
    return this.sortedCacheKeys;
  }
}

export class Cache<T> {
  cache: {[string]: string};
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
