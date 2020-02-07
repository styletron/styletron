// @flow

/* eslint-env browser */

declare var __DEV__: boolean;
declare var __BROWSER__: boolean;

const STYLES_HYDRATOR = /\.([^{:]+)(:[^{]+)?{(?:[^}]*;)?([^}]*?)}/g;
const KEYFRAMES_HYRDATOR = /@keyframes ([^{]+)\{((?:[^{]+\{[^}]*\})*)\}/g;
const FONT_FACE_HYDRATOR = /@font-face\{font-family:([^;]+);([^}]*)\}/g;

type hydratorT =
  | typeof STYLES_HYDRATOR
  | typeof KEYFRAMES_HYRDATOR
  | typeof FONT_FACE_HYDRATOR;

function hydrateStyles<T>(cache: Cache<T>, hydrator: hydratorT, css: string) {
  let match;
  while ((match = hydrator.exec(css))) {
    const [, id, pseudo, key] = match;
    if (__BROWSER__ && __DEV__ && window.__STYLETRON_DEVTOOLS__) {
      hydrateDevtoolsRule(match[0]);
    }
    const fullKey = pseudo ? `${pseudo}${key}` : key;
    cache.cache[fullKey] = id; // set cache without triggering side effects
    cache.idGenerator.increment(); // increment id
  }
}

function hydrate<T>(cache: Cache<T>, hydrator: hydratorT, css: string) {
  let match;
  while ((match = hydrator.exec(css))) {
    const [, id, key] = match;
    if (__BROWSER__ && __DEV__ && window.__STYLETRON_DEVTOOLS__) {
      hydrateDevtoolsRule(match[0]);
    }
    cache.cache[key] = id; // set cache without triggering side effects
    cache.idGenerator.increment(); // increment id
  }
}

import SequentialIDGenerator from "../sequential-id-generator.js";

import type {
  StandardEngine,
  KeyframesObject,
  FontFaceObject,
  StyleObject,
} from "styletron-standard";

import {Cache, MultiCache} from "../cache.js";

import injectStylePrefixed from "../inject-style-prefixed.js";

import {
  styleBlockToRule,
  atomicSelector,
  keyframesBlockToRule,
  declarationsToBlock,
  keyframesToBlock,
  fontFaceBlockToRule,
} from "../css.js";
import {insertRuleIntoDevtools, hydrateDevtoolsRule} from "../dev-tool.js";

type hydrateT =
  | HTMLCollection<HTMLStyleElement>
  | Array<HTMLStyleElement>
  | NodeList<HTMLStyleElement>;

type optionsT = {
  hydrate?: hydrateT,
  container?: Element,
  prefix?: string,
};

class StyletronClient implements StandardEngine {
  container: Element;
  styleElements: {[string]: HTMLStyleElement};
  fontFaceSheet: HTMLStyleElement;
  keyframesSheet: HTMLStyleElement;

  styleCache: MultiCache<{pseudo: string, block: string}>;
  keyframesCache: Cache<KeyframesObject>;
  fontFaceCache: Cache<FontFaceObject>;

  constructor(opts?: optionsT = {}) {
    this.styleElements = {};

    const styleIdGenerator = new SequentialIDGenerator(opts.prefix);
    const onNewStyle = (cache, id, value) => {
      const {pseudo, block} = value;
      const sheet: CSSStyleSheet = (this.styleElements[cache.key].sheet: any);
      const selector = atomicSelector(id, pseudo);
      const rule = styleBlockToRule(selector, block);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
        if (__BROWSER__ && __DEV__ && window.__STYLETRON_DEVTOOLS__) {
          insertRuleIntoDevtools(selector, block);
        }
      } catch (e) {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.warn(
            `Failed to inject CSS: "${rule}". Perhaps this has invalid or un-prefixed properties?`,
          );
        }
      }
    };

    // Setup style cache
    this.styleCache = new MultiCache(
      styleIdGenerator,
      (media, _cache, insertBeforeMedia) => {
        const styleElement = document.createElement("style");
        styleElement.media = media;
        if (insertBeforeMedia === void 0) {
          this.container.appendChild(styleElement);
        } else {
          const insertBeforeIndex = findSheetIndexWithMedia(
            this.container.children,
            insertBeforeMedia,
          );
          this.container.insertBefore(
            styleElement,
            this.container.children[insertBeforeIndex],
          );
        }

        this.styleElements[media] = styleElement;
      },
      onNewStyle,
    );

    this.keyframesCache = new Cache(
      new SequentialIDGenerator(opts.prefix),
      (cache, id, value) => {
        this.styleCache.getCache("");
        const sheet: CSSStyleSheet = (this.styleElements[""].sheet: any);
        const rule = keyframesBlockToRule(id, keyframesToBlock(value));
        try {
          sheet.insertRule(rule, sheet.cssRules.length);
        } catch (e) {
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(
              `Failed to inject CSS: "${rule}". Perhaps this has invalid or un-prefixed properties?`,
            );
          }
        }
      },
    );

    this.fontFaceCache = new Cache(
      new SequentialIDGenerator(opts.prefix),
      (cache, id, value) => {
        this.styleCache.getCache("");
        const sheet: CSSStyleSheet = (this.styleElements[""].sheet: any);
        const rule = fontFaceBlockToRule(id, declarationsToBlock(value));
        try {
          sheet.insertRule(rule, sheet.cssRules.length);
        } catch (e) {
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(
              `Failed to inject CSS: "${rule}". Perhaps this has invalid or un-prefixed properties?`,
            );
          }
        }
      },
    );

    if (opts.container) {
      this.container = opts.container;
    }

    // Hydrate
    if (opts.hydrate && opts.hydrate.length > 0) {
      // infer container from parent element
      if (!this.container) {
        const parentElement = opts.hydrate[0].parentElement;
        if (parentElement !== null && parentElement !== void 0) {
          this.container = parentElement;
        }
      }

      for (let i = 0; i < opts.hydrate.length; i++) {
        const element = opts.hydrate[i];
        const hydrateType = element.getAttribute("data-hydrate");
        if (hydrateType === "font-face") {
          hydrate(this.fontFaceCache, FONT_FACE_HYDRATOR, element.textContent);
          continue;
        }
        if (hydrateType === "keyframes") {
          hydrate(this.keyframesCache, KEYFRAMES_HYRDATOR, element.textContent);
          continue;
        }
        const key = element.media ? element.media : "";
        this.styleElements[key] = element;
        const cache = new Cache(styleIdGenerator, onNewStyle);
        cache.key = key;
        hydrateStyles(cache, STYLES_HYDRATOR, element.textContent);
        this.styleCache.sortedCacheKeys.push(key);
        this.styleCache.caches[key] = cache;
      }
    }

    if (!this.container) {
      if (document.head === null) {
        throw new Error("No container provided and `document.head` was null");
      }
      this.container = document.head;
    }
  }

  renderStyle(style: StyleObject): string {
    return injectStylePrefixed(this.styleCache, style, "", "");
  }

  renderFontFace(fontFace: FontFaceObject): string {
    const key = declarationsToBlock(fontFace);
    return this.fontFaceCache.addValue(key, fontFace);
  }

  renderKeyframes(keyframes: KeyframesObject): string {
    const key = keyframesToBlock(keyframes);
    return this.keyframesCache.addValue(key, keyframes);
  }
}

export default StyletronClient;

function findSheetIndexWithMedia(children, media) {
  let index = 0;
  for (; index < children.length; index++) {
    const child = children[index];
    if (
      child.tagName === "STYLE" &&
      ((child: any): HTMLStyleElement).media === media
    ) {
      return index;
    }
  }

  return -1;
}
