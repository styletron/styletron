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
      css: '@keyframes f{0%{border-bottom:1px;margin-left:0}100%{border-bottom:10px;margin-left:10px}}.f{animation-name:f}.e:hover{display:none}.a{color:red}.b{color:green}',
    },
    {
      media: '(max-width: 800px)',
      css: '.d:hover{color:green}.c{color:green}',
    },
  ]);
  const instance = new StyletronTest(elements);
  t.deepEqual(instance.getCache(), fixtures.basic.cache, 'cache hydrated');
  t.equal(instance.getUniqueDeclarationCount(), 6, 'count correctly hyrdated');
  const newClass = instance.injectDeclaration({
    prop: 'color',
    val: 'purple',
    media: '(max-width: 800px)',
  });
  t.equal(newClass, 'g', 'new class with correct count');
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
    {prop: 'color', val: 'purple'},
  ];
  decls.forEach(decl => instance.injectDeclaration(decl));
  t.equal(element.sheet.rules.length, 4);
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
  forEach.call(element.sheet.rules, (rule, i) => {
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
