import { StandardEngine, KeyframesObject, FontFaceObject, StyleObject } from "styletron-standard";
import { Cache, MultiCache } from "../cache";
declare type hydrateT = HTMLCollectionOf<HTMLStyleElement> | Array<HTMLStyleElement> | NodeListOf<HTMLStyleElement>;
declare type optionsT = {
    hydrate?: hydrateT;
    container?: Element;
    prefix?: string;
};
declare class StyletronClient implements StandardEngine {
    container: Element;
    styleElements: {
        [x: string]: HTMLStyleElement;
    };
    fontFaceSheet: HTMLStyleElement;
    keyframesSheet: HTMLStyleElement;
    styleCache: MultiCache<{
        pseudo: string;
        block: string;
    }>;
    keyframesCache: Cache<KeyframesObject>;
    fontFaceCache: Cache<FontFaceObject>;
    constructor(opts?: optionsT);
    renderStyle(style: StyleObject): string;
    renderFontFace(fontFace: FontFaceObject): string;
    renderKeyframes(keyframes: KeyframesObject): string;
}
export default StyletronClient;
