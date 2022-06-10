import * as React from "react";
import {styled} from "styletron-react";

const Button = styled("button", (_props: {foo: "foo"}) => ({color: "red"}));

const buttonRef = React.useRef<HTMLButtonElement>();

<Button
  ref={buttonRef}
  foo={"foo"}
  onClick={e => {
    const element: HTMLButtonElement = e.currentTarget;
  }}
/>;

const anchorRef = React.useRef<HTMLAnchorElement>();

<Button
  $as={"a"}
  foo={"foo"}
  href={"http://google.com"}
  onClick={e => {
    const anchorRef: HTMLAnchorElement = e.currentTarget;
  }}
/>;
