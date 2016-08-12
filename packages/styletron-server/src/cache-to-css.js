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

function baseHandler(key, valueObj) {
  return key === 'pseudo' ?
    pseudoObjToCss(valueObj) : valsObjToCss(key, valueObj);
}

function pseudoObjToCss(pseudoObj) {
  let css = '';
  for (let pseudoClass in pseudoObj) {
    const propsObj = pseudoObj[pseudoClass];
    for (let prop in propsObj) {
      css += valsObjToCss(prop, propsObj[prop], pseudoClass);
    }
  }
  return css;
}

function valsObjToCss(prop, valsObj, pseudo) {
  let css = '';
  for (let val in valsObj) {
    const className = valsObj[val];
    css += declToCss(prop, val, className, pseudo);
  }
  return css;
}

function declToCss(prop, val, className, pseudo) {
  const classString = pseudo ? `${className}${pseudo}` : className;
  return `.${classString}{${prop}:${val}}`;
}
