// @flow

import type {Properties} from "./style-types.js";

type fontFaceT = {
  src?: string,
};

type keyframesT = {
  from?: Properties<string>,
  to?: Properties<string>,
  [string]: Properties<string>,
};

// TODO: investigate why $Shape is needed
type NestedStyleT<T> = $Shape<{
  ...T,
  [string]: {
    ...T,
    [string]: T,
  },
}>;

type baseStyleT = NestedStyleT<Properties<string>>;

type declarativeStyleT = NestedStyleT<
  Properties<string, fontFaceT, keyframesT>,
>;

export interface StandardEngine {
  renderStyle(style: baseStyleT): string;
  renderKeyframes(keyframes: keyframesT): string;
  renderFontFace(fontFace: fontFaceT): string;
}

export function driver(style: declarativeStyleT, styletron: StandardEngine) {
  const tx = renderDeclarativeRules(style, styletron);
  return styletron.renderStyle(tx);
}

export function getInitialStyle(): declarativeStyleT {
  return {};
}

function renderDeclarativeRules(
  style: declarativeStyleT,
  styletron: StandardEngine,
): baseStyleT {
  for (const key in style) {
    const val = style[key];
    if (key === "animationName" && typeof val !== "string") {
      style.animationName = ((styletron.renderKeyframes(
        ((val: any): keyframesT),
      ): any): keyframesT);
      continue;
    }
    if (key === "fontFamily" && typeof val !== "string") {
      style.fontFamily = ((styletron.renderFontFace(
        ((val: any): fontFaceT),
      ): any): fontFaceT);
      continue;
    }
    if (typeof val === "object" && val !== null) {
      renderDeclarativeRules((val: any), styletron);
    }
  }
  // TODO avoid type casting
  return (style: any);
}

export type {baseStyleT, declarativeStyleT, keyframesT, fontFaceT};
