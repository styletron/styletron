const prefixProperties = require('inline-style-prefixer/lib/static/prefixProps');
const capitalizeString = require('inline-style-prefixer/lib/utils/capitalizeString');
const prefixPropertiesArray = Object.keys(prefixProperties);

const calc = require('inline-style-prefixer/lib/static/plugins/calc');
const cursor = require('inline-style-prefixer/lib/static/plugins/cursor');
const flex = require('inline-style-prefixer/lib/static/plugins/flex');
const sizing = require('inline-style-prefixer/lib/static/plugins/sizing');
const gradient = require('inline-style-prefixer/lib/static/plugins/gradient');
const transition = require('inline-style-prefixer/lib/static/plugins/transition');
// special flexbox specifications
const flexboxIE = require('inline-style-prefixer/lib/static/plugins/flexboxIE');
const flexboxOld = require('inline-style-prefixer/lib/static/plugins/flexboxOld');

const plugins = [
  calc,
  cursor,
  sizing,
  gradient,
  transition,
  flexboxIE,
  flexboxOld,
  flex,
];

const hyphenate = require('./hyphenate-style-name');

module.exports = injectStyle;

function injectStyle(styletron, styles, media, pseudo) {
  let classString = '';
  for (let key in styles) {
    const val = styles[key];
    const valType = typeof val;
    if (valType === 'string' || valType === 'number') {
      // handle vendor prefixed properties
      for (let i = 0; i < prefixPropertiesArray.length; i++) {
        const prefix = prefixPropertiesArray[i];
        const properties = prefixProperties[prefix];
        if (properties[key]) {
          const prefixedPropName = prefix + capitalizeString(key);
          classString +=
            ' ' +
            injectWithPlugins(styletron, prefixedPropName, val, media, pseudo);
        }
      }
      // handle un-prefixed
      classString +=
        ' ' + injectWithPlugins(styletron, key, val, media, pseudo);
      continue;
    }
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        classString +=
          ' ' + injectWithPlugins(styletron, key, val[i], media, pseudo);
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

function injectWithPlugins(styletron, prop, val, media, pseudo) {
  let classString = '';
  const baseHyphenated = hyphenate(prop);
  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i];
    const res = plugin(prop, val);
    if (res) {
      for (let key in res) {
        const resVal = res[key];
        const hyphenated = hyphenate(key);
        const propIsDifferent = hyphenated !== baseHyphenated;
        if (Array.isArray(resVal)) {
          for (let j = 0; j < resVal.length; j++) {
            if (propIsDifferent || resVal[j] !== val) {
              classString +=
                ' ' +
                styletron.injectDeclaration({
                  prop: hyphenated,
                  val: resVal[j],
                  media,
                  pseudo,
                });
            }
          }
        } else if (propIsDifferent || resVal !== val) {
          classString +=
            ' ' +
            styletron.injectDeclaration({
              prop: hyphenated,
              val: resVal,
              media,
              pseudo,
            });
        }
      }
    }
  }
  // inject original last
  classString +=
    ' ' +
    styletron.injectDeclaration({prop: baseHyphenated, val, media, pseudo});
  // remove leading space on way out
  return classString.slice(1);
}
