const fs = require('fs');
const path = require('path');
const test = require('tape');
const babel = require('babel-core');

const fixturesDir = path.resolve(__dirname, '../../fixtures');

const pluginPath = require.resolve('../');

test('basic', (t) => {
  var output = babel.transformFileSync(fixturesDir + '/basic.source', {
    plugins: ['syntax-jsx', pluginPath]
  });

  var expected = fs.readFileSync(fixturesDir + '/basic.expected', 'utf-8');

  t.equal(output.code.trim(), expected.trim(), 'output matches expected');
  t.end();
});
