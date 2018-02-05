import hyphenate from "./hyphenate-style-name.js";

export function styleToCss(style: Object): string {
  let css = "";
  for (const prop in style) {
    const val = style[prop];
    if (typeof val === "string" || typeof val === "number") {
      css += `${hyphenate(prop)}:${val};`;
    }
  }
  // remove trailing semicolon
  return css.slice(0, -1);
}

export function keyframesToCss(id, keyframes) {
  let frames = "";
  for (const frame in keyframes) {
    frames += `${frame}:{${styleToCss(keyframes[frame])}}`;
  }
  return `@keyframes ${id}{${frames}}`;
}

export function fontFaceToCss(id, fontFace) {
  return `@font-face{font-family:"${id}";${styleToCss(fontFace)}}`;
}
