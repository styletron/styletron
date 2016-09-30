'use strict';

var test = require('tape');
var asap = require('asap');
var runBrowser = require('./run-browser');

var styletron = require('../');

test('injecting styles to buffer works', function(t) {
  styletron.reset();
  styletron.startBuffering();
  styletron.injectOnce('.foo {}', 'foo');
  var contents = styletron.flushBuffer();
  var alreadyInjected = styletron.getInjectedKeys();
  t.equal(contents, '.foo {}',
    'contents of buffer matches expected');
  t.deepEqual(alreadyInjected, ['foo'],
    'already injected keys matches expected');
  t.end();
});

test('autobuffering should fail without document', function(t) {
  styletron.reset();
  t.notOk(styletron.injectOnce('qux', '.qux {}'), 'no injection');
  t.end();
});

test('true singleton', function(t) {
  styletron.reset();
  styletron.startBuffering();
  styletron.injectOnce('.foo {}', 'foo');

  var styletron2 = requireNoCache('../');
  styletron2.injectOnce('.bar {}', 'bar');

  var contents = styletron.flushBuffer();
  var alreadyInjected = styletron.getInjectedKeys();
  t.equal(contents, '.foo {}.bar {}',
    'contents of buffer matches expected');
  t.deepEqual(alreadyInjected, ['foo', 'bar'],
    'already injected keys matches expected');
  t.end();
});

test('auto-injection works with document', function(t) {
  t.plan(1);

  runBrowser('basic.js', function(result) {
    t.equal(result.content, '.foo {}', 'style tag content matches expected');
  });
});

test('hydration works', function(t) {
  t.plan(1);

  runBrowser('hydration.js', function(result) {
    t.equal(result.content, '.bar {}', 'style tag content matches expected');
  });
});

test('injection without key', function(t) {
  styletron.reset();
  styletron.startBuffering();
  styletron.injectOnce('.foo {}');
  styletron.injectOnce('.foo {}');
  styletron.injectOnce('.bar {}');
  var contents = styletron.flushBuffer();
  var alreadyInjected = styletron.getInjectedKeys();
  t.equal(contents, '.foo {}.foo {}.bar {}',
    'contents of buffer matches expected');
  t.deepEqual(alreadyInjected, [],
    'already injected keys matches expected');
  t.end();
});

/**
 * Test Helpers
 */

function requireNoCache(moduleName) {
  delete require.cache[moduleName];
  return require(moduleName);
}
