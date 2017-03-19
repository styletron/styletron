const create = require('jss').create;
const SheetsRegistry = require('jss').SheetsRegistry;

const camelCase = require('jss-camel-case').default;

module.exports = (invertedSheet, synthetic) => {
  const keys = Object.keys(invertedSheet);
  const len = keys.length;
  const jssInstance = create();
  jssInstance.use(camelCase());
  const sheets = new SheetsRegistry();
  const jssSheet = jssInstance.createStyleSheet(invertedSheet);
  const first = jssSheet.classes[keys[0]];
  const middle = jssSheet.classes['c1000'];
  const last = jssSheet.classes[keys[len - 1]];
  sheets.add(jssSheet);
  jssSheet.attach();
  const jsscss = sheets.toString();

  const styleElement = synthetic
    ? ''
    : `<style id="server-side-styles">${jsscss}</style>`;

  return (
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
${styleElement}
</head>
<body>
<div>foo</div>
<div class="${first}">bar</div>
<div class="${middle}">qux</div>
<div class="${last}">baz</div>
<script src="jss-bundle.js"></script>
</body>
</html>`);
}
