const fs = require('fs');
const path = require('path');

const convert = require('./util/css-to-js');

// CSS FIXTURES
const cssDir = path.join(__dirname, 'fixtures', 'css');
const sources = fs.readdirSync(cssDir);
sources.forEach(filename => {
  const css = fs.readFileSync(path.join(cssDir, filename), 'utf8').toString().trim();
  const {result, inverted, raw} = convert(css);
  const basename = path.parse(filename).name;
  fs.writeFileSync(path.join(__dirname, 'styles', `${basename}.aphrodite.json`), JSON.stringify(result), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'styles', `${basename}.jss.json`), JSON.stringify(inverted), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'styles', `${basename}.styletron.json`), JSON.stringify(raw), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'styles', `${basename}.glamor.json`), JSON.stringify(raw), 'utf8');
});

// JSON FIXTURES
const jsonDir = path.join(__dirname, 'fixtures', 'json');
const jsonSources = fs.readdirSync(jsonDir);
jsonSources.forEach(filename => {
  if (filename[0] === '.') {
    return;
  }
  const basename = path.parse(filename).name;
  const json = JSON.parse(fs.readFileSync(path.join(jsonDir, filename), 'utf8'));
  const sheet = declArrayToSheet(json);
  fs.writeFileSync(path.join(__dirname, 'styles', `${basename}.aphrodite.json`), JSON.stringify(sheet), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'styles', `${basename}.jss.json`), JSON.stringify(sheet), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'styles', `${basename}.styletron.json`), JSON.stringify(json), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'styles', `${basename}.glamor.json`), JSON.stringify(json), 'utf8');
});

function declArrayToSheet(arr) {
  return arr.reduce((acc, obj, i) => {
    acc[`c${i}`] = obj;
    return acc;
  }, {});
}
