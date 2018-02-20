// @flow

/* eslint-disable no-unused-vars */

import * as React from "react";

import {styled, withStyle} from "../src/index.js";

import type {s1, StandardEngine} from "styletron-standard";
import type {styleArgT, baseT, styletronComponentT} from "styletron-react-core";

const Yo = styled("div", {color: "red"});
<Yo $as="a" foo={23} />;

// $FlowFixMe
<Yo $as={4} />;

const Yo2 = styled("div", (props: {foo: boolean}) => ({
  color: "red"
}));
<Yo2 $as="a" foo={true} />;

// $FlowFixMe
<Yo2 foo="invalid" />;

const Yo3 = styled("div", (props: {foo: boolean}) => ({
  color: "red"
}));
<Yo3 $as="a" foo={true} />;

// $FlowFixMe
const Problem = styled("div", {color: 5});

// $FlowFixMe
<Yo2 foo={4} />;

const Yo4 = withStyle(Yo2, (props: {bar: number}) => ({
  color: "red"
}));
const Yo5 = withStyle(Yo2, (props: {baz: string}) => ({
  color: "red"
}));

<Yo4 $as="a" foo bar={24} />;
<Yo2 $as="a" foo />;
<Yo5 $as="a" baz="hello" foo />;

// $FlowFixMe
<Yo5 $as="a" baz={123} foo />;
