// @flow strict

/* eslint-disable no-unused-vars */

import * as React from "react";

import {styled, withStyle} from "../src/index.js";

import type {coreStyleT, StandardEngine, nestedT} from "styletron-standard";
import type {styleArgT, baseT, styletronComponentT} from "styletron-react-core";

const Yo = styled("div", {color: "red"});
const Yo2 = styled("div", (props: {foo: boolean}) => ({
  color: "red"
}));
const Yo3 = styled("div", (props: {foo: boolean}) => ({
  color: "red"
}));

// $FlowFixMe
const Problem = styled("div", {color: 5});

<Yo $as="a" foo={23} />;
<Yo2 $as="a" foo={true} />;
<Yo3 $as="a" foo={true} />;

// $FlowFixMe
<Yo $as={4} />;

// $FlowFixMe
<Yo2 />;

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
