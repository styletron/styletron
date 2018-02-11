// @flow strict

/* eslint-disable no-unused-vars */

import * as React from "react";

import {styled} from "./custom-styled.js";
import {withStyle} from "../src/index.js";

/**
 * Component composition example
 */

const Styled1 = styled("div", (props: {$num: number}) => ({
  velocity: props.$num
}));

// $FlowFixMe
<Styled1 />; // should fail, missing $num

<Styled1 $num={100} />;

const Styled2 = withStyle(Styled1, (props: {$size: number}) => ({
  angle: props.$size
}));

// $FlowFixMe
<Styled2 $num={100} />; // should fail (no $size)

// $FlowFixMe
<Styled2 $size={100} />; // should fail (no $num)

<Styled2 $num={100} $size={100} whatever={true} />;

<Styled2 $num={100} $size={100} />;
