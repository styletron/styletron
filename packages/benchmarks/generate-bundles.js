const fs = require('fs');
const path = require('path');

const appsDir = path.join(__dirname, 'app');

const sources = fs
  .readdirSync(appsDir)
  .filter(filename => path.parse(filename).ext === '.js');

const bundlesDir = path.join(__dirname, 'bundles');

sources.forEach(source => {
  const [name, type] = source.split('.');

  const generator = {
    styletron: generateStyletronBundle,
    glamor: generateGlamorBundle,
    aphrodite: generateAphroditeBundle,
    jss: generateJssBundle
  }[type];

  const hydrated = generator(name, true);
  fs.writeFileSync(path.join(bundlesDir, `hydrate.${name}.${type}.js`), hydrated, 'utf8');
  const clientOnly = generator(name, false);
  fs.writeFileSync(path.join(bundlesDir, `client-only.${name}.${type}.js`), clientOnly, 'utf8');
});

function generateStyletronBundle(name) {
  return (
`const styletronApp = require('../app/${name}.styletron');
const StyletronClient = require('styletron-client');

const styletron = new StyletronClient(document.getElementsByClassName('styletron'));
styletronApp(styletron);
`);
}

function generateAphroditeBundle(name, hydrate) {
  const hydrateSrc = hydrate ?
    'aphrodite.StyleSheet.rehydrate(window.renderedClassNames);' : '';

  return (
`const aphrodite = require('aphrodite');
${hydrateSrc}
const aphroditeApp = require('../app/${name}.aphrodite');
aphroditeApp();
`);
}

function generateGlamorBundle(name, hydrate) {
  const hydrateSrc = hydrate ?
    'glamor.rehydrate(window._glam);' : '';

  return (
`const glamor = require('glamor');
${hydrateSrc}
const glamorApp = require('../app/${name}.glamor');
glamorApp();
`);
}

function generateJssBundle(name, hydrate) {
  const hydrateSrc = hydrate ?
(
`const ssStyles = document.getElementById('server-side-styles');
ssStyles.parentNode.removeChild(ssStyles);`
) : '';
  return (
`const jss = require('jss');
const camelCase = require('jss-camel-case').default;
const jssApp = require('../app/${name}.jss');
const jssInstance = jss.create();
jssInstance.use(camelCase());
jssApp(jssInstance);
${hydrateSrc}
`);
}
