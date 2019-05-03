// @flow

import type {
  Properties,
  FontFace as FontFaceObject,
  KeyframesObject,
} from "./style-types";

export type {FontFaceObject, KeyframesObject};

// Note: $Shape is needed to make polymorphic withStyle refinements work correctly
// It seems functions satisfy this type without $Shape
// See: https://github.com/facebook/flow/issues/6784
//
//
//
//
//
//
export type StyleObject = $Shape<{
  ...Properties,
  [string]: StyleObject, // Unrecognized properties are assumed to be media queries or pseudo selectors w/ nested style object. See: https://github.com/styletron/styletron-standard
}>;

export interface StandardEngine {
  renderStyle(style: StyleObject): string;
  renderKeyframes(keyframes: KeyframesObject): string;
  renderFontFace(fontFace: FontFaceObject): string;
}

export function driver(style: StyleObject, styletron: StandardEngine): string {
  const tx = renderDeclarativeRules(style, styletron);
  return styletron.renderStyle(tx);
}

export function getInitialStyle(): StyleObject {
  return {};
}

export function renderDeclarativeRules(
  style: StyleObject,
  styletron: StandardEngine,
) {
  for (const key in style) {
    const val = style[key];
    if (key === "animationName" && typeof val !== "string") {
      style.animationName = styletron.renderKeyframes((val: any));
      continue;
    }
    if (key === "fontFamily" && typeof val !== "string") {
      if (Array.isArray(val)) {
        let result = "";
        for (const font of val) {
          if (typeof font === "object") {
            result += `${styletron.renderFontFace((font: any))},`;
          } else if (typeof font === "string") {
            result += `${font},`;
          }
        }
        style.fontFamily = result.slice(0, -1);
        continue;
      } else {
        style.fontFamily = styletron.renderFontFace((val: any));
        continue;
      }
    }
    if (typeof val === "object" && val !== null) {
      renderDeclarativeRules(val, styletron);
    }
  }
  return style;
}
