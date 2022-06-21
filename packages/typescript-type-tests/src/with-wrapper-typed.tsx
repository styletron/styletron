import * as React from "react";
import {styled, withStyle, withWrapper} from "styletron-react";

const Foo = styled("div", (props: {foo: "foo"}) => ({
  color: props.foo,
}));
const Bar = withWrapper(
  Foo,
  StyledComponent => (props: {foo: "foo"; bar: "bar"}) =>
    (
      <div>
        <StyledComponent {...props} />
      </div>
    ),
);

// @ts-expect-error
<Bar />; // missing foo and bar

// @ts-expect-error
<Bar foo="foo" />; // missing bar

// @ts-expect-error
<Bar bar="bar" />; // missing foo

<Bar foo="foo" bar="bar" />;

const Baz = withStyle(Bar, (props: {foo: "foo"; bar: "bar"; baz: "baz"}) => ({
  color: props.baz,
}));

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
