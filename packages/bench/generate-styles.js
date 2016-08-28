const fs = require('fs');
const path = require('path');

const convert = require('./util/css-to-js');

// CSS FIXTURES
const cssDir = path.join(__dirname, 'fixtures', 'css');
const sources = fs.readdirSync(cssDir);
sources.forEach(filename => {
  const css = fs.readFileSync(path.join(cssDir, filename), 'utf8').toString().trim();
  const {result, inverted} = convert(css);
  const basename = path.parse(filename).name;

  fs.writeFileSync(path.join(__dirname, 'styles', `${basename}.json`), JSON.stringify(result), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'styles', `${basename}.inverted.json`), JSON.stringify(inverted), 'utf8');
});

// JSON FIXTURES
const jsonDir = path.join(__dirname, 'fixtures', 'json');
const jsonSources = fs.readdirSync(jsonDir);
jsonSources.forEach(filename => {
  const json = fs.readFileSync(path.join(jsonDir, filename), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'styles', filename), json, 'utf8');
});
