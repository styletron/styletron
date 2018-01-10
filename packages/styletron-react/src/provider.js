/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

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

import type StyletronCore from 'styletron-core';

type providerPropsT = {|
  styletron: StyletronCore,
  children: React.Element<any>,
|};

class StyletronProvider extends React.Component<providerPropsT> {
  styletron: StyletronCore;

  getChildContext() {
    return {styletron: this.styletron};
  }
  constructor(props: providerPropsT) {
    super(props);
    this.styletron = props.styletron;
  }
  render() {
    return React.Children.only(this.props.children);
  }
}

StyletronProvider.propTypes = {
  styletron: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

StyletronProvider.childContextTypes = {
  styletron: PropTypes.object.isRequired,
};

export default StyletronProvider;
