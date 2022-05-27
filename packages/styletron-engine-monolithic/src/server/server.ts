// @flow
import type {StandardEngine} from "styletron-standard";
import injectStylePrefixed from "../inject-style-prefixed.js";

import type {
  StyleObject,
  FontFaceObject,
  KeyframesObject,
} from "styletron-standard";

import {
  keyframesToBlock,
  keyframesBlockToRule,
  fontFaceBlockToRule,
  declarationsToBlock,
  hashCssObject,
} from "../css";

export type sheetT = {|
  css: string,
  attrs: {[string]: string},
|};

export type optionsT = {
  prefix?: string,
  strict?: boolean,
};

export type cacheT = {
  [key: string]: string,
};

class StyletronServer implements StandardEngine {
  cache: cacheT;
  opts: optionsT;

  constructor(opts?: optionsT = {}) {
    this.opts = opts || {};
    this.cache = {};
  }

  renderStyle(styles: StyleObject): string {
    const className = hashCssObject(styles);
    if (!this.cache[className]) {
      this.cache[className] = injectStylePrefixed(
        styles,
        className,
        this.opts.prefix || "",
        Boolean(this.opts.strict),
      ).join("");
    }
    return `${this.opts.prefix || ""}css-${className}`;
  }

  renderFontFace(fontFace: FontFaceObject): string {
    const fontName = hashCssObject(fontFace);
    if (!this.cache[fontName]) {
      this.cache[fontName] = fontFaceBlockToRule(
        `${this.opts.prefix || ""}font-${fontName}`,
        declarationsToBlock(fontFace),
      );
    }
    return `${this.opts.prefix || ""}font-${fontName}`;
  }

  renderKeyframes(keyframes: KeyframesObject): string {
    const animationName = hashCssObject(keyframes);
    if (!this.cache[animationName]) {
      this.cache[animationName] = keyframesBlockToRule(
        `${this.opts.prefix || ""}animation-${animationName}`,
        keyframesToBlock(keyframes),
      );
    }
    return `${this.opts.prefix || ""}animation-${animationName}`;
  }

  getStylesheets(): Array<sheetT> {
    const hashedNames = [...Object.keys(this.cache)];
    return [
      {
        css: this.getCss(),
        attrs: {"data-hydrate": hashedNames.join(" ")},
      },
    ];
  }

  getStylesheetsHtml(className?: string = "_styletron_hydrate_") {
    return generateHtmlString(this.getStylesheets(), className);
  }

  getCss() {
    return [...Object.values(this.cache)].join("");
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

export default StyletronServer;
