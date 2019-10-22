// @flow

import * as React from "react";
import {styled} from "styletron-react";

const Foo = styled("div", {
  // $FlowFixMe
  zIndex: null, // null is not a valid value
});

const Bar = styled("div", {
  // $FlowFixMe
  zIndex: void 0, // undefined is not a valid value
});

<Foo />;
<Bar />;
