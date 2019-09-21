import { StandardEngine } from "styletron-standard";
import { Cache, MultiCache } from "../cache";
import { StyleObject, FontFaceObject, KeyframesObject } from "styletron-standard";
export declare type attrsT = {
    "data-hydrate"?: "keyframes" | "font-face";
    media?: string;
    class?: string;
};
export declare type sheetT = {
    css: string;
    attrs: attrsT;
};
declare type optionsT = {
    prefix?: string;
};
declare class StyletronServer implements StandardEngine {
    styleCache: MultiCache<{
        pseudo: string;
        block: string;
    }>;
    keyframesCache: Cache<KeyframesObject>;
    fontFaceCache: Cache<FontFaceObject>;
    styleRules: {
        [x: string]: string;
    };
    keyframesRules: string;
    fontFaceRules: string;
    constructor(opts?: optionsT);
    renderStyle(style: StyleObject): string;
    renderFontFace(fontFace: FontFaceObject): string;
    renderKeyframes(keyframes: KeyframesObject): string;
    getStylesheets(): Array<sheetT>;
    getStylesheetsHtml(className?: string): string;
    getCss(): string;
}
export declare function generateHtmlString(sheets: Array<sheetT>, className: string): string;
export default StyletronServer;
