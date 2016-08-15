const React = require('react');

/**
 * @class StyletronProvider
 * @description React component
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
    return {styletron: this.styletron};
  }
  constructor(props, context) {
    super(props, context);
    this.styletron = props.styletron;
  }
  render() {
    return React.Children.only(this.props.children);
  }
}

StyletronProvider.PropTypes = {
  styletron: React.PropTypes.object.isRequired,
  children: React.PropTypes.element.isRequired
};

StyletronProvider.childContextTypes = {
  styletron: React.PropTypes.object.isRequired
};

module.exports = StyletronProvider;
