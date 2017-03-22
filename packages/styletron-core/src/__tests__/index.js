import Styletron from '../index.js';
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
    'unique count not incremented after repeat injection'
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
    'd'
  );
  instance.injectDeclaration({
    prop: 'display',
    val: 'none',
    pseudo: ':hover',
  });
  t.equal(instance.getCache().pseudo[':hover'].display.none, 'e');

<<<<<<< HEAD:packages/styletron-core/src/__tests__/index.js
  const keyframes = {
    '0%': {
      borderBottom: '1px',
    },
    '100%': {
      borderBottom: '10px',
    },
  };
=======
  const keyframes = {'0%': {'borderBottom': '1px'}, '100%': {'borderBottom': '10px'}};
>>>>>>> brushed the code to silence the linter:packages/styletron-core/src/test/index.js
  instance.injectDeclaration({prop: 'animationName', val: keyframes});
  t.equal(instance.getCache().keyframes[JSON.stringify(keyframes)], 'f');
  t.equal(instance.getCache().animationName.f, 'f');

  t.equal(instance.getCount(), 6, 'ends with 6 unique declarations');
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
