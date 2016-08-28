const StyletronServer = require('styletron-server');
const StyletronUtils = require('styletron-utils');

module.exports = (sheet, synthetic) => {
  const keys = Object.keys(sheet);
  const len = keys.length;
  let first;
  let last;
  const styletron = new StyletronServer();
  for (let i = 0; i < len; i++) {
    let className = StyletronUtils.injectStyle(styletron, sheet[keys[i]]);
    if (i === 0) {
      first = className;
    } else if (i === len - 1) {
      last = className;
    }
  }
  const css = styletron.getCss();
  const count = styletron.getInjectionCount();

  const styleElement = synthetic
    ? `<style id="styletron"></style>`
    : `<style id="styletron" data-count="${count}">${css}</style>`;

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
<script src="styletron-bundle.js"></script>
</body>
</html>`);
}
