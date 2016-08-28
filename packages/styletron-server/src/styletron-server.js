const cacheToCss = require('./cache-to-css');
const StyletronCore = require('styletron-core');

/**
 * StyletronServer
 * @extends StyletronCore
 */
class StyletronServer extends StyletronCore {
  /**
   * Create a new StyletronServer instance
   */
  constructor() {
    super();
  }

  /**
   * Get the CSS string of cache
   * @return {String} The string of CSS
   * @example
   * const styletron = new StyletronServer();
   *
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // ➜ 'c0'
   * styletron.getCss();
   * // ➜ '.c0{color:red}'
   */
  getCss() {
    return cacheToCss(this.cache);
  }

  getCount() {
    return this.counter;
  }

}

module.exports = StyletronServer;
