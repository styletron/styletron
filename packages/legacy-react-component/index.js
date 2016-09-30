var React = require('react');
var styletron = require('styletron');

function LegacyComponent(props) {
  styletron.injectOnce('.legacyStyle { color: magenta }', '__legacy_style__');
  return React.createElement('div',
    {className: 'legacyStyle'}, 'I am a legacy component');
}

module.exports = LegacyComponent;
