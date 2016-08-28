const aphrodite = require('aphrodite');

module.exports = (sheet, synthetic) => {
  const keys = Object.keys(sheet);
  const len = keys.length;
  let first;
  let last;
  let {css} = aphrodite.StyleSheetServer.renderStatic(() => {
    let aphroditeStyles = aphrodite.StyleSheet.create(sheet);
    for (let i = 0; i < len; i++) {
      let className = aphrodite.css(aphroditeStyles[keys[i]]);
      if (i === 0) {
        first = className;
      } else if (i === len - 1) {
        last = className;
      }
    }
  });

  const styleElement = synthetic
    ? `<style data-aphrodite></style>`
    : `<style data-aphrodite>${css.content}</style>`;

  const hydrationSrc = synthetic
    ? ''
    : `<script>window.renderedClassNames = ${JSON.stringify(css.renderedClassNames)};</script>`;

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
${hydrationSrc}
<script src="aphrodite-bundle.js"></script>
</body>
</html>`);
}
