import Styletron from '../';
import test from 'tape';

class StyletronTest extends Styletron {
  constructor(...args) {
    super(...args);
  }

  getCache() {
    return this.cache;
  }

  getCount() {
    return this.uniqueCount;
  }
}

test('test injection', t => {
  const instance = new StyletronTest();
  t.equal(instance.getCount(), 0, 'starts with 0 declarations');
  const decl1 = {prop: 'color', val: 'red'};
  instance.injectDeclaration(decl1);
  t.equal(instance.getCache().color.red, 'a');
  t.equal(instance.getCachedDeclaration(decl1), 'a');
  t.equal(instance.getCount(), 1, 'unique count incremented');
  instance.injectDeclaration(decl1);
  t.equal(
    instance.getCount(),
    1,
    'unique count not incremented after repeat injection',
  );
  instance.injectDeclaration({prop: 'color', val: 'green'});
  t.equal(instance.getCache().color.green, 'b');
  instance.injectDeclaration({
    prop: 'color',
    val: 'green',
    media: '(max-width: 800px)',
  });
  t.equal(instance.getCache().media['(max-width: 800px)'].color.green, 'c');
  instance.injectDeclaration({
    prop: 'color',
    val: 'green',
    media: '(max-width: 800px)',
    pseudo: ':hover',
  });
  t.equal(
    instance.getCache().media['(max-width: 800px)'].pseudo[':hover'].color
      .green,
    'd',
  );
  instance.injectDeclaration({
    prop: 'display',
    val: 'none',
    pseudo: ':hover',
  });
  t.equal(instance.getCache().pseudo[':hover'].display.none, 'e');
  t.equal(instance.getCount(), 5, 'ends with 4 unique declarations');
  t.end();
});

test('test constructor', t => {
  const instance = new Styletron();
  t.equal(instance.prefix, false, 'prefix defaults to false');
  t.end();
});

test('test injection with prefix', t => {
  const instance = new StyletronTest({prefix: 'qq'});
  t.equal(instance.prefix, 'qq', 'prefix is set on instance');
  t.equal(instance.getCount(), 0, 'starts with 0 declarations');
  const decl1 = {prop: 'color', val: 'red'};
  instance.injectDeclaration(decl1);
  t.equal(instance.getCache().color.red, 'qqa');
  t.equal(instance.getCachedDeclaration(decl1), 'qqa');
  t.equal(instance.getCount(), 1, 'unique count incremented');
  t.end();
});
