const baseHandler = require('./base-obj-to-css');

// https://blogs.msdn.microsoft.com/ieinternals/2011/05/14/stylesheet-limits-in-internet-explorer/
const IE9_RULE_LIMIT = 4095;

module.exports = cacheToStylesheetsOldIE;

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
  for (let key in cacheObj) {
    if (key === 'media') {
      mediaSheets = getMediaSheets(cacheObj[key]);
      continue;
    }
    ruleCount += Object.keys(cacheObj[key]).length;
    mainCss += baseHandler(key, cacheObj[key]);
    if (ruleCount >= IE9_RULE_LIMIT) {
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
  for (let query in mediaObj) {
    const obj = mediaObj[query];
    let mediaCss = '';
    let ruleCount = 0;
    for (let key in obj) {
      if (ruleCount >= IE9_RULE_LIMIT) {
        stylesheets.push({media: query, css: mediaCss});
        mediaCss = '';
        ruleCount = 0;
      }
      ruleCount++;
      mediaCss += baseHandler(key, obj[key]);
    }
    stylesheets.push({
      media: query,
      css: mediaCss
    });
  }
  return stylesheets;
}
