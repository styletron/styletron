import baseHandler from './base-obj-to-css';

export default cacheObjToCss;

/*
 * Converts cache object to a CSS string
 * @param  {object} cacheObj Cache object
 * @return {string}          String of CSS
 */
function cacheObjToCss(cacheObj) {
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

function mediaObjToCss(mediaObj) {
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
