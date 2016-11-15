const Styletron = require('../styletron-client-old-ie');
const test = require('tape');
const forEach = Array.prototype.forEach;

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
    css: '.s4:hover{display:none}.s0{color:red}.s1{color:green}',
  }, {
    media: '(max-width: 800px)',
    css: '.s3:hover{color:green}.s2{color:green}'
  }]);
  const instance = new StyletronTest(elements);
  t.deepEqual(instance.getCache(), require('test-fixtures/basic'), 'cache hydrated');
  t.equal(instance.getUniqueDeclarationCount(), 5, 'count correctly hyrdated');
  const newClass = instance.injectDeclaration({prop: 'color', val: 'purple', media: '(max-width: 800px)'});
  t.equal(newClass, 's5', 'new class with correct count');
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
    '.s0 { color: red; }',
    '.s1 { color: blue; }',
    '.s3 { color: green; }',
    '.s5 { color: purple; }',
  ];
  const mediaExpected = {
    '(max-width: 333px)': [
      '.s2 { color: blue; }'
    ],
    'screen and (max-width: 400px)': [
      '.s4 { color: red; }'
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
