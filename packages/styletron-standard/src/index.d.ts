import { Properties, FontFace as FontFaceObject, KeyframesObject } from "./style-types";
export { FontFaceObject, KeyframesObject };
export interface NestedStyleObject {
    [x: string]: StyleObject;
}
export declare type StyleObject = NestedStyleObject | Properties;
export interface StandardEngine {
    renderStyle(style: StyleObject): string;
    renderKeyframes(keyframes: KeyframesObject): string;
    renderFontFace(fontFace: FontFaceObject): string;
}
export declare function driver(style: StyleObject, styletron: StandardEngine): string;
export declare function getInitialStyle(): StyleObject;
export declare function renderDeclarativeRules(style: StyleObject, styletron: StandardEngine): StyleObject;
