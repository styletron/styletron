const cacheToCss = require('../cache-to-css');
const Styletron = require('../styletron-server');
const fs = require('fs');
const path = require('path');
const test = require('tape');
const util = require('util');

class StyletronTest extends Styletron {
  constructor(...args) {
    super(...args);
  }
  setCache(cache) {
    this.cache = cache;
  }
}

const cache = require('../../fixtures/basic.js');
const css = fs.readFileSync(path.resolve(__dirname, '../../fixtures/basic.css'), 'utf8').trim();

test('test toCss', t => {
  t.equal(cacheToCss(cache), css);
  t.end();
});

test('test toCss method', t => {
  const instance = new StyletronTest();
  instance.setCache(cache);
  t.equal(instance.getCss(), css);
  t.end();
});
