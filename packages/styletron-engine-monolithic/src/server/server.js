// @flow
import type {StandardEngine} from "styletron-standard";

import hash from "@emotion/hash";

import injectStylePrefixed from "../inject-style-prefixed.js";

import type {
  StyleObject,
  FontFaceObject,
  KeyframesObject,
} from "styletron-standard";

import {keyframesToBlock, keyframesBlockToRule} from "../css";

export type sheetT = {|
  css: string,
  attrs: {[string]: string},
|};

export type optionsT = {
  prefix?: string,
};

class StyletronServer implements StandardEngine {
  styleCache: any;
  keyframesCache: any;
  fontFaceCache: any;
  opts: optionsT;

  constructor(opts?: optionsT = {}) {
    this.opts = opts || {};
    this.styleCache = {};
    this.fontFaceCache = {};
    this.keyframesCache = {};
  }

  renderStyle(style: StyleObject): string {
    return injectStylePrefixed(this.styleCache, style, this.opts.prefix || "");
  }

  renderFontFace(fontFace: FontFaceObject): string {
    const key = JSON.stringify(fontFace);
    return this.fontFaceCache.addValue(key, fontFace);
  }

  renderKeyframes(keyframes: KeyframesObject): string {
    const animationName = hash(JSON.stringify(keyframes));
    if (!this.keyframesCache[animationName]) {
      this.keyframesCache[animationName] = keyframesToBlock(keyframes);
    }
    return animationName;
  }

  // getStylesheets(): Array<sheetT> {
  //   return [
  //     ...(this.keyframesRules.length
  //       ? [
  //           {
  //             css: this.keyframesRules,
  //             attrs: {"data-hydrate": "keyframes"},
  //           },
  //         ]
  //       : []),
  //     ...(this.fontFaceRules.length
  //       ? [
  //           {
  //             css: this.fontFaceRules,
  //             attrs: {"data-hydrate": "font-face"},
  //           },
  //         ]
  //       : []),
  //     ...sheetify(this.styleRules, this.styleCache.getSortedCacheKeys()),
  //   ];
  // }

  // getStylesheetsHtml(className?: string = "_styletron_hydrate_") {
  //   return generateHtmlString(this.getStylesheets(), className);
  // }
  getCss() {
    return stringifyKeyframes(this.keyframesCache) + stringify(this.styleCache);
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

function stringifyKeyframes(keyframeCache) {
  let result = "";
  for (const animationName in keyframeCache) {
    result += `${keyframesBlockToRule(
      animationName,
      keyframeCache[animationName],
    )};`;
  }
  return result;
}

// function sheetify(styleRules, sortedCacheKeys) {
//   if (sortedCacheKeys.length === 0) {
//     return [{css: "", attrs: {}}];
//   }
//   const sheets = [];
//   sortedCacheKeys.forEach(cacheKey => {
//     // omit media (cacheKey) attribute if empty
//     const attrs = cacheKey === "" ? {} : {media: cacheKey};
//     sheets.push({css: styleRules[cacheKey], attrs});
//   });
//   return sheets;
// }

export default StyletronServer;
