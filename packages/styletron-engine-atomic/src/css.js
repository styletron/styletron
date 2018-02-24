// @flow strict

import hyphenate from "./hyphenate-style-name.js";

export function atomicSelector(id: string, pseudo: string): string {
  let selector = `.${id}`;
  if (pseudo) {
    selector += pseudo;
  }
  return selector;
}

export function keyframesToBlock(keyframes: Object): string {
  let result = "";
  for (const thing in keyframes) {
    result += `${thing}{${declarationsToBlock(keyframes[thing])}}`;
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
