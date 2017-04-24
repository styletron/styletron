const React = require('react');
const PropTypes = require('prop-types');
const {injectStylePrefixed} = require('styletron-utils');

/**
 * @class StyletronProvider
 * @packagename styletron-react
 * @description Provides a Styletron instance to descendant styled components via context
 * @example
 * const Styletron = require('styletron');
 *
 * function render() {
 *   return React.renderToString(
 *     <StyletronProvider styletron={new Styletron()}>
 *       <App/>
 *     </StyletronProvider>
 *   );
 * }
 *
 * @property {object} styletron - Styletron instance
 * @property {ReactElement} children - children
 * @extends ReactClass
 */
class StyletronProvider extends React.Component {
  getChildContext() {
    return this.childContext;
  }
  constructor(props, context) {
    super(props, context);
    this.childContext = {
      styletron: props.styletron || context.styletron,
      injectStyle: props.injectStyle || context.injectStyle || injectStylePrefixed
    };
  }
  render() {
    return React.Children.only(this.props.children);
  }
}

StyletronProvider.PropTypes = {
  styletron: PropTypes.object,
  children: PropTypes.element
};

StyletronProvider.contextTypes = StyletronProvider.childContextTypes = {
  styletron: PropTypes.object,
  injectStyle: PropTypes.func
};

module.exports = StyletronProvider;
