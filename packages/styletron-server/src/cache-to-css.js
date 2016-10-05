const baseHandler = require('./base-obj-to-css');

module.exports = cacheObjToCss;

/*
 * Converts cache object to a CSS string
 * @param  {object} cacheObj Cache object
 * @return {string}          String of CSS
 */
function cacheObjToCss(cacheObj) {
  let mediaCss = '';
  let css = '';
  for (let key in cacheObj) {
    if (key === 'media') {
      mediaCss += mediaObjToCss(cacheObj[key]);
      continue;
    }
    css += baseHandler(key, cacheObj[key]);
  }
  return css + mediaCss;
}

function mediaObjToCss(mediaObj) {
  let css = '';
  for (let query in mediaObj) {
    const obj = mediaObj[query];
    let mediaCss = '';
    for (let key in obj) {
      mediaCss += baseHandler(key, obj[key]);
    }
    css += `@media ${query}{${mediaCss}}`;
  }
  return css;
}
