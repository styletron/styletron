/* @flow */

export type optionsT = {
  prefix?: string,
  [any]: empty,
};

export type baseCacheT = {[string]: string};

export type pseudoCacheT = {
  [string]: baseCacheT,
};

export type mediaCacheEntryT = {
  pseudo: pseudoCacheT,
  [string]: string,
};

export type mediaCacheT = {
  [string]: mediaCacheEntryT,
};

export type cacheT = {
  media: mediaCacheT,
  pseudo: pseudoCacheT,
  [string]: string,
};

export type rawDeclT = {|block: string, media?: string, pseudo?: string|};
export type declT = {|
  prop: string,
  val: string,
  media?: string,
  pseudo?: string,
|};

/**
 * The core styletron module
 * @packagename styletron-core
 */
class StyletronCore {
  cache: cacheT;
  prefix: string;
  uniqueCount: number;
  offset: number;
  msb: number;
  power: number;

  /**
   * Create a new StyletronCore instance
   * @param {object} [opts]           An object containing options
   * @param {string} [opts.prefix=''] A prefix for generated CSS class names
   */
  constructor(opts?: optionsT = {}) {
    this.cache = {
      media: {},
      pseudo: {},
    };
    this.prefix = opts.prefix || '';
    this.uniqueCount = 0;
    this.offset = 10; // skip 0-9
    this.msb = 35;
    this.power = 1;
  }

  static assignDecl(target: cacheT, decl: rawDeclT, className: string) {
    const {block, media, pseudo} = decl;
    let targetEntry;
    if (media) {
      if (!target.media[media]) {
        target.media[media] = {pseudo: {}};
      }
      targetEntry = target.media[media];
    } else {
      targetEntry = target;
    }
    if (pseudo) {
      if (!targetEntry.pseudo[pseudo]) {
        targetEntry.pseudo[pseudo] = {};
      }
      targetEntry = targetEntry.pseudo[pseudo];
    }
    targetEntry[block] = className;
  }

  /**
   * Injects a declaration (if not already injected) and returns a class name
   * @param  {object} decl          The CSS declaration object
   * @param  {string} decl.prop     The property name
   * @param  {string} decl.val      The property value
   * @param  {string} decl.media    The media query
   * @param  {string} decl.pseudo   The pseudo selector
   * @return {string}               The class name for the declaration
   */
  injectDeclaration({prop, val, media, pseudo}: declT) {
    return this.injectRawDeclaration({block: `${prop}:${val}`, media, pseudo});
  }

  /**
   * Injects a raw declaration (if not already injected) and returns a class name
   * @param  {object} decl          The CSS declaration object
   * @param  {string} decl.block    The declaration block
   * @param  {string} decl.media    The media query
   * @param  {string} decl.pseudo   The pseudo selector
   * @return {string}               The class name for the declaration
   */
  injectRawDeclaration(decl: rawDeclT) {
    const cached = this.getCachedDeclaration(decl);
    if (cached) {
      return cached;
    }
    const virtualCount = this.incrementVirtualCount();
    const hash = virtualCount.toString(36);
    const className = this.prefix !== '' ? this.prefix + hash : hash;
    StyletronCore.assignDecl(this.cache, decl, className);
    return className;
  }

  /**
   * Get the next virtual class number, while setting
   * the uniqueCount, offset, and msb counters appropriately.
   * @return {number} The virtual class count
   * @private
   */
  incrementVirtualCount() {
    const virtualCount = this.uniqueCount + this.offset;
    if (virtualCount === this.msb) {
      this.offset += (this.msb + 1) * 9;
      this.msb = Math.pow(36, ++this.power) - 1;
    }
    this.uniqueCount++;
    return virtualCount;
  }

  /**
   * Gets the class name for an already injected declaration
   * @param  {object} decl          The CSS declaration object
   * @param  {string} decl.block    The declaration block
   * @param  {string} [decl.media]  The media query
   * @param  {string} [decl.pseudo] The pseudo selector
   * @return {string|undefined}     The class name for the declaration
   * @private
   */
  getCachedDeclaration({block, media, pseudo}: rawDeclT) {
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

export default StyletronCore;
