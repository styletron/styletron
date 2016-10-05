const Styletron = require('../');
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
  t.equal(instance.getCache().color.red, 'c0');
  t.equal(instance.getCachedDeclaration(decl1), 'c0');
  t.equal(instance.getCount(), 1, 'unique count incremented');
  instance.injectDeclaration(decl1);
  t.equal(instance.getCount(), 1, 'unique count not incremented after repeat injection');
  instance.injectDeclaration({prop: 'color', val: 'green'});
  t.equal(instance.getCache().color.green, 'c1');
  instance.injectDeclaration({prop: 'color', val: 'green', media: '(max-width: 800px)'});
  t.equal(instance.getCache().media['(max-width: 800px)'].color.green, 'c2');
  instance.injectDeclaration({prop: 'color', val: 'green', media: '(max-width: 800px)', pseudo: ':hover'});
  t.equal(instance.getCache().media['(max-width: 800px)'].pseudo[':hover'].color.green, 'c3');
  instance.injectDeclaration({prop: 'display', val: 'none', pseudo: ':hover'});
  t.equal(instance.getCache().pseudo[':hover'].display.none, 'c4');
  t.equal(instance.getCount(), 5, 'ends with 4 unique declarations');
  t.end();
});
