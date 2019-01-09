/* global require module */

const t = require("@babel/core").types;

// Referenced: https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-display-name

function addDisplayName(name, path) {
  path.insertAfter(
    t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(t.identifier(name), t.identifier("displayName")),
        t.stringLiteral(name),
      ),
    ),
  );
}

function isStyletronMethod(node) {
  if (!node || !t.isCallExpression(node)) return false;

  const methods = ["styled", "withStyle", "withStyleDeep"];
  return methods.includes(node.callee.name);
}

module.exports = function() {
  return {
    name: "transform-styletron-display-name",
    visitor: {
      CallExpression(path) {
        const {node} = path;
        if (!isStyletronMethod(node)) return;

        let id;
        path.find(function(p) {
          if (p.isAssignmentExpression()) {
            id = p.node.left;
          } else if (p.isVariableDeclarator()) {
            id = p.node.id;
          } else if (p.isStatement()) {
            // we've hit a statement, we should stop crawling up
            return true;
          }

          // we've got an id! no need to continue
          if (id) return true;
        });

        // foo.bar -> bar
        if (t.isMemberExpression(id)) {
          id = id.property;
        }

        // identifiers are the only thing we can reliably get a name from
        if (t.isIdentifier(id)) {
          addDisplayName(id.name, path.parentPath.parentPath);
        }
      },
    },
  };
};
