const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');

const sources = fs
  .readdirSync(stylesDir)
  .filter(filename => path.parse(filename).ext === '.json')
  .reduce((acc, filename) => {
    const base = path.parse(filename).name;
    const [app] = base.split('.');
    acc[app] = true;
    return acc;
  }, {});

const keys = Object.keys(sources);
const bundlesDir = path.join(__dirname, 'app');

keys.forEach(key => {
  const styletronSrc = generateStyletronBundle(key);
  fs.writeFileSync(path.join(bundlesDir, `${key}.styletron.js`), styletronSrc, 'utf8');

  const glamorSrc = generateGlamorBundle(key);
  fs.writeFileSync(path.join(bundlesDir, `${key}.glamor.js`), glamorSrc, 'utf8');

  const aphroditeSrc = generateAphroditeBundle(key);
  fs.writeFileSync(path.join(bundlesDir, `${key}.aphrodite.js`), aphroditeSrc, 'utf8');

  const jssSrc = generateJssBundle(key);
  fs.writeFileSync(path.join(bundlesDir, `${key}.jss.js`), jssSrc, 'utf8');

});

function generateStyletronBundle(name) {
  return (
`const StyletronUtils = require('styletron-utils');

const rules = require('../styles/${name}.styletron');
const len = rules.length;

module.exports = function (styletronInstance) {
  for (let i = 0; i < len; i++) {
    StyletronUtils.injectStyle(styletronInstance, rules[i])
  }
}
`);
}

function generateGlamorBundle(name) {
  return (
`const glamor = require('glamor');

const rules = require('../styles/${name}.glamor');
const len = rules.length;

module.exports = function () {
  for (let i = 0; i < len; i++) {
    glamor.style(rules[i]);
  }
  return '<div></div>';
}
`);
}

function generateAphroditeBundle(name) {
  return (
`const aphrodite = require('aphrodite');

const sheet = require('../styles/${name}.aphrodite');
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
`const sheet = require('../styles/${name}.jss');

module.exports = function (jssInstance) {
  const jssSheet = jssInstance.createStyleSheet(sheet);
  jssSheet.attach();
  return jssSheet;
}
`);
}
