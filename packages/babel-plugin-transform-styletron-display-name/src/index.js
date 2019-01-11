/* global require module */

const types = require("@babel/core").types;

module.exports = function() {
  return {
    name: "transform-styletron-display-name",
    visitor: createNamedModuleVisitor(
      types,
      ["styled", "withStyle", "withStyleDeep"],
      ["styletron-react", "fusion-plugin-styletron-react", "baseui"],
      (t, state, refPaths) => {
        refPaths.forEach(path => {
          if (path.parentPath.type === "CallExpression") {
            if (path.parentPath.parentPath.type === "VariableDeclarator") {
              const name = path.parentPath.parentPath.node.id;

              path.parentPath.parentPath.parentPath.insertAfter(
                t.expressionStatement(
                  t.assignmentExpression(
                    "=",
                    t.memberExpression(name, t.identifier("displayName")),
                    t.stringLiteral(name.name),
                  ),
                ),
              );
            }
          }
        });
      },
    ),
  };
};

function createNamedModuleVisitor(t, moduleNames, packageNames, refsHandler) {
  return {
    // Handle ES imports
    // import {moduleName} from 'packageName';
    ImportDeclaration(path, state) {
      const sourceName = path.get("source").node.value;

      if (packageNames.indexOf(sourceName) === -1) {
        return;
      }

      state.importedPackageName = sourceName;
      path.get("specifiers").forEach(specifier => {
        const localPath = specifier.get("local");
        const localName = localPath.node.name;

        if (!localPath.scope.bindings[localName]) {
          return;
        }

        const refPaths = localPath.scope.bindings[localName].referencePaths;
        if (t.isImportSpecifier(specifier)) {
          // import {moduleName} from 'packageName';
          const specifierName = specifier.get("imported").node.name;
          if (moduleNames.includes(specifierName)) {
            refsHandler(t, state, refPaths, specifierName);
          } else if (t.isImportNamespaceSpecifier(specifier)) {
            // import * as pkg from 'packageName';
            // TODO(#5): Handle this case, or issue a warning because this may not be 100% robust
          }
        }
      });
    },
  };
}
