const jss = require('jss');
const camelCase = require('jss-camel-case').default;

module.exports = (invertedSheet, synthetic) => {
  const keys = Object.keys(invertedSheet);
  const len = keys.length;
  const jssInstance = jss.create();
  jssInstance.use(camelCase());
  const jssSheet = jssInstance.createStyleSheet(invertedSheet);
  const first = jssSheet.classes[keys[0]];
  const last = jssSheet.classes[keys[len - 1]];
  jssSheet.attach();
  const jsscss = jssInstance.sheets.toString();

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
<div class="${last}">baz</div>
<script src="jss-bundle.js"></script>
</body>
</html>`);
}
