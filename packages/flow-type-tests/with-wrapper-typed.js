// @flow

import * as React from "react";
import {styled, withStyle, withWrapper} from "styletron-react";

const Foo = styled("div", (props: {foo: "foo"}) => ({
  color: props.foo,
}));
const Bar = withWrapper(
  Foo,
  StyledComponent => (props: {foo: "foo", bar: "bar"}) =>
    (
      <div>
        <StyledComponent {...props} />
      </div>
    ),
);

// $FlowFixMe
<Bar />; // missing foo and bar

// $FlowFixMe
<Bar foo="foo" />; // missing bar

// $FlowFixMe
<Bar bar="bar" />; // missing foo

<Bar foo="foo" bar="bar" />;

const Baz = withStyle(Bar, (props: {foo: "foo", bar: "bar", baz: "baz"}) => ({
  color: props.baz,
}));

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
