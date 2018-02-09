// @flow strict

/* eslint-disable no-unused-vars */

import * as React from "react";

import {withStyle, createStyled} from "../src/index.js";

import type {
  styleArgT,
  baseT,
  styletronComponentT,
  styledFnT
} from "../src/index.js";

type customStyleT = $Shape<{
  angle?: number,
  velocity?: number
}>;

interface CustomEngine {}

const customDriver = (style: customStyleT, styletron: CustomEngine) => "test";
const customGetInitialStyle = () => ({}: customStyleT);

const customStyled: styledFnT<customStyleT, CustomEngine> = createStyled({
  getInitialStyle: customGetInitialStyle,
  driver: customDriver,
  wrapper: Component => props => (
    <div>
      <Component {...props} />
    </div>
  )
});

// $FlowFixMe
const problemStyled: styledFnT<customStyleT, CustomEngine> = createStyled({
  getInitialStyle: customGetInitialStyle,
  driver: customDriver,
  wrapper: Component => props => invalid => invalid
});

const Custom1 = customStyled("div", {velocity: 0});
const Custom2 = customStyled("div", (props: {foo?: boolean}) => ({
  angle: 23
}));

<Custom2 foo={true} />;

const Custom3 = withStyle(Custom2, (props: {bar?: number}) => ({
  angle: 23
}));

<Custom3 />;
