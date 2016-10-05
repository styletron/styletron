const cacheToCss = require('./cache-to-css');
const cacheToStylesheets = require('./cache-to-stylesheets');
const StyletronCore = require('styletron-core');

/**
 * StyletronServer
 * @packagename styletron-server
 * @extends StyletronCore
 */
class StyletronServer extends StyletronCore {
  /**
   * Create a new StyletronServer instance
   */
  constructor() {
    super();
    this.injectionCount = 0;
  }

  injectDeclaration(decl) {
    this.injectionCount++;
    return super.injectDeclaration(decl);
  }

  getStylesheets() {
    return cacheToStylesheets(this.cache);
  }

  /**
   * Get the CSS string of cache
   * @return {String} The string of CSS
   * @example
   * const styletron = new StyletronServer();
   *
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // → 'c0'
   * styletron.getCss();
   * // → '.c0{color:red}'
   */
  getCss() {
    return cacheToCss(this.cache);
  }

  getInjectionCount() {
    return this.injectionCount;
  }

}

module.exports = StyletronServer;
