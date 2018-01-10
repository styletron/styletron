/* @flow */
/* eslint-env browser */

import Styletron from '../index.js';
import test from 'tape';
const forEach = Array.prototype.forEach;

import fixtures from 'test-fixtures';

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
  const elements = createFixtures([
    {
      css: '.e:hover{display:none}.a{color:red}.b{color:green}',
    },
    {
      media: '(max-width: 800px)',
      css: '.d:hover{color:green}.c{color:green}',
    },
  ]);
  const instance = new StyletronTest(elements);
  t.deepEqual(instance.getCache(), fixtures.basic.cache, 'cache hydrated');
  t.equal(instance.getUniqueDeclarationCount(), 5, 'count correctly hyrdated');
  const newClass = instance.injectRawDeclaration({
    block: 'color:purple',
    media: '(max-width: 800px)',
  });
  t.equal(newClass, 'f', 'new class with correct count');
  t.end();
});

test('rule insertion order', t => {
  const element = createStyleElement('');
  const instance = new StyletronTest([element]);
  const decls = [
    {block: 'color:red'},
    {block: 'color:blue'},
    {block: 'color:blue', media: '(max-width: 333px)'},
    {block: 'color:green'},
    {block: 'color:red', media: 'screen and (max-width: 400px)'},
    {block: 'color:purple'},
  ];
  decls.forEach(decl => instance.injectRawDeclaration(decl));
  // Ugly casting workaround for https://github.com/facebook/flow/issues/2696
  const sheet: CSSStyleSheet = ((element.sheet: any): CSSStyleSheet);
  t.equal(sheet.cssRules.length, 4);
  const mainExpected = [
    '.a { color: red; }',
    '.b { color: blue; }',
    '.d { color: green; }',
    '.f { color: purple; }',
  ];
  const mediaExpected = {
    '(max-width: 333px)': ['.c { color: blue; }'],
    'screen and (max-width: 400px)': ['.e { color: red; }'],
  };
  forEach.call(sheet.cssRules, (rule, i) => {
    t.equal(rule.cssText, mainExpected[i]);
  });
  const mediaSheets = instance.getMediaSheets();
  t.deepEqual(Object.keys(mediaSheets), [
    '(max-width: 333px)',
    'screen and (max-width: 400px)',
  ]);
  Object.keys(mediaExpected).forEach(mediaKey => {
    forEach.call(mediaSheets[mediaKey].sheet.rules, (rule, i) => {
      t.equal(rule.cssText, mediaExpected[mediaKey][i], 'media decl matches');
    });
  });
  Object.keys(mediaSheets).forEach(mediaKey => {
    const mediaSheet = mediaSheets[mediaKey];
    t.equal(mediaSheet.media, mediaKey, 'media attribute matches');
  });
  t.end();
});

test('with zero length stylesheets', t => {
  const instance = new StyletronTest([]);
  t.equal(instance.mainSheet instanceof HTMLStyleElement, true);
  t.end();
});

function createFixtures(sheets) {
  return sheets.map(sheet =>
    createStyleElement(sheet.css, sheet.media || void 0)
  );
}

function createStyleElement(css, media) {
  const element = document.createElement('style');
  element.appendChild(document.createTextNode(css));
  if (media) {
    element.setAttribute('media', media);
  }
  if (document.body === null) {
    throw new Error('`document.body` cannot be null');
  }
  document.body.appendChild(element);
  return element;
}
