// @flow

declare var __DEV__: boolean;

import hyphenate from "./hyphenate-style-name.js";
import validateKeyframesObject from "./validate-keyframes-object.js";

export function atomicSelector(id: string, pseudo: string): string {
  let selector = `.${id}`;
  if (pseudo) {
    selector += pseudo;
  }
  return selector;
}

export function keyframesToBlock(keyframes: {[string]: Object}): string {
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

export function declarationsToBlock(style: Object): string {
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

export function styleBlockToRule(selector: string, block: string): string {
  return `${selector}{${block}}`;
}
