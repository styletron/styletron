import * as React from "react";
import {styled, withStyle} from "styletron-react";

class Foo extends React.Component<{
  foo: "foo";
}> {}

const Bar = styled(Foo, (_props: {bar: "bar"}) => ({
  color: "red",
}));

// @ts-expect-error
<Bar bar="bar" />; // Missing foo
// @ts-expect-error
<Bar foo="notfoo" bar="bar" />; // Wrong foo
// @ts-expect-error
<Bar foo="foo" />; // Missing bar
// @ts-expect-error
<Bar foo="foo" bar="notbar" />; // Wrong bar

<Bar foo="foo" bar="bar" />;

const Baz = withStyle(Bar, (_props: {baz: "baz"}) => ({color: "red"}));

// @ts-expect-error
<Baz bar="bar" baz="baz" />; // Missing foo
// @ts-expect-error
<Baz foo="notfoo" bar="bar" baz="baz" />; // Wrong foo
// @ts-expect-error
<Baz foo="foo" baz="baz" />; // Missing bar
// @ts-expect-error
<Baz foo="foo" bar="notbar" baz="baz" />; // Wrong bar
// @ts-expect-error
<Baz foo="foo" bar="bar" />; // Missing baz
// @ts-expect-error
<Baz foo="foo" bar="bar" baz="notbaz" />; // Wrong baz

<Baz foo="foo" bar="bar" baz="baz" />;

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
