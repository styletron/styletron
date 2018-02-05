// @flow

import type {coreStyleT, keyframesT, fontFaceT} from "./styling.js";

export * from "./styling.js";

export interface StyletronEngine {
  renderStyle(style: coreStyleT): string;
  renderKeyframes(keyframes: keyframesT): string;
  renderFontFace(fontFace: fontFaceT): string;
}
