const cacheToCss = require('./cache-to-css');
const cacheToStylesheets = require('./cache-to-stylesheets');
const cacheToStylesheetsOldIE = require('./cache-to-stylesheets-old-ie');
const generateHtmlString = require('./generate-html-string');
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
  constructor(opts) {
    super(opts);
  }

  injectDeclaration(decl) {
    return super.injectDeclaration(decl);
  }

  /**
   * Get an array of stylesheet objects
   * @return {Array} Array of stylesheet objects
   * @example
   * const styletron = new StyletronServer();
   *
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // → 'c0'
   * styletron.getStylesheets();
   * // → [{css: '.c0{color:red}'}]
   */
  getStylesheets() {
    return cacheToStylesheets(this.cache);
  }

  /**
   * Get an array of stylesheet objects, with ≤IE9 limit of max 4095 rules per stylesheet
   * @return {Array} Array of stylesheet objects
   * @example
   * const styletron = new StyletronServer();
   *
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // → 'c0'
   * styletron.getStylesheetsOldIE();
   * // → [{css: '.c0{color:red}'}]
   */
  getStylesheetsOldIE() {
    return cacheToStylesheetsOldIE(this.cache);
  }

  /**
   * Get a string of style elements for server rendering
   * @return {String} The string of HTML
   * @param {String} className=_styletron_hydrate_ Class name for style elements
   * @example
   * const styletron = new StyletronServer();
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // → 'c0'
   * styletron.getStylesheetsHtml();
   * // → '<style class="_styletron_hydrate_">.c0{color:red}</style>'
   * styletron.getStylesheetsHtml('custom_class');
   * // → '<style class="custom_class">.c0{color:red}</style>'
   */
  getStylesheetsHtml(className = '_styletron_hydrate_') {
    return generateHtmlString(this.getStylesheets(), className);
  }

  /**
   * Get a string of style elements for server rendering,with ≤IE9 limit of max 4095 rules per sheet
   * @return {String} The string of HTML
   * @param {String} className=_styletron_hydrate_ Class name for style elements
   * @example
   * const styletron = new StyletronServer();
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // → 'c0'
   * styletron.getStylesheetsHtml();
   * // → '<style class="_styletron_hydrate_">.c0{color:red}</style>'
   * styletron.getStylesheetsHtml('custom_class');
   * // → '<style class="custom_class">.c0{color:red}</style>'
   */
  getStylesheetsHtmlOldIE(className = '_styletron_hydrate_') {
    return generateHtmlString(this.getStylesheetsOldIE(), className);
  }

  /**
   * Get the CSS string. For hydrating styles on the client,
   * [`getStylesheetsHtml`]{@link StyletronServer#getStylesheetsHtml} or [`getStylesheets`]{@link StyletronServer#getStylesheets} should be used instead. 
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

}

module.exports = StyletronServer;
