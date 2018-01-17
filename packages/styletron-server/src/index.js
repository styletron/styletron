/* @flow */

import StyletronCore from 'styletron-core';
import type {optionsT} from 'styletron-core';

import cacheToStylesheetsOldIE from './cache-to-stylesheets-old-ie.js';
import cacheToStylesheets from './cache-to-stylesheets.js';
import {generateHtmlString, cacheToCss} from './utils.js';

export type sheetT = {
  media: string,
  css: string,
};

/**
 * A Styletron class for extracting styles during server-side rendering
 * @extends StyletronCore
 */
class StyletronServer extends StyletronCore {
  /**
   * Create a new StyletronServer instance
   */
  constructor(opts?: optionsT) {
    super(opts);
  }

  /**
   * Get an array of stylesheet objects
   * @return {Array} Array of stylesheet objects
   * @example
   * const styletron = new StyletronServer();
   *
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // → 'a'
   * styletron.getStylesheets();
   * // → [{css: '.a{color:red}'}]
   */
  getStylesheets(): Array<sheetT> {
    return cacheToStylesheets(this.cache);
  }

  /**
   * Get an array of stylesheet objects, with ≤IE9 limit of max 4095 rules per stylesheet
   * @return {Array} Array of stylesheet objects
   * @example
   * const styletron = new StyletronServer();
   *
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // → 'a'
   * styletron.getStylesheetsOldIE();
   * // → [{css: '.a{color:red}'}]
   */
  getStylesheetsOldIE(): Array<sheetT> {
    return cacheToStylesheetsOldIE(this.cache);
  }

  /**
   * Get a string of style elements for server rendering
   * @return {String} The string of HTML
   * @param {String} className=_styletron_hydrate_ Class name for style elements
   * @example
   * const styletron = new StyletronServer();
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // → 'a'
   * styletron.getStylesheetsHtml();
   * // → '<style class="_styletron_hydrate_">.a{color:red}</style>'
   * styletron.getStylesheetsHtml('custom_class');
   * // → '<style class="custom_class">.a{color:red}</style>'
   */
  getStylesheetsHtml(className?: string = '_styletron_hydrate_') {
    return generateHtmlString(this.getStylesheets(), className);
  }

  /**
   * Get a string of style elements for server rendering, with ≤IE9 limit of max 4095 rules per sheet
   * @return {String} The string of HTML
   * @param {String} className=_styletron_hydrate_ Class name for style elements
   * @example
   * const styletron = new StyletronServer();
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // → 'a'
   * styletron.getStylesheetsHtml();
   * // → '<style class="_styletron_hydrate_">.a{color:red}</style>'
   * styletron.getStylesheetsHtml('custom_class');
   * // → '<style class="custom_class">.a{color:red}</style>'
   */
  getStylesheetsHtmlOldIE(className?: string = '_styletron_hydrate_') {
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
   * // → 'a'
   * styletron.getCss();
   * // → '.a{color:red}'
   */
  getCss() {
    return cacheToCss(this.cache);
  }
}

export default StyletronServer;
