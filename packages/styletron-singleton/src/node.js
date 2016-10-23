const {INSTANCE_KEY} = require('./constants');
const StyletronServer = require('styletron-server');

const topLevel = typeof global !== 'undefined'
  ? global
  : {};

let instance = topLevel[INSTANCE_KEY];

if (!instance) {
  const styletron = new StyletronServer();
  instance = topLevel[INSTANCE_KEY] = styletron;
}

module.exports = instance;
