// @flow

import * as React from "react";
import {styled, withStyle} from "styletron-react";

const Foo = styled("div", (_props: {foo: "foo"}) => ({color: "red"}));

<Foo foo="foo" />; // Foo usage is necessary for inference

const Bar = withStyle(Foo, (_props: {bar: "bar"}) => ({color: "red"}));

// $FlowFixMe
<Bar />; // Missing foo and bar
// $FlowFixMe
<Bar bar="bar" />; // Missing foo
// $FlowFixMe
<Bar foo="foo" />; // Missing bar
// $FlowFixMe
<Bar foo={12345} bar="bar" />; // Wrong foo. Note: inferred type is string instead of "foo" literal
// $FlowFixMe
<Bar foo="a string" bar="notbar" />; // Wrong bar

<Bar foo="foo" bar="bar" />;
