// @flow

/* eslint-disable no-unused-vars */

import * as React from "react";

import {customStyled} from "./custom-styled.js";
import {withStyle} from "../src/index.js";

/**
 * Component composition example
 */

class Dummy extends React.Component<{title: string, className: string}> {
  render() {
    <div className={this.props.className}>
      <h1>{this.props.title}</h1>
    </div>;
  }
}

const AnotherComponent = customStyled(Dummy, (props: {$num: number}) => ({
  velocity: props.$num,
}));

export {AnotherComponent};

const Styled1 = customStyled(Dummy, (props: {$num: number}) => ({
  velocity: props.$num,
}));

// $FlowFixMe
<Styled1 />;

// $FlowFixMe
<Styled1 title="fails" />; // should fail

// $FlowFixMe
<Styled1 title={2323} $num={100} />; // should fail (title wrong type)

// $FlowFixMe
<Styled1 $num={100} />; // should fail (missing title)

<Styled1 title="works" $num={100} />;

const Styled2 = withStyle(Styled1, (props: {$size: number}) => ({
  angle: props.$size,
}));

// $FlowFixMe
<Styled2 title="fails" $num={100} />; // should fail (no $size)

// $FlowFixMe
<Styled2 title="fails" $size={100} />; // should fail (no $num)

// $FlowFixMe
<Styled2 $num={100} $size={100} />; // should fail (no title)

<Styled2 title="works" $num={100} $size={100} />;
