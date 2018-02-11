// @flow

import SequentialIDGenerator from "../sequential-id-generator.js";

import cacheToStylesheets from "./cache-to-stylesheets.js";
import {generateHtmlString, cacheToCss} from "./utils.js";
import {keyframesToCss, fontFaceToCss} from "../utils/serializers.js";

export type sheetT = {|
  css: string,
  media?: string,
  keyframesIds?: Array<string>,
  fontFaceIds?: Array<string>
|};

class StyletronServer implements StyletronEngine {
  styleIds: SequentialIDGenerator;
  mainStyleCache: Cache<string>;
  mediaStyleCache: {[string]: Cache<string>};
  keyframesCache: Cache<string>;
  fontFaceCache: Cache<string>;
  keyframesCss: string;
  fontFaceCss: string;

  constructor(opts?: optionsT) {
    this.keyframesCss = "";
    this.fontFaceCss = "";

    // create shared style id generator
    this.styleIds = new SequentialIDGenerator();

    this.mainStyleCache = new Cache(this.styleIds);
    this.mediaStyleCache = {};

    // font face and keyframes get their own id generator
    this.fontFaceCache = new Cache(new SequentialIDGenerator());
    this.keyframesCache = new Cache(new SequentialIDGenerator());

    // add injectors to accumulate CSS
    this.fontFaceCache.injector = (id, fontFace) => {
      this.fontFaceCss += fontFaceToCss(id, fontFace);
    };
    this.keyframesCache.injector = (id, keyframes) => {
      this.keyframesCss += keyframesToCss(id, keyframes);
    };
  }

  renderStyle(style: coreStyleT) {}

  renderFontFace(fontFace: fontFaceT) {}

  renderKeyframes(keyframes: keyframesT) {}

  getStylesheets(): Array<sheetT> {
    return [
      ...(this.fontFaceCss.length
        ? [
            {
              css: this.fontFaceCss,
              fontFaceIds: Object.keys(this.fontFaceCache.ids)
            }
          ]
        : []),
      ...cacheToStylesheets(this.styleCache.cache),
      ...(this.keyframesCss.length
        ? [
            {
              css: this.keyframesCss,
              keyframesIds: Object.keys(this.keyframesCache.ids)
            }
          ]
        : [])
    ];
  }

  getStylesheetsHtml(className?: string = "_styletron_hydrate_") {
    return generateHtmlString(this.getStylesheets(), className);
  }

  getCss() {
    return cacheToCss(this.styleCache.cache);
  }
}

type cacheItemT<T> = {|
  id: string,
  value: T
|};

export class Cache<T> {
  cache: {[string]: cacheItemT<T>};
  idGenerator: SequentialIDGenerator;
  onNewValue: (string, T) => any;

  constructor(idGenerator: SequentialIDGenerator) {
    this.cache = {};
    this.idGenerator = idGenerator;
  }

  addValue(key: string, value: any) {
    const cached = this.cache[key];
    if (cached) {
      return cached;
    }
    const id = this.idGenerator.next();
    this.cache[key] = {id, value};
    if (this.onNewValue) {
      this.onNewValue(id, value);
    }
    return id;
  }
}

export default StyletronServer;
