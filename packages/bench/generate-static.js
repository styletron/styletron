const path = require('path');
const fs = require('fs');

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
    acc[base][type] = require(path.join(stylesDir, filename));
    return acc;
  }, {});

const fullBenchmarks = ['uber', 'airbnb'];
const syntheticBenchmarks = ['half-unique', 'all-unique'];

const renderers = {
  styletron: require('./renderers/styletron'),
  aphrodite: require('./renderers/aphrodite'),
  jss: require('./renderers/jss')
};
const keys = Object.keys(renderers);

const staticDir = path.join(__dirname, 'static');

fullBenchmarks.forEach(name => {
  const synthetic = false;
  const filenames = sorted[name];
  keys.forEach(key => {
    const renderer = renderers[key];
    const html = renderer(filenames.inverted || filenames.normal, synthetic);
    fs.writeFileSync(path.join(staticDir, name, `${key}.html`), html, 'utf8');
  });
});

syntheticBenchmarks.forEach(name => {
  const filenames = sorted[name];
  const synthetic = true;
  keys.forEach(key => {
    const renderer = renderers[key];
    const html = renderer(filenames.inverted || filenames.normal, synthetic);
    fs.writeFileSync(path.join(staticDir, name, `${key}.html`), html, 'utf8');
  });
});
