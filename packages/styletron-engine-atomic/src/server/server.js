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

class StyletronServer extends StyletronCore {
  keyframesCss: string;
  fontFaceCss: string;

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

  getStylesheetsHtml(className?: string = "_styletron_hydrate_") {
    return generateHtmlString(this.getStylesheets(), className);
  }

  getCss() {
    return cacheToCss(this.styleCache.cache);
  }
}

export default StyletronServer;
