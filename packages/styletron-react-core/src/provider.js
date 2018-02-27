// @flow

import * as React from "react";
import PropTypes from "prop-types";

type providerPropsT<Engine> = {|
  value: Engine,
  children: React.Node,
|};

class StyletronProvider<Engine> extends React.Component<
  providerPropsT<Engine>,
> {
  styletron: Engine;

  getChildContext() {
    return {styletron: this.styletron};
  }
  constructor(props: providerPropsT<Engine>) {
    super(props);
    this.styletron = props.value;
  }
  render() {
    return this.props.children;
  }
}

StyletronProvider.propTypes = {
  value: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

StyletronProvider.childContextTypes = {
  styletron: PropTypes.object.isRequired,
};

export default StyletronProvider;
