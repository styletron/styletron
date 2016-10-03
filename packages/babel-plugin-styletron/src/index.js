module.exports = function ({types: t}) {
  return {
    visitor: {
      JSXAttribute(path) {
        if (path.node.name.name === 'style') {
          path.node.name.name = 'className';
          path.node.value = t.JSXExpressionContainer(
            t.CallExpression(
              t.MemberExpression(
                t.Identifier('Styletron'),
                t.Identifier('injectStyles')),
              [t.Identifier('styletron'), path.node.value.expression])
          );
        }
      }
    }
  };
}
