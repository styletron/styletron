/* @flow */

import type {cacheT, mediaCacheT, pseudoCacheT} from 'styletron-core';

import type {sheetT} from './index.js';

export function baseHandler(
  key: string,
  objOrClassName: string | pseudoCacheT
) {
  // TODO: flow type refinement doesn't work well here so coercion is used
  return key === 'pseudo'
    ? pseudoObjToCss(((objOrClassName: any): pseudoCacheT))
    : declToCss(key, ((objOrClassName: any): string));
}

function pseudoObjToCss(pseudoObj: pseudoCacheT) {
  let css = '';
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

/*
 * Converts cache object to a CSS string
 * @param  {object} cacheObj Cache object
 * @return {string}          String of CSS
 */
export function cacheToCss(cacheObj: cacheT) {
  let mediaCss = '';
  let css = '';
  for (const key in cacheObj) {
    if (key === 'media') {
      mediaCss += mediaObjToCss(cacheObj[key]);
      continue;
    }
    css += baseHandler(key, cacheObj[key]);
  }
  return css + mediaCss;
}

function mediaObjToCss(mediaObj: mediaCacheT) {
  let css = '';
  for (const query in mediaObj) {
    const obj = mediaObj[query];
    let mediaCss = '';
    for (const key in obj) {
      mediaCss += baseHandler(key, obj[key]);
    }
    css += `@media ${query}{${mediaCss}}`;
  }
  return css;
}

export function generateHtmlString(sheets: Array<sheetT>, className: string) {
  let html = '';
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    const classAttr = className ? ` class="${className}"` : '';
    const mediaAttr = sheet.media ? ` media="${sheet.media}"` : '';
    html += `<style${classAttr}${mediaAttr}>${sheet.css}</style>`;
  }
  return html;
}
