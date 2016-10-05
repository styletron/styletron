const baseHandler = require('./base-obj-to-css');

module.exports = cacheToStylesheets;

/*
 * Converts cache object to a CSS string
 * @param  {object} cacheObj Cache object
 * @return {string}          String of CSS
 */
function cacheToStylesheets(cacheObj) {
  let mediaSheets;
  let mainCss = '';
  for (let key in cacheObj) {
    if (key === 'media') {
      mediaSheets = getMediaSheets(cacheObj[key]);
      continue;
    }
    mainCss += baseHandler(key, cacheObj[key]);
  }
  const mainSheet = {
    css: mainCss
  };
  return mediaSheets ? [mainSheet].concat(mediaSheets) : [mainSheet];
}

function getMediaSheets(mediaObj) {
  const stylesheets = [];
  for (let query in mediaObj) {
    const obj = mediaObj[query];
    let mediaCss = '';
    for (let key in obj) {
      mediaCss += baseHandler(key, obj[key]);
    }
    stylesheets.push({
      media: query,
      css: mediaCss
    });
  }
  return stylesheets;
}
