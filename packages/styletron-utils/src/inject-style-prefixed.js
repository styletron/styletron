const createPrefixer = require('inline-style-prefixer/static/createPrefixer');
const staticData = require('inline-style-prefixer/static/staticData');

const plugins = [
  require('inline-style-prefixer/static/plugins/calc'),
  require('inline-style-prefixer/static/plugins/cursor'),
  require('inline-style-prefixer/static/plugins/flex'),
  require('inline-style-prefixer/static/plugins/sizing'),
  require('inline-style-prefixer/static/plugins/gradient'),
  require('inline-style-prefixer/static/plugins/transition'),
  // special flexbox specifications
  require('inline-style-prefixer/static/plugins/flexboxIE'),
  require('inline-style-prefixer/static/plugins/flexboxOld'),
];

const prefixAll = createPrefixer({
  prefixMap: staticData.prefixMap,
  plugins,
});

const createInjectStyle = require('./create-inject-style');

module.exports = createInjectStyle(prefixAll);
