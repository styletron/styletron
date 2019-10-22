// @flow

import * as React from "react";
import {styled} from "styletron-react";

const Foo = styled("div", {
  // $FlowFixMe
  zIndex: null, // null is not a valid value
});

const Bar = styled("div", {
  // zIndex is an optional property, so undefined is allowed as a value by Flow
  // Using undefined as a value is also convenient when optionally setting a value
  zIndex: void 0,
});

<Foo />;
<Bar />;
