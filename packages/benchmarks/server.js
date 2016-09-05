const StyletronServer = require('styletron-server');
const aphrodite = require('aphrodite');
const jss = require('jss');

const uberApp = {
  jss: require('./app/uber.jss'),
  styletron: require('./app/uber.styletron'),
  aphrodite: require('./app/uber.aphrodite')
};

const airbnbApp = {
  jss: require('./app/airbnb.jss'),
  styletron: require('./app/airbnb.styletron'),
  aphrodite: require('./app/airbnb.aphrodite')
}

const allUniqueApp = {
  jss: require('./app/all-unique.jss'),
  styletron: require('./app/all-unique.styletron'),
  aphrodite: require('./app/all-unique.aphrodite')
}

const halfUniqueApp = {
  jss: require('./app/half-unique.jss'),
  styletron: require('./app/half-unique.styletron'),
  aphrodite: require('./app/half-unique.aphrodite')
}

const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;

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
    const jssInstance = jss.create();
    uberApp.jss(jssInstance);
    jssInstance.sheets.toString();
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
    const jssInstance = jss.create();
    airbnbApp.jss(jssInstance);
    jssInstance.sheets.toString();
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
    const jssInstance = jss.create();
    allUniqueApp.jss(jssInstance);
    jssInstance.sheets.toString();
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
    const jssInstance = jss.create();
    halfUniqueApp.jss(jssInstance);
    jssInstance.sheets.toString();
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({'async': false});
