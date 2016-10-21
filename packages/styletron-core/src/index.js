/**
 * The core styletron module
 * @packagename styletron-core
 */
class StyletronCore {

  /**
   * Create a new StyletronCore instance
   */
  constructor({prefix = 'c'} = {prefix: 'c'}) {
    this.cache = {
      media: {},
      pseudo: {}
    };
    this.uniqueCount = 0;
    this.prefix = prefix;
  }

  static assignDecl(target, decl, className) {
    const {prop, val, media, pseudo} = decl;
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
    if (!targetEntry[prop]) {
      targetEntry[prop] = {};
    }
    targetEntry[prop][val] = className;
  }

  /**
   * Injects a declaration (if not already injected) and returns a class name
   * @param  {object} decl          The CSS declaration object
   * @param  {string} decl.prop     The property name
   * @param  {string} decl.val      The property value
   * @param  {string} [decl.media]  The media query
   * @param  {string} [decl.pseudo] The pseudo selector
   * @return {string|undefined}     The class name for the declaration
   */
  injectDeclaration(decl) {
    const cached = this.getCachedDeclaration(decl);
    if (cached) {
      return cached;
    }
    const className = `${this.prefix}${this.uniqueCount.toString(36)}`;
    this.uniqueCount++;
    StyletronCore.assignDecl(this.cache, decl, className);
    return className;
  }

  /*
   * Gets the class name for an already injected declaration
   * @param  {object} decl          The CSS declaration object
   * @param  {string} decl.prop     The property name
   * @param  {string} decl.val      The property value
   * @param  {string} [decl.media]  The media query
   * @param  {string} [decl.pseudo] The pseudo selector
   * @return {string|undefined}     The class name for the declaration
   */
  getCachedDeclaration({prop, val, media, pseudo}) {
    let entry;
    if (media) {
      entry = this.cache.media[media];
      if (!entry) {
        return false;
      }
    } else {
      entry = this.cache;
    }
    if (pseudo) {
      entry = entry.pseudo[pseudo];
      if (!entry) {
        return false;
      }
    }
    return entry[prop] && entry[prop].hasOwnProperty(val) && entry[prop][val];
  }

}

module.exports = StyletronCore;
