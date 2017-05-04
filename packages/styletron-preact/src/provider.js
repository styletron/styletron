import Preact from 'preact';

/**
 * @class StyletronProvider
 * @packagename styletron-preact
 * @description Provides a Styletron instance to descendant styled components via context
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
 * @property {PreactElement} children - children
 * @extends PreactClass
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

export default StyletronProvider;
