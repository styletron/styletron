'use strict';

var test = require('tape');
var asap = require('asap');
var runBrowser = require('./run-browser');

var styletron = require('../');

test('injecting styles to buffer works', function(t) {
  styletron.injector.startBuffering();
  styletron.injector.injectOnce('foo', '.foo {}');
  var contents = styletron.injector.flushBuffer();
  var alreadyInjected = styletron.injector.getInjectedKeys();
  t.equal(contents, '.foo {}',
    'contents of buffer matches expected');
  t.deepEqual(alreadyInjected, ['foo'],
    'already injected keys matches expected');
  reset();
  t.end();
});

test('autobuffering should fail without document', function(t) {
  t.throws(function() {
    styletron.injector.injectOnce('foo', '.foo {}');
  });
  reset();
  t.end();
});

test('auto-injection works with document', function(t) {
  t.plan(1);

  runBrowser('foo.js', function(result) {
    t.equal(result.content, '.foo {}', 'style tag content matches expected');
  });
});

/**
 * Test helpers
 */

function reset() {
  styletron.injector.reset();
}
