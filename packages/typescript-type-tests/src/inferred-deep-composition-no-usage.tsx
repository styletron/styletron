import * as React from "react";
import {styled, withStyle} from "styletron-react";

// Note: explicit generic annotation is here because this is not inferred correctly
const Foo = styled<
  "div",
  {
    foo: "foo";
  }
>("div", (_props: {foo: "foo"}) => ({
  color: "red",
}));
const Bar = withStyle(Foo, (_props: {bar: "bar"}) => ({color: "red"}));
const Baz = withStyle(Bar, (_props: {baz: "baz"}) => ({color: "red"}));
const Qux = withStyle(Baz, (_props: {qux: "qux"}) => ({color: "red"}));

// @ts-expect-error
<Qux bar="bar" baz="baz" qux="qux" />; // Missing foo
// @ts-expect-error
<Qux foo="notfoo" bar="bar" baz="baz" qux="qux" />; // Wrong foo
// @ts-expect-error
<Qux foo="foo" baz="baz" qux="qux" />; // Missing bar
// @ts-expect-error
<Qux foo="foo" bar="notbar" baz="baz" qux="qux" />; // Wrong bar
// @ts-expect-error
<Qux foo="foo" bar="bar" qux="qux" />; // Missing baz
// @ts-expect-error
<Qux foo="foo" bar="bar" baz="notbaz" qux="qux" />; // Wrong baz
// @ts-expect-error
<Qux foo="foo" bar="bar" baz="baz" />; // Missing qux
// @ts-expect-error
<Qux foo="foo" bar="bar" baz="baz" qux="notqux" />; // Wrong qux

<Qux foo="foo" bar="bar" baz="baz" qux="qux" />;
