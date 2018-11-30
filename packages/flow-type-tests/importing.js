// @flow

import * as React from "react";
import {Foo, Bar, Baz, Qux} from "./exporting.js";

// $FlowFixMe
<Foo />; // Missing foo

// $FlowFixMe
<Foo foo="notfoo" />; // Wrong foo

<Foo foo="foo" />;

// $FlowFixMe
<Bar bar="bar" />; // Missing foo
// $FlowFixMe
<Bar foo="notfoo" bar="bar" />; // Wrong foo
// $FlowFixMe
<Bar foo="foo" />; // Missing bar
// $FlowFixMe
<Bar foo="foo" bar="notbar" />; // Wrong bar

<Bar foo="foo" bar="bar" />;

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
