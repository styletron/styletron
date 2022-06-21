import type {
  Properties,
  FontFace as FontFaceObject,
  KeyframesObject,
} from "./style-types";

export type {FontFaceObject, KeyframesObject};

export type StyleObject = Properties & {
  [key in string]: Properties[keyof Properties] | StyleObject;
};

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
      style.animationName = styletron.renderKeyframes(val as any);
      continue;
    }
    if (key === "fontFamily" && typeof val !== "string") {
      if (Array.isArray(val)) {
        let result = "";
        for (const font of val) {
          if (typeof font === "object") {
            result += `${styletron.renderFontFace(font as any)},`;
          } else if (typeof font === "string") {
            result += `${font},`;
          }
        }
        style.fontFamily = result.slice(0, -1);
        continue;
      } else if (val === void 0) {
        continue;
      } else {
        style.fontFamily = styletron.renderFontFace(val as any);
        continue;
      }
    }
    if (typeof val === "object" && val !== null) {
      renderDeclarativeRules(val as StyleObject, styletron);
    }
  }
  return style;
}
