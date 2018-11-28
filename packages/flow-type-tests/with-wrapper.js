// @flow

import * as React from "react";
import {styled, withWrapper} from "styletron-react";

const Foo = styled("div", {color: "red"});
const Bar = withWrapper(Foo, StyledComponent => props => (
  <div>
    <StyledComponent {...props} />
  </div>
));

<Bar />;
