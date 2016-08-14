const React = require('react');
const utils = require('styletron-utils');

module.exports = connectToStyles;

function connectToStyles(styleFn) {
  return function hoc(Component) {
    class Connected extends React.Component {
      render() {
        const styles = styleFn(this.props);
        const classMap = Object.keys(styles).reduce((acc, key) => {
          acc[key] = utils.injectStyle(this.context.styletron, styles[key])
          return acc;
        }, {});
        return React.createElement(Component, Object.assign({
          styles: classMap,
          ref: c => {this.connectedElement = c}
        }, this.props));
      }
    }
    Connected.contextTypes = {styletron: React.PropTypes.object.isRequired};
    Connected.displayName = `connectToStyles(${getDisplayName(Component)})`;
    if (Component.defaultProps) {
      Connected.defaultProps = Component.defaultProps;
    } else if (typeof Component.getDefaultProps === 'function') {
      Connected.defaultProps = Component.getDefaultProps();
    }
    return Connected;
  };
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
