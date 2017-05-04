const fs = require('fs');
const path = require('path');

// Aphrodite
const aphrodite = require('aphrodite');
const aphroditeApps = [
  {
    app: require('./app/uber.aphrodite'),
    filename: 'uber.aphrodite.css',
  },
  {
    app: require('./app/airbnb.aphrodite'),
    filename: 'airbnb.aphrodite.css',
  },
];

function outputAphrodite(aphroditeApp, filename) {
  const {css} = aphrodite.StyleSheetServer.renderStatic(aphroditeApp);
  fs.writeFileSync(
    path.join(__dirname, 'results', filename),
    css.content,
    'utf8'
  );
}

aphroditeApps.forEach(({app, filename}) => outputAphrodite(app, filename));

// Styletron
const StyletronServer = require('styletron-server');
const styletronApps = [
  {
    app: require('./app/uber.styletron'),
    filename: 'uber.styletron.css',
  },
  {
    app: require('./app/airbnb.styletron'),
    filename: 'airbnb.styletron.css',
  },
];

function outputStyletron(styletronApp, filename) {
  const styletron = new StyletronServer();
  styletronApp(styletron);
  const styletroncss = styletron.getCss();
  fs.writeFileSync(
    path.join(__dirname, 'results', filename),
    styletroncss,
    'utf8'
  );
}

styletronApps.forEach(({app, filename}) => outputStyletron(app, filename));

// JSS
const jss = require('jss');
const jssApps = [
  {
    app: require('./app/uber.jss'),
    filename: 'uber.jss.css',
  },
  {
    app: require('./app/airbnb.jss'),
    filename: 'airbnb.jss.css',
  },
];

function outputJss(jssApp, filename) {
  const jssInstance = jss.create();
  jssApp(jssInstance);
  const jsscss = jssInstance.sheets.toString();
  fs.writeFileSync(path.join(__dirname, 'results', filename), jsscss, 'utf8');
}
jssApps.forEach(({app, filename}) => outputJss(app, filename));

// Glamor
const glamor = require('glamor');
const glamorServer = require('glamor/server');
const glamorApps = [
  {
    app: require('./app/uber.glamor'),
    filename: 'uber.glamor.css',
  },
  {
    app: require('./app/airbnb.glamor'),
    filename: 'airbnb.glamor.css',
  },
];

function outputGlamor(glamorApp, filename) {
  const {css} = glamorServer.renderStatic(glamorApp);
  fs.writeFileSync(path.join(__dirname, 'results', filename), css, 'utf8');
}
glamorApps.forEach(({app, filename}) => outputGlamor(app, filename));
