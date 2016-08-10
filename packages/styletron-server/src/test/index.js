const cacheToCss = require('../cache-to-css');
const Styletron = require('../styletron-server');

const fs = require('fs');
const path = require('path');
const test = require('tape');
const util = require('util');

const fixtures = require('test-fixtures');

class StyletronTest extends Styletron {
  constructor(...args) {
    super(...args);
  }
  setCache(cache) {
    this.cache = cache;
  }
}

test('test toCss', t => {
  t.equal(cacheToCss(fixtures.basic.cache), fixtures.basic.css);
  t.end();
});

test('test toCss method', t => {
  const instance = new StyletronTest();
  instance.setCache(fixtures.basic.cache);
  t.equal(instance.getCss(), fixtures.basic.css);
  t.end();
});
