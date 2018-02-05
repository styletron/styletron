// @flow

import StyletronCore from "../core.js";
import type {optionsT} from "../core.js";

import cacheToStylesheets from "./cache-to-stylesheets.js";
import {generateHtmlString, cacheToCss} from "./utils.js";
import {keyframesToCss, fontFaceToCss} from "../utils/serializers.js";

export type sheetT = {|
  css: string,
  media?: string,
  keyframesIds?: Array<string>,
  fontFaceIds?: Array<string>
|};

/**
 * A Styletron class for extracting styles during server-side rendering
 * @extends StyletronCore
 */
class StyletronServer extends StyletronCore {
  keyframesCss: string;
  fontFaceCss: string;

  /**
   * Create a new StyletronServer instance
   */
  constructor(opts?: optionsT) {
    super(opts);
    this.keyframesCss = "";
    this.fontFaceCss = "";

    // add injectors to accumulate CSS
    this.fontFaceCache.injector = (id, fontFace) => {
      this.fontFaceCss += fontFaceToCss(id, fontFace);
    };
    this.keyframesCache.injector = (id, keyframes) => {
      this.keyframesCss += keyframesToCss(id, keyframes);
    };
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
    return [
      ...(this.fontFaceCss.length
        ? [
            {
              css: this.fontFaceCss,
              fontFaceIds: Object.keys(this.fontFaceCache.ids)
            }
          ]
        : []),
      ...cacheToStylesheets(this.styleCache.cache),
      ...(this.keyframesCss.length
        ? [
            {
              css: this.keyframesCss,
              keyframesIds: Object.keys(this.keyframesCache.ids)
            }
          ]
        : [])
    ];
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
  getStylesheetsHtml(className?: string = "_styletron_hydrate_") {
    return generateHtmlString(this.getStylesheets(), className);
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
    return cacheToCss(this.styleCache.cache);
  }
}

export default StyletronServer;
