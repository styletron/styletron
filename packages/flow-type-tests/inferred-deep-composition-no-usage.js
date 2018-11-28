// @flow

import * as React from "react";
import {styled, withStyle} from "styletron-react";

// Note: explicit generic annotation is here because this is not inferred correctly
const Foo = styled<{foo: "foo"}>("div", (_props: {foo: "foo"}) => ({
  color: "red",
}));
const Bar = withStyle(Foo, (_props: {bar: "bar"}) => ({color: "red"}));
const Baz = withStyle(Bar, (_props: {baz: "baz"}) => ({color: "red"}));
const Qux = withStyle(Baz, (_props: {qux: "qux"}) => ({color: "red"}));

// $FlowFixMe
<Qux bar="bar" baz="baz" qux="qux" />; // Missing foo
// $FlowFixMe
<Qux foo="notfoo" bar="bar" baz="baz" qux="qux" />; // Wrong foo
// $FlowFixMe
<Qux foo="foo" baz="baz" qux="qux" />; // Missing bar
// $FlowFixMe
<Qux foo="foo" bar="notbar" baz="baz" qux="qux" />; // Wrong bar
// $FlowFixMe
<Qux foo="foo" bar="bar" qux="qux" />; // Missing baz
// $FlowFixMe
<Qux foo="foo" bar="bar" baz="notbaz" qux="qux" />; // Wrong baz
// $FlowFixMe
<Qux foo="foo" bar="bar" baz="baz" />; // Missing qux
// $FlowFixMe
<Qux foo="foo" bar="bar" baz="baz" qux="notqux" />; // Wrong qux

<Qux foo="foo" bar="bar" baz="baz" qux="qux" />;
