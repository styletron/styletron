/* @flow */

import * as React from "react";
import PropTypes from "prop-types";

type providerPropsT = {|
  styletron: any,
  children: React.Element<any>
|};

class StyletronProvider extends React.Component<providerPropsT> {
  styletron: any;

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
  children: PropTypes.element.isRequired
};

StyletronProvider.childContextTypes = {
  styletron: PropTypes.object.isRequired
};

export default StyletronProvider;
