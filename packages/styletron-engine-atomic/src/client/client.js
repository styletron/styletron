// @flow
/* eslint-env browser */

const DECL_REGEX = /.([^:{]+)(:[^{]+)?{([^}]+)}/g;

import StyletronCore from "../core.js";

import type {StandardEngine} from "styletron-standard";

import type {optionsT, rawDeclT} from "../core.js";

import {keyframesToCss, fontFaceToCss} from "../utils/serializers.js";

type serverStylesT =
  | HTMLCollection<HTMLStyleElement>
  | Array<HTMLStyleElement>
  | NodeList<HTMLStyleElement>;

class StyletronClient extends StyletronCore implements StandardEngine {
  mediaSheets: {[string]: HTMLStyleElement};
  mainSheet: HTMLStyleElement;
  fontFaceSheet: HTMLStyleElement;
  keyframesSheet: HTMLStyleElement;

  constructor(serverStyles: serverStylesT, opts?: optionsT) {
    super(opts);

    this.mediaSheets = {};
    if (serverStyles && serverStyles.length > 0) {
      for (let i = 0; i < serverStyles.length; i++) {
        const element = serverStyles[i];
        if (element.media) {
          this.mediaSheets[element.media] = element;
        } else if (element.dataset["font-face"]) {
          hydrateIds(this.fontFaceCache.ids, element.dataset["font-face"]);
        } else if (element.dataset.keyframes) {
          hydrateIds(this.fontFaceCache.ids, element.dataset.keyframes);
        } else {
          this.mainSheet = element;
        }
        this.hydrateCacheFromCssString(element.textContent, element.media);
      }
    } else {
      const styleSheet = document.createElement("style");
      if (document.head === null) {
        throw new Error("`document.head` cannot be null");
      }
      document.head.appendChild(styleSheet);
      this.mainSheet = styleSheet;
    }

    this.styleCache.injector = (className: string, decl: rawDeclT) => {
      const rule = declarationToRule(className, decl);
      let sheet;
      if (decl.media) {
        const query: string = decl.media;
        if (!this.mediaSheets[query]) {
          const mediaSheet = document.createElement("style");
          mediaSheet.media = query;
          this.mediaSheets[query] = mediaSheet;
          if (this.mainSheet.parentNode) {
            this.mainSheet.parentNode.appendChild(mediaSheet);
          }
        }
        sheet = this.mediaSheets[query].sheet;
      } else {
        sheet = this.mainSheet.sheet;
      }
      // Casting workaround for https://github.com/facebook/flow/issues/2696
      ((sheet: any): CSSStyleSheet).insertRule(
        rule,
        ((sheet: any): CSSStyleSheet).cssRules.length
      );
    };

    this.keyframesCache.injector = (id, keyframes) => {
      const rule = keyframesToCss(id, keyframes);
      ((this.keyframesSheet: any): CSSStyleSheet).insertRule(
        rule,
        ((this.fontFaceSheet: any): CSSStyleSheet).cssRules.length
      );
    };

    this.fontFaceCache.injector = (id, fontFace) => {
      const rule = fontFaceToCss(id, fontFace);
      ((this.fontFaceSheet: any): CSSStyleSheet).insertRule(
        rule,
        ((this.fontFaceSheet: any): CSSStyleSheet).cssRules.length
      );
    };
  }

  hydrateCacheFromCssString(css: string, media: string) {
    let decl; // {1: className, 2: pseudo, 3: block}
    while ((decl = DECL_REGEX.exec(css))) {
      this.styleCache.classGenerator.increment();
      this.styleCache.setBlock(decl[1], {
        block: decl[3],
        pseudo: decl[2],
        media
      });
    }
  }
}

export default StyletronClient;

function hydrateIds(target, source) {
  const ids = source.split(",");
  for (let i = 0; i < ids.length; i++) {
    target[ids[i]] = true;
  }
}

function declarationToRule(className, {block, pseudo}) {
  let selector = `.${className}`;
  if (pseudo) {
    selector += pseudo;
  }
  return `${selector}{${block}}`;
}
