// @flow

import SequentialIDGenerator from "../sequential-id-generator.js";

import cacheToStylesheets from "./cache-to-stylesheets.js";
import {generateHtmlString, cacheToCss} from "./utils.js";
import {keyframesToCss, fontFaceToCss} from "../utils/serializers.js";

import type {StandardEngine} from "styletron-standard";

import {Cache, MultiCache} from "../cache.js";

export type sheetT = {|
  css: string,
  media?: string,
  keyframesIds?: Array<string>,
  fontFaceIds?: Array<string>
|};

class StyletronServer implements StandardEngine {
  styleCache: MultiCache<{psuedo: string, block: string}>;
  keyframesCache: Cache<string>;
  fontFaceCache: Cache<string>;
  stylesCss: {[string]: string};
  keyframesCss: string;
  fontFaceCss: string;

  constructor(opts?: optionsT) {
    this.styleCache = new MultiCache(
      new SequentialIDGenerator(),
      (cache, id, value) => {
        const {pseudo, block} = value;
        this.stylesCss[cache.key] += `.${id}${pseudo}{${block}}`;
      }
    );
    this.fontFaceCache = new Cache(
      new SequentialIDGenerator(),
      (_, id, value) => {
        this.fontFaceCss += `@font-face {font-family:${id};${value}}`;
      }
    );
    this.keyframesCache = new Cache(
      new SequentialIDGenerator(),
      (_, id, value) => {
        this.keyframesCss += `@keyframes ${id} {${value}}`;
      }
    );
  }

  renderStyle(style: coreStyleT) {}

  renderFontFace(fontFace: fontFaceT) {}

  renderKeyframes(keyframes: keyframesT) {}

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
