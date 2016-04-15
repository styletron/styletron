var styletron = require('../../');
var asap = require('asap');

var done = require('../done');

styletron.injectOnce('foo', '.foo {}');

asap(function() {
  done({content: document.querySelector('style').textContent});
});
