const StyletronServer = require('styletron-server');
const aphrodite = require('aphrodite');
const JSScreate = require('jss').create;
const JSSSheetsRegistry = require('jss').SheetsRegistry;
const glamor = require('glamor');
const glamorServer = require('glamor/server');
const StyletronUtils = require('styletron-utils');

const uberApp = {
  jss: require('./app/uber.jss'),
  styletron: require('./app/uber.styletron'),
  aphrodite: require('./app/uber.aphrodite'),
  glamor: require('./app/uber.glamor'),
};

const airbnbApp = {
  jss: require('./app/airbnb.jss'),
  styletron: require('./app/airbnb.styletron'),
  aphrodite: require('./app/airbnb.aphrodite'),
  glamor: require('./app/airbnb.glamor'),
};

const allUniqueApp = {
  jss: require('./app/all-unique.jss'),
  styletron: require('./app/all-unique.styletron'),
  aphrodite: require('./app/all-unique.aphrodite'),
  glamor: require('./app/all-unique.glamor'),
};

const halfUniqueApp = {
  jss: require('./app/half-unique.jss'),
  styletron: require('./app/half-unique.styletron'),
  aphrodite: require('./app/half-unique.aphrodite'),
  glamor: require('./app/half-unique.glamor'),
};

const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

suite
  .add('aphrodite (uber.css)', function() {
    aphrodite.StyleSheetServer.renderStatic(uberApp.aphrodite);
  })
  .add('styletron (uber.css)', function() {
    let styletron = new StyletronServer();
    uberApp.styletron(styletron);
    styletron.getCss();
  })
  .add('jss (uber.css)', function() {
    const jssInstance = JSScreate();
    const registry = new JSSSheetsRegistry();
    registry.add(uberApp.jss(jssInstance));
    registry.toString();
  })
  .add('glamor (uber.css)', function() {
    glamorServer.renderStatic(uberApp.glamor);
  })
  .add('aphrodite (airbnb.css)', function() {
    aphrodite.StyleSheetServer.renderStatic(airbnbApp.aphrodite);
  })
  .add('styletron (airbnb.css)', function() {
    let styletron = new StyletronServer();
    airbnbApp.styletron(styletron);
    styletron.getCss();
  })
  .add('jss (airbnb.css)', function() {
    const jssInstance = JSScreate();
    const registry = new JSSSheetsRegistry();
    registry.add(airbnbApp.jss(jssInstance));
    registry.toString();
  })
  .add('glamor (airbnb.css)', function() {
    glamorServer.renderStatic(airbnbApp.glamor);
  })
  .add('aphrodite (all-unique)', function() {
    aphrodite.StyleSheetServer.renderStatic(allUniqueApp.aphrodite);
  })
  .add('styletron (all-unique)', function() {
    let styletron = new StyletronServer();
    allUniqueApp.styletron(styletron);
    styletron.getCss();
  })
  .add('jss (all-unique)', function() {
    const jssInstance = JSScreate();
    const registry = new JSSSheetsRegistry();
    registry.add(allUniqueApp.jss(jssInstance));
    registry.toString();
  })
  .add('glamor (all-unique)', function() {
    glamorServer.renderStatic(allUniqueApp.glamor);
  })
  .add('aphrodite (half-unique)', function() {
    aphrodite.StyleSheetServer.renderStatic(halfUniqueApp.aphrodite);
  })
  .add('styletron (half-unique)', function() {
    let styletron = new StyletronServer();
    halfUniqueApp.styletron(styletron);
    styletron.getCss();
  })
  .add('jss (half-unique)', function() {
    const jssInstance = JSScreate();
    const registry = new JSSSheetsRegistry();
    registry.add(halfUniqueApp.jss(jssInstance));
    registry.toString();
  })
  .add('glamor (half-unique)', function() {
    glamorServer.renderStatic(halfUniqueApp.glamor);
  })
  .add('aphrodite (vendor prefix)', function() {
    aphrodite.StyleSheetServer.renderStatic(_ => {
      const sheet = aphrodite.StyleSheet.create({
        a: {
          width: 'calc(100%)',
          height: ['min-content', 'calc(50%)'],
          boxSizing: 'border-box',
        },
      });
      aphrodite.css(sheet.a);
    });
  })
  .add('styletron (vendor prefix)', function() {
    let styletron = new StyletronServer();
    StyletronUtils.injectStylePrefixed(styletron, {
      width: 'calc(100%)',
      height: ['min-content', 'calc(50%)'],
      boxSizing: 'border-box',
    });
    styletron.getCss();
  })
  .add('glamor (vendor prefix)', function() {
    glamorServer.renderStatic(_ => {
      glamor.style({
        width: 'calc(100%)',
        height: ['min-content', 'calc(50%)'],
        boxSizing: 'border-box',
      });
      return '<div></div>';
    });
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: false });
