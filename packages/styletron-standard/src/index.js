// @flow

import type {Properties, FontFace as fontFaceT} from "csstype";

export type {fontFaceT};

export type keyframesT = {
  from?: Properties<>,
  to?: Properties<>,
  [string]: Properties<>,
};

export type StyleProperties = $Diff<
  Properties<>,
  {fontFamily: any, animationName: any},
> & {
  fontFamily: string | fontFaceT,
  animationName: string | keyframesT,
};

// Note: $Shape is needed to make polymorphic withStyle refinements work correctly
// It seems functions satisfy this type without $Shape
// See: https://github.com/facebook/flow/issues/6784
//
//
//
//
//
//
export type baseStyleT = $Shape<{
  ...StyleProperties,
  [string]: baseStyleT, // Unrecognized properties are assumed to be media queries or pseudo selectors w/ nested style object. See: https://github.com/styletron/styletron-standard
}>;

export interface StandardEngine {
  renderStyle(style: baseStyleT): string;
  renderKeyframes(keyframes: keyframesT): string;
  renderFontFace(fontFace: fontFaceT): string;
}

export function driver(style: baseStyleT, styletron: StandardEngine): string {
  const tx = renderDeclarativeRules(style, styletron);
  return styletron.renderStyle(tx);
}

export function getInitialStyle(): baseStyleT {
  return {};
}

export function renderDeclarativeRules(
  style: baseStyleT,
  styletron: StandardEngine,
) {
  for (const key in style) {
    const val = style[key];
    if (key === "animationName" && typeof val !== "string") {
      style.animationName = styletron.renderKeyframes((val: any));
      continue;
    }
    if (key === "fontFamily" && typeof val !== "string") {
      style.fontFamily = styletron.renderFontFace((val: any));
      continue;
    }
    if (typeof val === "object" && val !== null) {
      renderDeclarativeRules(val, styletron);
    }
  }
  return style;
}
