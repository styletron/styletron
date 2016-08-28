const fs = require('fs')
const postcss = require('postcss');
const camelcase = require('camelcase-css');
const safeParser = require('postcss-safe-parser');

module.exports = function cssToJs(src) {
  const root = postcss().process(src, {parser: safeParser}).root;

  // normal media nesting (aphrodite, styletron, radium, etc)
  const result = {};
  // inverted media nesting (jss)
  const inverted = {};

  let count = 0;
  root.each(function(node) {
    if (node.type === 'atrule' && node.name === 'media') {
      // TODO: handle nested media queries
      const media = '@media ' + node.params;
      node.walkRules(function(rule) {
        let ruleResult = {};
        inverted[media] = inverted[media] || {};
        rule.walkDecls(function(decl) {
          // TODO: handle duplicate properties
          ruleResult[camelcase(decl.prop)] = decl.value;
        });
        const key = getKey(count);
        result[key] = {[media]: ruleResult};
        inverted[media][key] = ruleResult;
        count++;
      });
    } else if (node.type ==='rule') {
      let ruleResult = {};
      node.walkDecls(function(decl) {
        // TODO: handle duplicate properties
        ruleResult[camelcase(decl.prop)] = decl.value;
      });
      const key = getKey(count);
      result[key] = ruleResult;
      inverted[key] = ruleResult;
      count++;
    }
  });

  return {result, inverted};
}

function getKey(count) {
  return 'c' + count;
}
