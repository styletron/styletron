// const cache = {};

export default function injector(style, styletron) {
  let classString = "";
  for (const key in style) {
    if (key === "animationName") {
      style.animationName = styletron.renderKeyframes();
      continue;
    }
    if (key === "fontFamily") {
      style.fontFamily = styletron.renderFontFace();
      continue;
    }
  }
  classString += styletron.renderStyle(style);
  return classString;
}
