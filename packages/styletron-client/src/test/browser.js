const Styletron = require('../styletron-client');
const test = require('tape');
const util = require('util');
const fs = require('fs');
const path = require('path');
const forEach = Array.prototype.forEach;

const fixtures = require('test-fixtures');

class StyletronTest extends Styletron {
  constructor(...args) {
    super(...args);
  }
  getCache() {
    return this.cache;
  }
  getMediaSheets() {
    return this.mediaSheets;
  }
  getUniqueDeclarationCount() {
    return this.uniqueCount;
  }
}

test('hydration basic', t => {
  const elements = createFixtures([{
    css: '.c4:hover{display:none}.c0{color:red}.c1{color:green}',
  }, {
    media: '(max-width: 800px)',
    css: '.c3:hover{color:green}.c2{color:green}'
  }]);
  const instance = new StyletronTest(elements);
  t.deepEqual(instance.getCache(), fixtures.basic.cache, 'cache hydrated');
  t.equal(instance.getUniqueDeclarationCount(), 5, 'count correctly hyrdated');
  const newClass = instance.injectDeclaration({prop: 'color', val: 'purple', media: '(max-width: 800px)'});
  t.equal(newClass, 'c5', 'new class with correct count');
  t.end();
});

test('rule insertion order', t => {
  const element = createStyleElement('');
  const instance = new StyletronTest([element]);
  const decls = [
    {prop: 'color', val: 'red'},
    {prop: 'color', val: 'blue'},
    {prop: 'color', val: 'blue', media: '(max-width: 333px)'},
    {prop: 'color', val: 'green'},
    {prop: 'color', val: 'red', media: 'screen and (max-width: 400px)'},
    {prop: 'color', val: 'purple'}
  ];
  decls.forEach(decl => instance.injectDeclaration(decl));
  t.equal(element.sheet.rules.length, 4);
  const mainExpected = [
    '.c0 { color: red; }',
    '.c1 { color: blue; }',
    '.c3 { color: green; }',
    '.c5 { color: purple; }',
  ];
  const mediaExpected = {
    '(max-width: 333px)': [
      '.c2 { color: blue; }'
    ],
    'screen and (max-width: 400px)': [
      '.c4 { color: red; }'
    ]
  };
  forEach.call(element.sheet.rules, (rule, i) => {
    t.equal(rule.cssText, mainExpected[i]);
  });
  const mediaSheets = instance.getMediaSheets();
  t.deepEqual(Object.keys(mediaSheets), [
    '(max-width: 333px)',
    'screen and (max-width: 400px)'
  ]);
  Object.keys(mediaExpected).forEach(mediaKey => {
    forEach.call(mediaSheets[mediaKey].sheet.rules, (rule, i) => {
      t.equal(rule.cssText, mediaExpected[mediaKey][i], 'media decl matches');
    });
  });
  t.end();
});

function createFixtures(sheets) {
  return sheets.map(sheet => createStyleElement(sheet.css, sheet.media));
}

function createStyleElement(css, media) {
  const element = document.createElement('style');
  element.appendChild(document.createTextNode(css));
  if (media) {
    element.setAttribute('media', media);
  }
  document.body.appendChild(element);
  return element;
}
