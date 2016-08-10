const Styletron = require('../styletron-client');
const test = require('tape');
const util = require('util');
const fs = require('fs');
const path = require('path');
const fenwick = require('fenwick-tree');
const forEach = Array.prototype.forEach;

const fixtures = require('test-fixtures');

class StyletronTest extends Styletron {
  constructor(...args) {
    super(...args);
  }
  getCache() {
    return this.cache;
  }
  getCounts() {
    return this.counts;
  }
}

test('hydration', t => {
  const element = createStyleElement(fixtures.basic.css);
  const instance = new StyletronTest(element);
  t.deepEqual(instance.getCache(), fixtures.basic.cache);
  const counts = instance.getCounts();
  t.equal(fenwick.query(counts, 0), 3);
  t.equal(fenwick.query(counts, 1), 5);
  t.end();
});

test('rule insertion order', t => {
  const element = createStyleElement('');
  const instance = new StyletronTest(element);
  const decls = [
    {prop: 'color', val: 'red'},
    {prop: 'color', val: 'blue'},
    {prop: 'color', val: 'blue', media: '(max-width: 333px)'},
    {prop: 'color', val: 'green'},
    {prop: 'color', val: 'red', media: 'screen and (max-width: 400px)'},
    {prop: 'color', val: 'purple'}
  ];
  decls.forEach(decl => instance.injectDeclaration(decl));
  t.equal(element.sheet.rules.length, 6);
  const expected = [
    '.c0 { color: red; }',
    '.c1 { color: blue; }',
    '.c3 { color: green; }',
    '.c5 { color: purple; }',
    '@media (max-width: 333px) { \n  .c2 { color: blue; }\n}',
    '@media screen and (max-width: 400px) { \n  .c4 { color: red; }\n}'
  ];
  forEach.call(element.sheet.rules, (rule, i) => {
    t.equal(rule.cssText, expected[i]);
  });
  t.end();
});

function createStyleElement(css) {
  const element = document.createElement('style');
  element.appendChild(document.createTextNode(css));
  document.body.appendChild(element);
  return element;
}
