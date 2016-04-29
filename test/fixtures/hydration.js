/**
 * Begin mock server rendering
 */

var constants = require('../../constants');
window[constants.HYDRATE_KEY] = ['foo'];

/**
 * End mock server rendering
 */

var styletron = require('../../');
var asap = require('asap');

var done = require('../done');

// some server-rendered style (should not be injected)
styletron.injectOnce('.foo {}', 'foo');

// some client-rendered style (should be injected)
styletron.injectOnce('.bar {}', 'bar');

asap(function() {
  done({content: document.querySelector('style').textContent});
});
