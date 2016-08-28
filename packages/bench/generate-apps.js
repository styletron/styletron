const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');

const sources = fs
  .readdirSync(stylesDir)
  .filter(filename => path.parse(filename).ext === '.json');

const sorted = sources
  .reduce((acc, filename) => {
    let base = path.parse(filename).name;
    const inner = path.parse(base);
    let type = 'normal';
    if (inner.ext) {
      base = inner.name;
      type = inner.ext.slice(1, inner.ext.length);
    }
    acc[base] = acc[base] || {};
    acc[base][type] = filename;
    return acc;
  }, {});

const keys = Object.keys(sorted);
const bundlesDir = path.join(__dirname, 'app');

keys.forEach(key => {
  const filenames = sorted[key];

  const styletronSrc = generateStyletronBundle(filenames.normal);
  fs.writeFileSync(path.join(bundlesDir, `${key}.styletron.js`), styletronSrc, 'utf8');

  const aphroditeSrc = generateAphroditeBundle(filenames.normal);
  fs.writeFileSync(path.join(bundlesDir, `${key}.aphrodite.js`), aphroditeSrc, 'utf8');

  const jssSrc = generateJssBundle(filenames.inverted || filenames.normal);
  fs.writeFileSync(path.join(bundlesDir, `${key}.jss.js`), jssSrc, 'utf8');

});

function generateStyletronBundle(name) {
  return (
`const StyletronUtils = require('styletron-utils');

const sheet = require('../styles/${name}');
const keys = Object.keys(sheet);
const len = keys.length;

module.exports = function (styletronInstance) {
  for (let i = 0; i < len; i++) {
    StyletronUtils.injectStyle(styletronInstance, sheet[keys[i]])
  }
}
`);
}

function generateAphroditeBundle(name) {
  return (
`const aphrodite = require('aphrodite');

const sheet = require('../styles/${name}');
const keys = Object.keys(sheet);
const len = keys.length;

module.exports = function () {
  let aphroditeStyles = aphrodite.StyleSheet.create(sheet);
  for (let i = 0; i < len; i++) {
    aphrodite.css(aphroditeStyles[keys[i]]);
  }
}

`);
}

function generateJssBundle(name) {
  return (
`const sheet = require('../styles/${name}');

module.exports = function (jssInstance) {
  const jssSheet = jssInstance.createStyleSheet(sheet);
  jssSheet.attach();
}
`);
}

