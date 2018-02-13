export class MultiCache<T> {
  caches: {[string]: Cache<T>};
  idGenerator: SequentialIDGenerator;
  onNewCache: (string, Cache<T>) => any;
  onNewValue: (cache: Cache<T>, key: string, id: string, value: T) => any;

  constructor(
    idGenerator: SequentialIDGenerator,
    onNewCache: Function,
    onNewValue: Function
  ) {
    this.idGenerator = idGenerator;
    this.onNewCache = onNewCache;
    this.onNewValue = onNewValue;
    this.caches = {};
  }

  getCache(key: string) {
    if (!this.caches[key]) {
      const cache = new Cache(this.idGenerator, this.onNewValue);
      cache.key = key;
      this.caches[key] = cache;
      this.onNewCache(key, cache);
    }
    return this.caches[key];
  }
}

export class Cache<T> {
  cache: {[string]: string};
  idGenerator: SequentialIDGenerator;
  key: string;
  onNewValue: (cache: Cache<T>, id: string, value: any) => any;

  constructor(
    idGenerator: SequentialIDGenerator,
    onNewValue: (cache: Cache<T>, id: string, value: any) => any
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
