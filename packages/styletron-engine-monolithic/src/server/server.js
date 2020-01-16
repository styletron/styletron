// @flow

import SequentialIDGenerator from "../sequential-id-generator.js";

import type {StandardEngine} from "styletron-standard";

import {Cache} from "../cache.js";

import injectStylePrefixed from "../inject-style-prefixed.js";

import type {
  StyleObject,
  FontFaceObject,
  KeyframesObject,
} from "styletron-standard";

import {
  keyframesBlockToRule,
  declarationsToBlock,
  keyframesToBlock,
  fontFaceBlockToRule,
} from "../css.js";

export type sheetT = {|
  css: string,
  attrs: {[string]: string},
|};

type optionsT = {
  prefix?: string,
};

class StyletronServer implements StandardEngine {
  styleCache: any;
  keyframesCache: Cache<KeyframesObject>;
  fontFaceCache: Cache<FontFaceObject>;
  styleRules: {[string]: string};
  keyframesRules: string;
  fontFaceRules: string;

  constructor(opts?: optionsT = {}) {
    this.styleRules = {"": ""};
    this.styleCache = {};

    this.fontFaceRules = "";
    this.fontFaceCache = new Cache(
      new SequentialIDGenerator(opts.prefix),
      (cache, id, value) => {
        this.fontFaceRules += fontFaceBlockToRule(
          id,
          declarationsToBlock(value),
        );
      },
    );

    this.keyframesRules = "";
    this.keyframesCache = new Cache(
      new SequentialIDGenerator(opts.prefix),
      (cache, id, value) => {
        this.keyframesRules += keyframesBlockToRule(
          id,
          keyframesToBlock(value),
        );
      },
    );
  }

  renderStyle(style: StyleObject): string {
    return injectStylePrefixed(this.styleCache, style);
  }

  renderFontFace(fontFace: FontFaceObject): string {
    const key = JSON.stringify(fontFace);
    return this.fontFaceCache.addValue(key, fontFace);
  }

  renderKeyframes(keyframes: KeyframesObject): string {
    const key = JSON.stringify(keyframes);
    return this.keyframesCache.addValue(key, keyframes);
  }

  getStylesheets(): Array<sheetT> {
    return [
      ...(this.keyframesRules.length
        ? [
            {
              css: this.keyframesRules,
              attrs: {"data-hydrate": "keyframes"},
            },
          ]
        : []),
      ...(this.fontFaceRules.length
        ? [
            {
              css: this.fontFaceRules,
              attrs: {"data-hydrate": "font-face"},
            },
          ]
        : []),
      ...sheetify(this.styleRules, this.styleCache.getSortedCacheKeys()),
    ];
  }

  getStylesheetsHtml(className?: string = "_styletron_hydrate_") {
    return generateHtmlString(this.getStylesheets(), className);
  }

  getCss() {
    return stringify(this.styleCache);
  }
}

export function generateHtmlString(sheets: Array<sheetT>, className: string) {
  let html = "";
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    const {class: originalClassName, ...rest} = sheet.attrs;
    const attrs = {
      class: originalClassName
        ? `${className} ${originalClassName}`
        : className,
      ...rest,
    };
    html += `<style${attrsToString(attrs)}>${sheet.css}</style>`;
  }
  return html;
}

function attrsToString(attrs) {
  let result = "";
  for (const attr in attrs) {
    const value = attrs[attr];
    if (value === true) {
      result += " " + attr;
    } else if (value !== false) {
      result += ` ${attr}="${value}"`;
    }
  }
  return result;
}

function stringify(styleCache) {
  let result = "";
  for (const className in styleCache) {
    result += styleCache[className];
  }
  return result;
}

function sheetify(styleRules, sortedCacheKeys) {
  if (sortedCacheKeys.length === 0) {
    return [{css: "", attrs: {}}];
  }
  const sheets = [];
  sortedCacheKeys.forEach(cacheKey => {
    // omit media (cacheKey) attribute if empty
    const attrs = cacheKey === "" ? {} : {media: cacheKey};
    sheets.push({css: styleRules[cacheKey], attrs});
  });
  return sheets;
}

export default StyletronServer;
