const InfernoComponent = require('inferno-component');

/**
 * @class Provider
 * @packagename styletron-inferno
 * @description Provides a Styletron instance to descendant styled components via context
 *
 * @example
 * // Server
 * import StyletronServer from 'styletron-server';
 * import { renderToString } from 'inferno-server';
 * import { Provider } from 'styletron-inferno';
 * import App from '../shared/components/app';
 *
 * function render() {
 *   const styletron = new StyletronServer();
 *   const root = renderToString(
 *     <Provider styletron={styletron}>
 *       <App/>
 *     </Provider>
 *   );
 *   const stylesheets = styletron.getStylesheetsHtml('my-custom-class');
 *   return `
 *     <!DOCTYPE html>
 *     <html>
 *       <head>
 *         ${stylesheets}
 *       </head>
 *       <body>
 *         <div id="root">${root}</div>
 *       </body>
 *     </html>
 *   `;
 * }
 *
 * @example
 * // Client
 * import Inferno from 'inferno';
 * import StyletronClient from 'styletron-client';
 * import { Provider } from 'styletron-inferno';
 * import App from '../shared/components/app';
 *
 * function render() {
 *   const stylesheets = document.getElementsByClassName('my-custom-class');
 *   const styletron = new StyletronClient(stylesheets);
 *   Inferno.render((
 *     <Provider styletron={styletron}>
 *       <App/>
 *     </Provider>
 *   ), document.getElementsById('root'));
 * }
 *
 * @property {object} styletron Styletron instance
 * @property {InfernoElement} children Child nodes
 * @extends InfernoComponent
 */
class StyletronProvider extends InfernoComponent {
  getChildContext() {
    return {styletron: this.styletron};
  }
  constructor(props, context) {
    super(props, context);
    this.styletron = props.styletron;
  }
  render() {
    return this.props.children;
  }
}

module.exports = StyletronProvider;
