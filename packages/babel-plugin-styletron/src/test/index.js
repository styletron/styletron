const fs = require('fs');
const path = require('path');
const test = require('tape');
const babel = require('babel-core');

const fixturesDir = path.resolve(__dirname, '../../fixtures');

const pluginPath = require.resolve('../');

test('no styletron binding', (t) => {
  var output = babel.transformFileSync(fixturesDir + '/basic.source', {
    plugins: ['syntax-jsx', pluginPath]
  });

  var expected = fs.readFileSync(fixturesDir + '/basic.expected', 'utf-8');

  t.equal(output.code.trim(), expected.trim(), 'output matches expected');
  t.end();
});

test('styletron in context', (t) => {
  var output = babel.transformFileSync(fixturesDir + '/context.source', {
    plugins: ['syntax-jsx', pluginPath]
  });

  var expected = fs.readFileSync(fixturesDir + '/context.expected', 'utf-8');

  t.equal(output.code.trim(), expected.trim(), 'output matches expected');
  t.end();
});
