var React = require('react');
var styletronLegacy = require('styletron-legacy');
var StyletronClient = require('styletron-client');

function CompatComponent(props, context) {
  if (context.styletron) {
    var styleName = context.styletron.injectDeclaration({prop: 'color', val: 'red'});
    return React.createElement('div',
      {className: styleName}, 'I am a compat component');
  } else {
    styletronLegacy.injectOnce('.compatStyle { color: red }', '__compat_style__');
    return React.createElement('div',
      {className: 'compatStyle'}, 'I am a compat component');
  }
}

CompatComponent.contextTypes = {styletron: React.PropTypes.object};

module.exports = CompatComponent;
