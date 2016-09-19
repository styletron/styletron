const InfernoComponent = require('inferno-component');

/**
 * @class StyletronProvider
 * @packagename styletron-inferno
 * @description Inferno component
 * @example
 * const Styletron = require('styletron');
 *
 * function render() {
 *   return InfernoServer.renderToString(
 *     <StyletronProvider styletron={new Styletron()}>
 *       <App/>
 *     </StyletronProvider>
 *   );
 * }
 * 
 * @property {object} styletron - Styletron instance
 * @property {InfernoElement} children - children
 * @extends InfernoComponent
 */
class StyletronProvider extends InfernoComponent {
  constructor(props, context) {
    super(props, context);
    this.styletron = props.styletron;
  }
  getChildContext() {
    return {styletron: this.styletron};
  }
  render() {
    return this.props.children;
  }
}

module.exports = StyletronProvider;
