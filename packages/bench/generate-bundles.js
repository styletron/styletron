const fs = require('fs');
const path = require('path');

const HYDRATED_APPS = ['uber', 'airbnb'];

const appsDir = path.join(__dirname, 'app');

const sources = fs
  .readdirSync(appsDir)
  .filter(filename => path.parse(filename).ext === '.js');

const bundlesDir = path.join(__dirname, 'bundles');

sources.forEach(source => {
  const [name, type] = source.split('.');

  const generator = {
    styletron: generateStyletronBundle,
    aphrodite: generateAphroditeBundle,
    jss: generateJssBundle
  }[type];

  let hydrate = HYDRATED_APPS.indexOf(name) !== -1;
  const src = generator(name, hydrate);
  fs.writeFileSync(path.join(bundlesDir, `${name}.${type}.js`), src, 'utf8');
});

function generateStyletronBundle(name) {
  return (
`const styletronApp = require('../app/${name}.styletron');
const StyletronClient = require('styletron-client');

const styletron = new StyletronClient(document.getElementById('styletron'));
styletronApp(styletron);
`);
}

function generateAphroditeBundle(name, hydrate) {
  const hydrateSrc = hydrate ?
    'aphrodite.StyleSheet.rehydrate(window.renderedClassNames);' : '';

  return (
`const aphrodite = require('aphrodite');
${hydrateSrc}
const aphroditeApp = require('../app/airbnb.aphrodite');
aphroditeApp();
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
