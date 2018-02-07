/* @flow */

import type {cacheT, mediaCacheT} from "../core.js";

import {baseHandler} from "./utils.js";
import type {sheetT} from "./server.js";

export default cacheToStylesheets;

export function cacheToStylesheets(cacheObj: cacheT): Array<sheetT> {
  let mediaSheets;
  let mainCss = "";
  for (const key in cacheObj) {
    if (key === "media") {
      mediaSheets = getMediaSheets(cacheObj[key]);
      continue;
    }
    mainCss += baseHandler(key, cacheObj[key]);
  }
  const mainSheet = {
    css: mainCss,
    media: ""
  };
  return mediaSheets ? [mainSheet].concat(mediaSheets) : [mainSheet];
}

function getMediaSheets(mediaObj: mediaCacheT): Array<sheetT> {
  const stylesheets = [];
  for (const query in mediaObj) {
    const obj = mediaObj[query];
    let mediaCss = "";
    for (const key in obj) {
      mediaCss += baseHandler(key, obj[key]);
    }
    stylesheets.push({
      media: query,
      css: mediaCss
    });
  }
  return stylesheets;
}
