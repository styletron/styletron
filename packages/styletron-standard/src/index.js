// @flow

import type {s1, d1, keyframesT, fontFaceT} from "./styling.js";

export interface StandardEngine {
  renderStyle(style: s1): string;
  renderKeyframes(keyframes: keyframesT): string;
  renderFontFace(fontFace: fontFaceT): string;
}

export function driver(style: d1, styletron: StandardEngine) {
  const tx = renderDeclarativeRules(style, styletron);
  return styletron.renderStyle(tx);
}

export function getInitialStyle(): d1 {
  return {};
}

function renderDeclarativeRules(style: d1, styletron: StandardEngine): s1 {
  for (const key in style) {
    const val = style[key];
    if (key === "animationName" && typeof val !== "string") {
      style.animationName = styletron.renderKeyframes(((val: any): keyframesT));
      continue;
    }
    if (key === "fontFamily" && typeof val !== "string") {
      style.fontFamily = styletron.renderFontFace(((val: any): fontFaceT));
      continue;
    }
    if (typeof val === "object" && val !== null) {
      renderDeclarativeRules((val: any), styletron);
    }
  }
  // TODO avoid type casting
  return (style: any);
}

export * from "./styling.js";
