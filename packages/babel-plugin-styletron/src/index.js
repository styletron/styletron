module.exports = function ({types: t}) {
  return {
    visitor: {
      JSXElement: {
        enter(path) {
          path.node.openingElement.attributes.forEach(node => {
            if (node.name.name === 'style' && path.scope.hasBinding('styletron')) {
              node.name.name = 'className';
              node.value = t.JSXExpressionContainer(
                t.CallExpression(
                  t.MemberExpression(
                    t.Identifier('Styletron'),
                    t.Identifier('injectStyles')),
                  [t.Identifier('styletron'), node.value.expression])
              );
            }
          });
        }
      }
    }
  };
}
