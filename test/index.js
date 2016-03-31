'use strict';

var test = require('tape');
var asap = require('asap');
var jsdom = require('jsdom');

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
  t.plan(2);

  domTest(function() {
    styletron.injector.injectOnce('foo', '.foo {}');

    asap(function() {
      var styleTags = global.document.getElementsByTagName('style');
      t.ok(styleTags.length, 'style tag exists');
      t.equal(styleTags[0].textContent, '.foo {}', 'style tag content matches expected');
      reset();
    });
  });
});

/**
 * Test helpers
 */

function reset() {
  styletron.injector.reset();
}

function domTest(testFn) {
  global.document = jsdom.jsdom();
  testFn();
  asap(function() {
    global.document.close();
    global.document = undefined;
  });
}
