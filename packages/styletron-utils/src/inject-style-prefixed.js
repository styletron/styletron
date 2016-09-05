const injectStyle = require('./inject-style');
const prefixAll = require('inline-style-prefixer/static');

module.exports = injectPrefixed;

function injectPrefixed(styletron, styles, media, pseudo) {
  const prefixed = prefixAll(styles);
  return injectStyle(styletron, prefixed, media, pseudo);
}
