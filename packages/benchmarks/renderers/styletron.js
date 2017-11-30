const StyletronServer = require('styletron-server');
const StyletronUtils = require('styletron-utils');

module.exports = (rules, synthetic) => {
  const len = rules.length;
  let first;
  let last;
  let middle;
  const styletron = new StyletronServer();
  for (let i = 0; i < len; i++) {
    let className = StyletronUtils.injectStyle(styletron, rules[i]);
    if (i === 0) {
      first = className;
    } else if (i === 1000) {
      middle = className;
    } else if (i === len - 1) {
      last = className;
    }
  }

  const styleElement = synthetic
    ? `<style class="styletron"></style>`
    : styletron.getStylesheetsHtml();

  return `<!DOCTYPE html>
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
<script src="styletron-bundle.js"></script>
</body>
</html>`;
};
