declare var __DEV__: boolean;

import hyphenate from "./hyphenate-style-name";
import validateKeyframesObject from "./validate-keyframes-object";
import generateAlphabeticName from "./generate-alphabetic-name";
import {hash} from "./hash";

import type {
  StyleObject,
  FontFaceObject,
  KeyframesObject,
} from "styletron-standard";

export function hashCssObject(
  cssObject: StyleObject | FontFaceObject | KeyframesObject,
): string {
  return generateAlphabeticName(hash(JSON.stringify(cssObject)));
}

export function keyframesToBlock(keyframes: {[x: string]: any}): string {
  if (__DEV__) {
    validateKeyframesObject(keyframes);
  }
  if (__DEV__ && typeof Object.getPrototypeOf(keyframes) !== "undefined") {
    if (Object.getPrototypeOf(keyframes) !== Object.getPrototypeOf({})) {
      // eslint-disable-next-line no-console
      console.warn(
        "Only plain objects should be used as animation values. Unexpectedly recieved:",
        keyframes,
      );
    }
  }
  let result = "";
  for (const animationState in keyframes) {
    result += `${animationState}{${declarationsToBlock(
      keyframes[animationState],
    )}}`;
  }
  return result;
}

export function declarationsToBlock(style: any): string {
  let css = "";
  for (const prop in style) {
    const val = style[prop];
    if (typeof val === "string" || typeof val === "number") {
      css += `${hyphenate(prop)}:${val};`;
    }
  }
  // trim trailing semicolon
  return css.slice(0, -1);
}

export function keyframesBlockToRule(id: string, block: string): string {
  return `@keyframes ${id}{${block}}`;
}

export function fontFaceBlockToRule(id: string, block: string): string {
  return `@font-face{font-family:${id};${block}}`;
}
