const path = require('path');
const fs = require('fs');

const stylesDir = path.join(__dirname, 'styles');

const sources = fs
  .readdirSync(stylesDir)
  .filter(filename => path.parse(filename).ext === '.json')
  .reduce((acc, filename) => {
    const base = path.parse(filename).name;
    const [app, lib] = base.split('.');
    acc.push({app, lib, style: require(path.join(stylesDir, filename))});
    return acc;
  }, []);

const renderers = {
  styletron: require('./renderers/styletron'),
  aphrodite: require('./renderers/aphrodite'),
  jss: require('./renderers/jss')
};
const keys = Object.keys(renderers);

const staticDir = path.join(__dirname, 'static');

sources.forEach(({app, lib, style}) => {
  const renderer = renderers[lib];
  // hydrated
  const hydrated = renderer(style, false);
  fs.writeFileSync(path.join(staticDir, 'hydrate', app, `${lib}.html`), hydrated, 'utf8');
  // client-only
  const clientOnly = renderer(style, true);
  fs.writeFileSync(path.join(staticDir, 'client-only', app, `${lib}.html`), clientOnly, 'utf8');
});
