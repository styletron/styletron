// @flow

import * as React from "react";
import {styled} from "styletron-react";

const Foo = styled("div", (_props: {foo: "foo"}) => ({
  color: "red",
}));

// TODO: this should cause a flow error
const Bar = styled(Foo, (_props: {bar: "bar"}) => ({
  color: "red",
}));

<Bar foo="foo" bar="bar" />;
