// @flow

/* eslint-env browser */

import {StyleSheet} from "./sheet";

import type {
  StandardEngine,
  KeyframesObject,
  FontFaceObject,
  StyleObject,
} from "styletron-standard";

import injectStylePrefixed from "../inject-style-prefixed.js";

import {
  keyframesBlockToRule,
  declarationsToBlock,
  keyframesToBlock,
  fontFaceBlockToRule,
  hashCssObject,
} from "../css.js";

declare var __DEV__: boolean;

type hydrateT =
  | HTMLCollection<HTMLStyleElement>
  | Array<HTMLStyleElement>
  | NodeList<HTMLStyleElement>;

type optionsT = {
  hydrate?: hydrateT,
  container?: Element,
  prefix?: string,
};

type cacheT = {
  [key: string]: string,
};

class StyletronClient implements StandardEngine {
  container: Element;
  opts: optionsT;
  fontFaceSheet: HTMLStyleElement;
  keyframesSheet: HTMLStyleElement;

  styleSheet: StyleSheet;
  styleCache: cacheT;
  keyframesCache: cacheT;
  fontFaceCache: cacheT;

  constructor(opts?: optionsT = {}) {
    this.opts = opts || {};
    this.styleCache = {};
    this.fontFaceCache = {};
    this.keyframesCache = {};

    if (opts.container) {
      this.container = opts.container;
    }

    // hydration
    if (opts.hydrate && opts.hydrate.length > 1) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.warn(
          "Client hydration expects only a single style tag from the server. Make sure your server uses styletron-engine-monolithic and not atomic.",
        );
      }
    } else if (opts.hydrate && opts.hydrate.length === 1) {
      // infer container from parent element
      if (!this.container) {
        const parentElement = opts.hydrate[0].parentElement;
        if (parentElement !== null && parentElement !== void 0) {
          this.container = parentElement;
        }
      }
      // there is a single style tag coming from the monolithic server
      const element = opts.hydrate[0];
      const dataHydrate = element.getAttribute("data-hydrate");
      if (dataHydrate) {
        dataHydrate.split(" ").forEach(hashKey => {
          // cache keys are unique across fonts, keyframes and other css so
          // we use a single attribute to get them all
          this.styleCache[hashKey] = "hydrated";
          this.fontFaceCache[hashKey] = "hydrated";
          this.keyframesCache[hashKey] = "hydrated";
        });
      }
    }

    if (!this.container) {
      if (document.head === null) {
        throw new Error("No container provided and `document.head` was null");
      }
      this.container = document.head;
    }

    this.styleSheet = new StyleSheet({container: this.container});
  }

  renderStyle(styles: StyleObject): string {
    const className = hashCssObject(styles);
    if (!this.styleCache[className]) {
      this.styleCache[className] = injectStylePrefixed(
        styles,
        className,
        this.opts.prefix || "",
      );
      this.styleSheet.insert(this.styleCache[className]);
    }
    return `${this.opts.prefix || ""}css-${className}`;
  }

  renderFontFace(fontFace: FontFaceObject): string {
    const fontName = hashCssObject(fontFace);
    if (!this.fontFaceCache[fontName]) {
      this.fontFaceCache[fontName] = fontFaceBlockToRule(
        `${this.opts.prefix || ""}font-${fontName}`,
        declarationsToBlock(fontFace),
      );
      this.styleSheet.insert(this.fontFaceCache[fontName]);
    }
    return `${this.opts.prefix || ""}font-${fontName}`;
  }

  renderKeyframes(keyframes: KeyframesObject): string {
    const animationName = hashCssObject(keyframes);
    if (!this.keyframesCache[animationName]) {
      this.keyframesCache[animationName] = keyframesBlockToRule(
        `${this.opts.prefix || ""}animation-${animationName}`,
        keyframesToBlock(keyframes),
      );
      this.styleSheet.insert(this.keyframesCache[animationName]);
    }
    return `${this.opts.prefix || ""}animation-${animationName}`;
  }
}

export default StyletronClient;
