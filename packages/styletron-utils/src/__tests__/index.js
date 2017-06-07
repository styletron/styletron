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
    display: 'flex',
    height: ['min-content', '100%'],
    transition: 'height 1s',
    ':hover': {
      backgroundColor: 'linear-gradient(to bottom, red, green)',
    },
    '@media (max-width: 500px)': {
      flexGrow: 1,
    },
  });
  t.equal(classString, '1 2 3 4 5');
  t.deepEqual(decls, [
    {
      block: 'display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex',
      media: undefined,
      pseudo: undefined,
    },
    {
      block: 'height:-webkit-min-content;height:-moz-min-content;height:min-content;height:100%',
      media: undefined,
      pseudo: undefined,
    },
    {
      block: 'transition:height 1s;-webkit-transition:height 1s;-moz-transition:height 1s',
      media: undefined,
      pseudo: undefined,
    },
    {
      block: 'background-color:-webkit-linear-gradient(to bottom, red, green);background-color:-moz-linear-gradient(to bottom, red, green);background-color:linear-gradient(to bottom, red, green)',
      media: undefined,
      pseudo: ':hover',
    },
    {
      block: 'flex-grow:1;-webkit-flex-grow:1',
      media: '(max-width: 500px)',
      pseudo: undefined,
    },
  ]);
  t.end();
});

test('test prefixed cache', function(t) {
  const decls = [];
  const spy = {
    injectRawDeclaration: function(decl) {
      decls.push(decl);
      return decls.length;
    },
  };
  const cache = {flexGrow: {1: 'color:red'}};
  injectStylePrefixed(
    spy,
    {
      display: 'flex',
      flexGrow: 1,
    },
    undefined,
    undefined,
    cache
  );
  t.deepEqual(cache, {
    display: {
      flex: 'display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex',
    },
    flexGrow: {1: 'color:red'},
  });
  t.deepEqual(decls, [
    {
      block: 'display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex',
      media: undefined,
      pseudo: undefined,
    },
    {block: 'color:red', media: undefined, pseudo: undefined},
  ]);
  t.end();
});
