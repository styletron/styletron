const Styletron = require('../');
const getClassName = require('../class-name');
const test = require('tape');
const util = require('util');

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
  t.equal(instance.getCount(), 1, 'unique count not incremented after repeat injection');
  instance.injectDeclaration({prop: 'color', val: 'green'});
  t.equal(instance.getCache().color.green, 'b');
  instance.injectDeclaration({prop: 'color', val: 'green', media: '(max-width: 800px)'});
  t.equal(instance.getCache().media['(max-width: 800px)'].color.green, 'c');
  instance.injectDeclaration({prop: 'color', val: 'green', media: '(max-width: 800px)', pseudo: ':hover'});
  t.equal(instance.getCache().media['(max-width: 800px)'].pseudo[':hover'].color.green, 'd');
  instance.injectDeclaration({prop: 'display', val: 'none', pseudo: ':hover'});
  t.equal(instance.getCache().pseudo[':hover'].display.none, 'e');
  t.equal(instance.getCount(), 5, 'ends with 4 unique declarations');
  t.end();
});

test('className', t => {
  t.equal(getClassName(0), 'a');
  t.equal(getClassName(1), 'b');
  t.equal(getClassName(2), 'c');

  t.equal(getClassName(26), 'a0');
  t.equal(getClassName(27), 'a1');
  t.equal(getClassName(28), 'a2');
  t.equal(getClassName(36), 'aa');
  t.equal(getClassName(37), 'ab');
  t.equal(getClassName(60), 'ay');
  t.equal(getClassName(61), 'az');

  t.equal(getClassName(62), 'b0');
  t.equal(getClassName(63), 'b1');
  t.equal(getClassName(96), 'by');
  t.equal(getClassName(97), 'bz');

  const classNames = Array.from(Array(1000000), (a, i) => i).map(getClassName);
  const unique = new Set(classNames);
  t.equal(unique.size, 1000000);
  t.equal(classNames[classNames.length - 1], 'jklo1');

  t.end();
});
