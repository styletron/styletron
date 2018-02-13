// @flow
/* eslint-env browser */

const DECL_REGEX = /\.([^:{]+)(:[^{]+)?{([^}]+)}/g;

import SequentialIDGenerator from "../sequential-id-generator.js";

import type {StandardEngine} from "styletron-standard";

import {keyframesToCss, fontFaceToCss} from "../utils/serializers.js";

import {Cache, MultiCache} from "../cache.js";

type serverStylesT =
  | HTMLCollection<HTMLStyleElement>
  | Array<HTMLStyleElement>
  | NodeList<HTMLStyleElement>;

type optionsT = {
  serverStyles: serverStylesT,
  container: Element
};

class StyletronClient implements StandardEngine {
  sheetContainer: Element;
  styleSheets: {[string]: HTMLStyleElement};
  fontFaceSheet: HTMLStyleElement;
  keyframesSheet: HTMLStyleElement;

  styleCache: MultiCache<{psuedo: string, block: string}>;
  keyframesCache: Cache<string>;
  fontFaceCache: Cache<string>;

  constructor(opts?: optionsT) {
    this.styleSheets = {};

    // Setup style cache
    this.styleCache = new MultiCache(
      new SequentialIDGenerator(),
      media => {
        const sheet = appendSheetToContainer(this.sheetContainer);
        this.styleSheets[media] = sheet;
      },
      (cache, id, value) => {
        const {pseudo, decls} = value;
        const css = `.${id}${pseudo}{${decls}}`;
        const sheet: CSSStyleSheet = (this.styleSheets[cache.key].sheet: any);
        sheet.insertRule(css, sheet.cssRules.length);
      }
    );

    this.keyframesCache = new Cache(
      new SequentialIDGenerator(),
      (cache, id, block) => {
        const sheet: CSSStyleSheet = (this.keyframesSheet.sheet: any);
        sheet.insertRule(`@keyframes ${id}{${block}}`, sheet.cssRules.length);
      }
    );

    this.fontFaceCache = new Cache(new SequentialIDGenerator(), (id, block) => {
      const sheet: CSSStyleSheet = (this.keyframesSheet.sheet: any);
      sheet.insertRule(
        `@font-face {font-family:${id};${block}}`,
        sheet.cssRules.length
      );
    });

    // Hydrate serverStyles
    if (opts && opts.serverStyles && opts.serverStyles.length > 0) {
      const parentElement = opts.serverStyles[0].parentElement;
      if (parentElement !== null && parentElement !== void 0) {
        this.sheetContainer = parentElement;
      } else {
        if (document.head === null) {
          throw new Error("No container provided and document.head was null");
        }
        this.sheetContainer = document.head;
      }

      for (let i = 0; i < opts.serverStyles.length; i++) {
        const element = opts.serverStyles[i];
        if (element.dataset["font-face"]) {
          // TODO actually hydrate
          continue;
        }
        if (element.dataset.keyframes) {
          // TODO actually hyrdate
          continue;
        }
        const key = element.media ? element.media : "";
        this.styleSheets[key] = element;
        // TODO: actually hyrdate
        // this.hydrateCacheFromCssString(element.textContent, element.media);
      }
    } else {
      if (document.head === null) {
        throw new Error("No container provided and document.head was null");
      }
      this.sheetContainer = document.head;
    }
  }

  renderStyle(style: coreStyleT) {}

  renderFontFace(fontFace: fontFaceT) {}

  renderKeyframes(keyframes: keyframesT) {}
}

export default StyletronClient;

function declarationToRule(className, {block, pseudo}) {
  let selector = `.${className}`;
  if (pseudo) {
    selector += pseudo;
  }
  return `${selector}{${block}}`;
}

function appendSheetToContainer(container: Element) {
  const styleSheet = document.createElement("style");
  container.appendChild(styleSheet);
}
