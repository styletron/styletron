import * as React from "react";
import {styled, withStyle} from "styletron-react";

const Foo = styled("div", (_props: {foo: "foo"}) => ({color: "red"}));

<Foo foo="foo" />; // Foo usage is necessary for inference

const Bar = withStyle(Foo, (_props: {bar: "bar"}) => ({color: "red"}));

// @ts-expect-error
<Bar />; // Missing foo and bar
// @ts-expect-error
<Bar bar="bar" />; // Missing foo
// @ts-expect-error
<Bar foo="foo" />; // Missing bar
// @ts-expect-error
<Bar foo={12345} bar="bar" />; // Wrong foo. Note: inferred type is string instead of "foo" literal
// @ts-expect-error
<Bar foo="a string" bar="notbar" />; // Wrong bar

<Bar foo="foo" bar="bar" />;
