import test from 'tape';
import fixtures from 'test-fixtures';
import cacheToCss from '../cache-to-css.js';
import Styletron from '../index.js';

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
      css: '@keyframes f{0%{border-bottom:1px;margin-left:0}100%{border-bottom:10px;margin-left:10px}}.e:hover{display:none}.a{color:red}.b{color:green}.f{animation-name:f}',
    },
    {
      media: '(max-width: 800px)',
      css: '.d:hover{color:green}.c{color:green}',
    },
  ]);
  t.end();
});

test('test getStylesheetsHtml method', t => {
  const instance = new StyletronTest();
  instance.setCache(fixtures.basic.cache);
  t.equal(
    instance.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_">@keyframes f{0%{border-bottom:1px;margin-left:0}100%{border-bottom:10px;margin-left:10px}}.e:hover{display:none}.a{color:red}.b{color:green}.f{animation-name:f}</style><style class="_styletron_hydrate_" media="(max-width: 800px)">.d:hover{color:green}.c{color:green}</style>'
  );
  t.end();
});

test('test getStylesheetsOldIE method', t => {
  const instance = new StyletronTest();
  for (let i = 0; i <= 4095; i++) {
    instance.injectDeclaration({prop: 'font-size', val: `${i}px`});
  }
  t.equal(instance.getStylesheetsOldIE().length, 1, 'only one sheet');
  instance.injectDeclaration({prop: 'color', val: 'red'});
  t.equal(
    instance.getStylesheetsOldIE().length,
    2,
    'rollover into another sheet'
  );
  for (let i = 0; i <= 4095; i++) {
    instance.injectDeclaration({
      prop: 'font-size',
      val: `${i}px`,
      media: '(max-width: 400px)',
    });
  }
  t.equal(instance.getStylesheetsOldIE().length, 3, 'media sheet');
  instance.injectDeclaration({
    prop: 'color',
    val: 'red',
    media: '(max-width: 400px)',
  });
  t.equal(instance.getStylesheetsOldIE().length, 4, 'media sheet rollover');
  t.end();
});
