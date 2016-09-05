const injectStyle = require('../inject-style');
const injectStylePrefixed = require('../inject-style-prefixed');
const test = require('tape');
const util = require('util');

test('test injection', t => {
  const decls = [];
  const spy = {
    injectDeclaration: (decl) => {
      decls.push(decl);
      return decls.length;
    }
  };
  const classString = injectStyle(spy, {
    color: 'red',
    backgroundColor: 'blue',
    '@media (max-width: 500px)': {
      color: 'purple'
    },
    ':hover': {
      background: 'orange'
    }
  });
  t.equal(classString, ' 1 2 3 4');
  t.deepEqual(decls, [
    {prop: 'color', val: 'red', media: undefined, pseudo: undefined},
    {prop: 'background-color', val: 'blue', media: undefined, pseudo: undefined},
    {prop: 'color', val: 'purple', media: '(max-width: 500px)', pseudo: undefined},
    {prop: 'background', val: 'orange', media: undefined, pseudo: ':hover'}
  ]);
  t.end();
});

test('test injection array', function (t) {
  const decls = [];
  const spy = {
    injectDeclaration: function (decl) {
      decls.push(decl);
      return decls.length;
    }
  };
  const classString = injectStyle(spy, {
    color: ['red', 'blue'],
    '@media (max-width: 500px)': {
      color: ['purple', 'orange'],
    },
    ':hover': {
      color: ['green', 'yellow']
    }
  });
  t.equal(classString, ' 1 2 3 4 5 6');
  t.deepEqual(decls, [
    {prop: 'color', val: 'red', media: undefined, pseudo: undefined},
    {prop: 'color', val: 'blue', media: undefined, pseudo: undefined},
    {prop: 'color', val: 'purple', media: '(max-width: 500px)', pseudo: undefined},
    {prop: 'color', val: 'orange', media: '(max-width: 500px)', pseudo: undefined},
    {prop: 'color', val: 'green', media: undefined, pseudo: ':hover'},
    {prop: 'color', val: 'yellow', media: undefined, pseudo: ':hover'}
  ]);
  t.end();
});

test('test injection prefixed', function (t) {
  const decls = [];
  const spy = {
    injectDeclaration: function (decl) {
      decls.push(decl);
      return decls.length;
    }
  };
  const classString = injectStylePrefixed(spy, {
    boxSizing: 'border-box'
  });
  t.equal(classString, ' 1 2');
  t.deepEqual(decls, [
    {prop: 'box-sizing', val: 'border-box', media: undefined, pseudo: undefined},
    {prop: '-moz-box-sizing', val: 'border-box', media: undefined, pseudo: undefined}
  ]);
  t.end();
});
