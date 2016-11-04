const glamor = require('glamor');
const glamorServer = require('glamor/server');

const style = glamor.style;

module.exports = (rules, synthetic) => {
  const len = rules.length;
  let first;
  let last;
  let middle;
  let {css, ids} = glamorServer.renderStatic(() => {
    for (let i = 0; i < len; i++) {
      let className = style(rules[i]).toString();
      if (i === 0) {
        first = className;
      }
      else if (i === 1000) {
        middle = className;
      }
      else if (i === len - 1) {
        last = className;
      }
    }
    return '<div></div>';
  });

  const styleElement = synthetic
    ? '<style></style>'
    : `<style>${css}</style>`

  const hydrationSrc = synthetic
    ? ''
    : `<script>window._glam = ${JSON.stringify(ids)}</script>`;

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
${hydrationSrc}
<script src="glamor-bundle.js"></script>
</body>
</html>`);
}
