import injectStyle from '../inject-style';
import injectStylePrefixed from '../inject-style-prefixed';
import test from 'tape';

test('test injection', t => {
  const decls = [];
  const spy = {
    injectRawDeclaration: decl => {
      decls.push(decl);
      return decls.length;
    },
  };
  const classString = injectStyle(spy, {
    color: 'red',
    backgroundColor: 'blue',
    '@media (max-width: 500px)': {
      color: 'purple',
    },
    ':hover': {
      background: 'orange',
    },
  });
  t.equal(classString, '1 2 3 4');
  t.deepEqual(decls, [
    {block: 'color:red', media: undefined, pseudo: undefined},
    {
      block: 'background-color:blue',
      media: undefined,
      pseudo: undefined,
    },
    {
      block: 'color:purple',
      media: '(max-width: 500px)',
      pseudo: undefined,
    },
    {block: 'background:orange', media: undefined, pseudo: ':hover'},
  ]);
  t.end();
});

test('test injection array', function(t) {
  const decls = [];
  const spy = {
    injectRawDeclaration: function(decl) {
      decls.push(decl);
      return decls.length;
    },
  };
  const classString = injectStyle(spy, {
    color: ['red', 'blue'],
    '@media (max-width: 500px)': {
      color: ['purple', 'orange'],
    },
    ':hover': {
      color: ['green', 'yellow'],
    },
  });
  t.equal(classString, '1 2 3');
  t.deepEqual(decls, [
    {block: 'color:red;color:blue', media: undefined, pseudo: undefined},
    {
      block: 'color:purple;color:orange',
      media: '(max-width: 500px)',
      pseudo: undefined,
    },
    {block: 'color:green;color:yellow', media: undefined, pseudo: ':hover'},
  ]);
  t.end();
});

test('test injection prefixed', function(t) {
  const decls = [];
  const spy = {
    injectRawDeclaration: function(decl) {
      decls.push(decl);
      return decls.length;
    },
  };
  const classString = injectStylePrefixed(spy, {
    width: 'calc(100%)',
    height: ['min-content', 'calc(50%)'],
    boxSizing: 'border-box',
  });
  t.equal(classString, '1 2 3');
  t.deepEqual(decls, [
    {
      block: 'width:calc(100%)',
      media: undefined,
      pseudo: undefined,
    },
    {
      block: 'height:-webkit-min-content;height:-moz-min-content;height:min-content;height:calc(50%)',
      media: undefined,
      pseudo: undefined,
    },
    {
      block: 'box-sizing:border-box',
      media: undefined,
      pseudo: undefined,
    },
  ]);
  t.end();
});
