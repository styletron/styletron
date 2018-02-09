/* @flow */

export type optionsT = $Shape<{|
  classPrefix?: string,
  keyframesPrefix?: string,
  fontFacePrefix?: string
|}>;

export type baseCacheT = {[string]: string};

export type pseudoCacheT = {
  [string]: baseCacheT
};

export type mediaCacheEntryT = {
  pseudo: pseudoCacheT,
  [string]: string
};

export type mediaCacheT = {
  [string]: mediaCacheEntryT
};

export type cacheT = {
  media: mediaCacheT,
  pseudo: pseudoCacheT,
  [string]: string
};

export type rawDeclT = {|block: string, media?: string, pseudo?: string|};
export type declT = {|
  prop: string,
  val: string,
  media?: string,
  pseudo?: string
|};

import injectStylePrefixed from "./utils/inject-style-prefixed.js";

import type {
  StandardEngine,
  coreStyleT,
  keyframesT,
  fontFaceT
} from "styletron-standard";

export class StyletronCore implements StandardEngine {
  styleCache: StyleCache;
  keyframesCache: KeyframesCache;
  fontFaceCache: FontFaceCache;

  constructor(opts?: optionsT = {}) {
    const classPrefix = opts.classPrefix || "";
    const fontFacePrefix = opts.fontFacePrefix || "_";
    const keyframesPrefix = opts.keyframesPrefix || "_";
    this.styleCache = new StyleCache(classPrefix);
    this.fontFaceCache = new FontFaceCache(fontFacePrefix);
    this.keyframesCache = new KeyframesCache(keyframesPrefix);
  }

  renderStyle(style: coreStyleT) {
    return injectStylePrefixed(this.styleCache, style, "", "");
  }

  renderFontFace(fontFace: fontFaceT) {
    return this.fontFaceCache.injectFontFace(fontFace);
  }

  renderKeyframes(keyframes: keyframesT) {
    return this.keyframesCache.injectKeyframes(keyframes);
  }
}

export class StyleCache {
  cache: cacheT;
  classGenerator: SequentialIDGenerator;
  injector: any;

  constructor(prefix: string) {
    this.cache = {
      media: {},
      pseudo: {}
    };
    this.classGenerator = new SequentialIDGenerator(prefix);
  }

  addBlock(decl: rawDeclT) {
    const cached = this.getBlock(decl);
    if (cached) {
      return cached;
    }
    const className = this.classGenerator.next();
    this.setBlock(className, decl);
    if (this.injector) {
      this.injector(className, decl);
    }
    return className;
  }

  setBlock(className: string, decl: rawDeclT) {
    const {block, media, pseudo} = decl;
    let targetEntry;
    if (media) {
      if (!this.cache.media[media]) {
        this.cache.media[media] = {pseudo: {}};
      }
      targetEntry = this.cache.media[media];
    } else {
      targetEntry = this.cache;
    }
    if (pseudo) {
      if (!targetEntry.pseudo[pseudo]) {
        targetEntry.pseudo[pseudo] = {};
      }
      targetEntry = targetEntry.pseudo[pseudo];
    }
    targetEntry[block] = className;
  }

  getBlock({block, media, pseudo}: rawDeclT) {
    let entry;
    if (media) {
      entry = this.cache.media[media];
      if (!entry) {
        return void 0;
      }
    } else {
      entry = this.cache;
    }
    if (pseudo) {
      entry = entry.pseudo[pseudo];
      if (!entry) {
        return void 0;
      }
    }
    return entry[block];
  }
}

export class KeyframesCache {
  prefix: string;
  ids: {[string]: boolean};
  injector: any;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.ids = {};
  }

  injectKeyframes(obj: keyframesT) {
    const id = idFromObject(obj, this.prefix);
    if (!this.ids[id]) {
      this.ids[id] = true;
      if (this.injector) {
        this.injector(id, obj);
      }
    }
    return id;
  }
}

export class FontFaceCache {
  prefix: string;
  ids: {[string]: boolean};
  injector: any;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.ids = {};
  }

  injectFontFace(obj: fontFaceT) {
    const id = idFromObject(obj, this.prefix);
    if (!this.ids[id]) {
      this.ids[id] = true;
      if (this.injector) {
        this.injector(id, obj);
      }
    }
    return id;
  }
}

export class SequentialIDGenerator {
  prefix: string;
  uniqueCount: number;
  offset: number;
  msb: number;
  power: number;

  constructor(prefix: string = "") {
    this.prefix = prefix;
    this.uniqueCount = 0;
    this.offset = 10; // skip 0-9
    this.msb = 35;
    this.power = 1;
  }

  next() {
    const id = this.increment().toString(36);
    return this.prefix ? `${this.prefix}${id}` : id;
  }

  increment() {
    const id = this.uniqueCount + this.offset;
    if (id === this.msb) {
      this.offset += (this.msb + 1) * 9;
      this.msb = Math.pow(36, ++this.power) - 1;
    }
    this.uniqueCount++;
    return id;
  }
}

export function idFromObject(obj: Object, prefix: string): string {
  const id = djb2a(JSON.stringify(obj)).toString(36);
  return prefix ? `${prefix}${id}` : id;
}

export function djb2a(str: string): number {
  let hash = 5381;
  let i = str.length;
  while (i) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(--i);
  }
  return hash >>> 0;
}

export default StyletronCore;
