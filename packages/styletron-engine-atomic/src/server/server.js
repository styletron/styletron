// @flow

import SequentialIDGenerator from "../sequential-id-generator.js";

import {generateHtmlString} from "./utils.js";

import type {StandardEngine} from "styletron-standard";

import {Cache, MultiCache} from "../cache.js";

import injectStylePrefixed from "../utils/inject-style-prefixed.js";

import type {s1, fontFaceT, keyframesT} from "styletron-standard";

import {
  styleBlockToRule,
  atomicSelector,
  keyframesBlockToRule,
  declarationsToBlock,
  keyframesToBlock,
  fontFaceBlockToRule
} from "../css.js";

export type sheetT = {|
  css: string,
  attrs: {[string]: string}
|};

class StyletronServer implements StandardEngine {
  styleCache: MultiCache<{pseudo: string, block: string}>;
  keyframesCache: Cache<keyframesT>;
  fontFaceCache: Cache<fontFaceT>;
  styleRules: {[string]: string};
  keyframesRules: string;
  fontFaceRules: string;

  constructor() {
    this.styleRules = {"": ""};
    this.styleCache = new MultiCache(
      new SequentialIDGenerator(),
      media => {
        this.styleRules[media] = "";
      },
      (cache, id, value) => {
        const {pseudo, block} = value;
        this.styleRules[cache.key] += styleBlockToRule(
          atomicSelector(id, pseudo),
          block
        );
      }
    );

    this.fontFaceRules = "";
    this.fontFaceCache = new Cache(
      new SequentialIDGenerator(),
      (cache, id, value) => {
        this.fontFaceRules += fontFaceBlockToRule(
          id,
          declarationsToBlock(value)
        );
      }
    );

    this.keyframesRules = "";
    this.keyframesCache = new Cache(
      new SequentialIDGenerator(),
      (cache, id, value) => {
        this.keyframesRules += keyframesBlockToRule(
          id,
          keyframesToBlock(value)
        );
      }
    );
  }

  renderStyle(style: s1): string {
    return injectStylePrefixed(this.styleCache, style, "", "");
  }

  renderFontFace(fontFace: fontFaceT): string {
    const key = JSON.stringify(fontFace);
    return this.fontFaceCache.addValue(key, fontFace);
  }

  renderKeyframes(keyframes: keyframesT): string {
    const key = JSON.stringify(keyframes);
    return this.keyframesCache.addValue(key, keyframes);
  }

  getStylesheets(): Array<sheetT> {
    return [
      ...(this.fontFaceRules.length
        ? [
            {
              css: this.fontFaceRules,
              attrs: {"data-hydrate": "font-face"}
            }
          ]
        : []),
      ...sheetify(this.styleRules),
      ...(this.keyframesRules.length
        ? [
            {
              css: this.keyframesRules,
              attrs: {"data-hydrate": "keyframes"}
            }
          ]
        : [])
    ];
  }

  getStylesheetsHtml(className?: string = "_styletron_hydrate_") {
    return generateHtmlString(this.getStylesheets(), className);
  }

  getCss() {
    return (
      this.fontFaceRules + stringify(this.styleRules) + this.keyframesRules
    );
  }
}

function stringify(styleRules) {
  let result = "";
  for (const media in styleRules) {
    const rules = styleRules[media];
    if (media) {
      result += `@media ${media}{${rules}}`;
    } else {
      result += rules;
    }
  }
  return result;
}

function sheetify(styleRules) {
  const sheets = [];
  for (const media in styleRules) {
    // omit media attribute if empty
    const attrs = media ? {media} : {};
    sheets.push({css: styleRules[media], attrs});
  }
  return sheets;
}

export default StyletronServer;
