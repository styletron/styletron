// @flow

import * as React from "react";
import {createStyled} from "styletron-react";
import {driver, getInitialStyle} from "styletron-standard";

const styled = createStyled({
  driver,
  getInitialStyle,
  wrapper: StyledComponent => props =>
    (
      <div>
        <StyledComponent {...props} />
      </div>
    ),
});

const Foo = styled("div", (_props: {foo: "foo"}) => ({color: "red"}));

<Foo foo="foo" />;
