/* @flow */

import type {cacheT, mediaCacheT, pseudoCacheT} from "../core.js";

import type {sheetT} from "./server.js";

export function baseHandler(
  key: string,
  objOrClassName: string | pseudoCacheT
) {
  // TODO: flow type refinement doesn't work well here so coercion is used
  return key === "pseudo"
    ? pseudoObjToCss(((objOrClassName: any): pseudoCacheT))
    : declToCss(key, ((objOrClassName: any): string));
}

function pseudoObjToCss(pseudoObj: pseudoCacheT) {
  let css = "";
  for (const pseudoClass in pseudoObj) {
    const propsObj = pseudoObj[pseudoClass];
    for (const block in propsObj) {
      css += declToCss(block, propsObj[block], pseudoClass);
    }
  }
  return css;
}

function declToCss(block: string, className: string, pseudo?: string) {
  const selector = pseudo ? `${className}${pseudo}` : className;
  return `.${selector}{${block}}`;
}

export function cacheToCss(cacheObj: cacheT) {
  let mediaCss = "";
  let css = "";
  for (const key in cacheObj) {
    if (key === "media") {
      mediaCss += mediaObjToCss(cacheObj[key]);
      continue;
    }
    css += baseHandler(key, cacheObj[key]);
  }
  return css + mediaCss;
}

function mediaObjToCss(mediaObj: mediaCacheT) {
  let css = "";
  for (const query in mediaObj) {
    const obj = mediaObj[query];
    let mediaCss = "";
    for (const key in obj) {
      mediaCss += baseHandler(key, obj[key]);
    }
    css += `@media ${query}{${mediaCss}}`;
  }
  return css;
}

export function generateHtmlString(sheets: Array<sheetT>, className: string) {
  let html = "";
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    const classAttr = className ? ` class="${className}"` : "";
    const mediaAttr = sheet.media ? ` media="${sheet.media}"` : "";
    const keyframesAttr = sheet.keyframesIds
      ? ` data-keyframes="${sheet.keyframesIds.join(",")}"`
      : "";
    const fontFaceAttr = sheet.fontFaceIds
      ? ` data-font-face="${sheet.fontFaceIds.join(",")}"`
      : "";
    html += `<style${classAttr}${mediaAttr}${keyframesAttr}${fontFaceAttr}>${
      sheet.css
    }</style>`;
  }
  return html;
}
