// @flow

import * as React from "react";
import {styled, withStyle} from "styletron-react";

const Foo = styled("div", {
  color: "red",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "24px",
  "@media (min-width: 930px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  "@media (min-width: 1120px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
});

<Foo />; // Foo usage is necessary for inference

const Bar = withStyle(Foo, (_props: {bar: "bar"}) => ({color: "red"}));

// $FlowFixMe
<Bar />; // Missing bar

// $FlowFixMe
<Bar bar="notbar" />; // Wrong bar

<Bar bar="bar" />;
