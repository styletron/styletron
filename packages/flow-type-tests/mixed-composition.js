// @flow

import * as React from "react";
import {styled, withStyle, withStyleDeep} from "styletron-react";

// Note: explicit generic annotation is here because this is not inferred correctly
const Foo = styled<{foo: "foo"}>("div", (_props: {foo: "foo"}) => ({
  color: "red",
}));

// $FlowFixMe
<Foo />; // Missing foo

// $FlowFixMe
<Foo foo="notfoo" />; // Wrong foo

<Foo foo="foo" />;

const Bar = withStyle(Foo, (_props: {bar: "bar"}) => ({color: "red"}));

// $FlowFixMe
<Bar bar="bar" />; // Missing foo
// $FlowFixMe
<Bar foo="notfoo" bar="bar" />; // Wrong foo
// $FlowFixMe
<Bar foo="foo" />; // Missing bar
// $FlowFixMe
<Bar foo="foo" bar="notbar" />; // Wrong bar

<Bar foo="foo" bar="bar" />;

const Baz = withStyleDeep(Bar, (_props: {baz: "baz"}) => ({color: "red"}));

// $FlowFixMe
<Baz bar="bar" baz="baz" />; // Missing foo
// $FlowFixMe
<Baz foo="notfoo" bar="bar" baz="baz" />; // Wrong foo
// $FlowFixMe
<Baz foo="foo" baz="baz" />; // Missing bar
// $FlowFixMe
<Baz foo="foo" bar="notbar" baz="baz" />; // Wrong bar
// $FlowFixMe
<Baz foo="foo" bar="bar" />; // Missing baz
// $FlowFixMe
<Baz foo="foo" bar="bar" baz="notbaz" />; // Wrong baz

<Baz foo="foo" bar="bar" baz="baz" />;

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

const Blah1 = withStyle(Qux, {color: "red"});
const Blah2 = withStyle(Qux, {color: "red"});

// $FlowFixMe
<Blah1 bar="bar" baz="baz" qux="qux" />; // Missing foo
// $FlowFixMe
<Blah1 foo="notfoo" bar="bar" baz="baz" qux="qux" />; // Wrong foo
// $FlowFixMe
<Blah1 foo="foo" baz="baz" qux="qux" />; // Missing bar
// $FlowFixMe
<Blah1 foo="foo" bar="notbar" baz="baz" qux="qux" />; // Wrong bar
// $FlowFixMe
<Blah1 foo="foo" bar="bar" qux="qux" />; // Missing baz
// $FlowFixMe
<Blah1 foo="foo" bar="bar" baz="notbaz" qux="qux" />; // Wrong baz
// $FlowFixMe
<Blah1 foo="foo" bar="bar" baz="baz" />; // Missing qux
// $FlowFixMe
<Blah1 foo="foo" bar="bar" baz="baz" qux="notqux" />; // Wrong qux

<Blah1 foo="foo" bar="bar" baz="baz" qux="qux" />;

// $FlowFixMe
<Blah2 bar="bar" baz="baz" qux="qux" />; // Missing foo
// $FlowFixMe
<Blah2 foo="notfoo" bar="bar" baz="baz" qux="qux" />; // Wrong foo
// $FlowFixMe
<Blah2 foo="foo" baz="baz" qux="qux" />; // Missing bar
// $FlowFixMe
<Blah2 foo="foo" bar="notbar" baz="baz" qux="qux" />; // Wrong bar
// $FlowFixMe
<Blah2 foo="foo" bar="bar" qux="qux" />; // Missing baz
// $FlowFixMe
<Blah2 foo="foo" bar="bar" baz="notbaz" qux="qux" />; // Wrong baz
// $FlowFixMe
<Blah2 foo="foo" bar="bar" baz="baz" />; // Missing qux
// $FlowFixMe
<Blah2 foo="foo" bar="bar" baz="baz" qux="notqux" />; // Wrong qux

<Blah2 foo="foo" bar="bar" baz="baz" qux="qux" />;
