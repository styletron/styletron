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
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({'async': false});
