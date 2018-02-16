// @flow
/* eslint-env browser */

const STYLES_HYDRATOR = /\.([^{]+){[^}]*;([^}]*?)}/g;
const KEYFRAMES_HYRDATOR = /@keyframes ([^{]+)\{([^{]+\{[^}]*\})*\}/g;
const FONT_FACE_HYDRATOR = /@font-face\{font-family:([^;]+);([^}]*)\}/g;

type hydratorT =
  | typeof STYLES_HYDRATOR
  | typeof KEYFRAMES_HYRDATOR
  | typeof FONT_FACE_HYDRATOR;

function hydrate<T>(cache: Cache<T>, hydrator: hydratorT, css: string) {
  let match;
  while ((match = hydrator.exec(css))) {
    const [, /*_*/ id, key] = match;
    cache.cache[key] = id; // set cache without triggering side effects
    cache.idGenerator.increment(); // increment id
  }
}

import SequentialIDGenerator from "../sequential-id-generator.js";

import type {
  StandardEngine,
  keyframesT,
  fontFaceT,
  s1
} from "styletron-standard";

import {Cache, MultiCache} from "../cache.js";

import injectStylePrefixed from "../utils/inject-style-prefixed.js";

import {
  styleBlockToRule,
  atomicSelector,
  keyframesBlockToRule,
  declarationsToBlock,
  keyframesToBlock,
  fontFaceBlockToRule
} from "../css.js";

type hydrateT =
  | HTMLCollection<HTMLStyleElement>
  | Array<HTMLStyleElement>
  | NodeList<HTMLStyleElement>;

type optionsT = {
  hydrate?: hydrateT,
  container?: Element
};

class StyletronClient implements StandardEngine {
  container: Element;
  styleElements: {[string]: HTMLStyleElement};
  fontFaceSheet: HTMLStyleElement;
  keyframesSheet: HTMLStyleElement;

  styleCache: MultiCache<{pseudo: string, block: string}>;
  keyframesCache: Cache<keyframesT>;
  fontFaceCache: Cache<fontFaceT>;

  constructor(opts?: optionsT) {
    this.styleElements = {};

    const styleIdGenerator = new SequentialIDGenerator();
    const onNewStyle = (cache, id, value) => {
      const {pseudo, block} = value;
      const sheet: CSSStyleSheet = (this.styleElements[cache.key].sheet: any);
      sheet.insertRule(
        styleBlockToRule(atomicSelector(id, pseudo), block),
        sheet.cssRules.length
      );
    };

    // Setup style cache
    this.styleCache = new MultiCache(
      styleIdGenerator,
      media => {
        const styleElement = document.createElement("style");
        styleElement.media = media;
        this.container.appendChild(styleElement);
        this.styleElements[media] = styleElement;
      },
      onNewStyle
    );

    this.keyframesCache = new Cache(
      new SequentialIDGenerator(),
      (cache, id, value) => {
        const sheet: CSSStyleSheet = (this.keyframesSheet.sheet: any);
        sheet.insertRule(
          keyframesBlockToRule(id, keyframesToBlock(value)),
          sheet.cssRules.length
        );
      }
    );

    this.fontFaceCache = new Cache(
      new SequentialIDGenerator(),
      (cache, id, value) => {
        const sheet: CSSStyleSheet = (this.keyframesSheet.sheet: any);
        sheet.insertRule(
          fontFaceBlockToRule(id, declarationsToBlock(value)),
          sheet.cssRules.length
        );
      }
    );

    if (opts && opts.container) {
      this.container = opts.container;
    }

    // Hydrate
    if (opts && opts.hydrate && opts.hydrate.length > 0) {
      // infer container from parent element
      if (!this.container) {
        const parentElement = opts.hydrate[0].parentElement;
        if (parentElement !== null && parentElement !== void 0) {
          this.container = parentElement;
        }
      }

      for (let i = 0; i < opts.hydrate.length; i++) {
        const element = opts.hydrate[i];
        if (element.dataset["font-face"]) {
          hydrate(this.fontFaceCache, FONT_FACE_HYDRATOR, element.textContent);
          continue;
        }
        if (element.dataset.keyframes) {
          hydrate(this.keyframesCache, KEYFRAMES_HYRDATOR, element.textContent);
          continue;
        }
        const key = element.media ? element.media : "";
        this.styleElements[key] = element;
        const cache = new Cache(styleIdGenerator, onNewStyle);
        cache.key = key;
        hydrate(cache, STYLES_HYDRATOR, element.textContent);
      }
    }

    if (!this.container) {
      if (document.head === null) {
        throw new Error("No container provided and `document.head` was null");
      }
      this.container = document.head;
    }
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
}

export default StyletronClient;
