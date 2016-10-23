const test = require('tape');
const fixtures = require('test-fixtures');

const cacheToCss = require('../cache-to-css');
const Styletron = require('../styletron-server');

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

test('test getCss method', t => {
  const instance = new StyletronTest();
  instance.setCache(fixtures.basic.cache);
  t.equal(instance.getCss(), fixtures.basic.css);
  t.end();
});

test('test getStylesheets method', t => {
  const instance = new StyletronTest();
  instance.setCache(fixtures.basic.cache);
  t.deepEqual(instance.getStylesheets(), [
    {
      css: '.c4:hover{display:none}.c0{color:red}.c1{color:green}'
    },
    {
      media: '(max-width: 800px)',
      css: '.c3:hover{color:green}.c2{color:green}'
    }
  ]);
  t.end();
});

test('test getStylesheetsHtml method', t => {
  const instance = new StyletronTest();
  instance.setCache(fixtures.basic.cache);
  t.equal(instance.getStylesheetsHtml(), '<style class="_styletron_hydrate_">.c4:hover{display:none}.c0{color:red}.c1{color:green}</style><style class="_styletron_hydrate_" media="(max-width: 800px)">.c3:hover{color:green}.c2{color:green}</style>');
  t.end();
});
