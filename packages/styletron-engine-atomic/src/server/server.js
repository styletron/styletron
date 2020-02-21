// @flow

import SequentialIDGenerator from "../sequential-id-generator.js";

import type {StandardEngine} from "styletron-standard";

import {Cache, MultiCache} from "../cache.js";

import injectStylePrefixed from "../inject-style-prefixed.js";

import type {
  StyleObject,
  FontFaceObject,
  KeyframesObject,
} from "styletron-standard";

import {
  styleBlockToRule,
  atomicSelector,
  keyframesBlockToRule,
  declarationsToBlock,
  keyframesToBlock,
  fontFaceBlockToRule,
} from "../css.js";

export type attrsT = {
  "data-hydrate"?: "keyframes" | "font-face",
  media?: string,
  class?: string,
};

export type sheetT = {|
  css: string,
  attrs: attrsT,
|};

type optionsT = {
  prefix?: string,
};

class StyletronServer implements StandardEngine {
  styleCache: MultiCache<{pseudo: string, block: string}>;
  keyframesCache: Cache<KeyframesObject>;
  fontFaceCache: Cache<FontFaceObject>;
  styleRules: {[string]: string};
  keyframesRules: string;
  fontFaceRules: string;

  constructor(opts?: optionsT = {}) {
    this.styleRules = {"": ""};
    this.styleCache = new MultiCache(
      new SequentialIDGenerator(opts.prefix),
      media => {
        this.styleRules[media] = "";
      },
      (cache, id, value) => {
        const {pseudo, block} = value;
        this.styleRules[cache.key] += styleBlockToRule(
          atomicSelector(id, pseudo),
          block,
        );
      },
    );

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
    return injectStylePrefixed(this.styleCache, style, "", "");
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
    return (
      this.keyframesRules +
      this.fontFaceRules +
      stringify(this.styleRules, this.styleCache.getSortedCacheKeys())
    );
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
      ...(rest: attrsT),
    };
    html += `<style${attrsToString(attrs)}>${sheet.css}</style>`;
  }
  return html;
}

function attrsToString(attrs: attrsT) {
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

function stringify(styleRules, sortedCacheKeys) {
  let result = "";
  sortedCacheKeys.forEach(cacheKey => {
    const rules = styleRules[cacheKey];
    if (cacheKey !== "") {
      result += `@media ${cacheKey}{${rules}}`;
    } else {
      result += rules;
    }
  });
  return result;
}

function sheetify(styleRules, sortedCacheKeys): Array<sheetT> {
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
