const hyphenate = require('./hyphenate-style-name');

module.exports = injectStyle;

function injectStyle(styletron, styles, media, pseudo) {
  let classString = '';
  for (let key in styles) {
    const val = styles[key];
    const valType = typeof val;
    if (valType === 'string' || valType === 'number') {
      classString += ' ' + styletron.injectDeclaration({prop: hyphenate(key), val, media, pseudo});
      continue;
    }
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        const hyphenated = hyphenate(key);
        classString += ' ' + styletron.injectDeclaration({prop: hyphenated, val: val[i], media, pseudo});
      }
      continue;
    }
    if (valType === 'object') {
      if (key[0] === ':') {
        classString += ' ' + injectStyle(styletron, val, media, key);
        continue;
      }
      if (key.substring(0, 6) === '@media') {
        classString += ' ' + injectStyle(styletron, val, key.substr(7), pseudo);
        continue;
      }
    }
  }
  // remove leading space on way out
  return classString.slice(1);
}
