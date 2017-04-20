const Preact = require('preact');

/**
 * @class StyletronProvider
 * @packagename styletron-preact
 * @description React component
 * @example
 * const Styletron = require('styletron');
 * const renderToString = require('preact-render-to-string');
 *
 * function render() {
 *   return renderToString(
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
class StyletronProvider extends Preact.Component {
  getChildContext() {
    return {styletron: this.styletron};
  }
  constructor(props, context) {
    super(props, context);
    this.styletron = props.styletron;
  }
  render() {
    return this.props.children[0];
  }
}

module.exports = StyletronProvider;
