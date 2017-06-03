import baseHandler from './base-obj-to-css';

// https://blogs.msdn.microsoft.com/ieinternals/2011/05/14/stylesheet-limits-in-internet-explorer/
const IE9_RULE_LIMIT = 4095;

export default cacheToStylesheetsOldIE;

/*
 * Converts cache object to a CSS string
 * @param  {object} cacheObj Cache object
 * @return {string}          String of CSS
 */
function cacheToStylesheetsOldIE(cacheObj) {
  const sheets = [];
  let mediaSheets;
  let mainCss = '';
  let ruleCount = 0;
  for (const key in cacheObj) {
    if (key === 'media') {
      mediaSheets = getMediaSheets(cacheObj[key]);
      continue;
    }
    if (typeof cacheObj[key] === 'string') {
      ruleCount++;
    }
    mainCss += baseHandler(key, cacheObj[key]);
    // TODO: handle case of than 4095 unique values for a single property
    if (ruleCount > IE9_RULE_LIMIT && mainCss) {
      sheets.push({css: mainCss});
      mainCss = '';
      ruleCount = 0;
    }
  }
  if (mainCss) {
    sheets.push({css: mainCss});
  }
  return mediaSheets ? sheets.concat(mediaSheets) : sheets;
}

function getMediaSheets(mediaObj) {
  const stylesheets = [];
  for (const query in mediaObj) {
    const obj = mediaObj[query];
    let mediaCss = '';
    let ruleCount = 0;
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        ruleCount++;
      }
      mediaCss += baseHandler(key, obj[key]);
      // TODO: handle case of than 4095 unique values for a single property
      if (ruleCount > IE9_RULE_LIMIT && mediaCss) {
        stylesheets.push({media: query, css: mediaCss});
        mediaCss = '';
        ruleCount = 0;
      }
    }
    if (mediaCss) {
      stylesheets.push({
        media: query,
        css: mediaCss,
      });
    }
  }
  return stylesheets;
}
