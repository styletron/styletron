// @flow

/* eslint-disable no-unused-vars */

import * as React from "react";

import {withStyle, createStyled} from "../src/index.js";

import type {styleArgT, styletronComponentT, styledFnT} from "../src/index.js";

type nestT<Style> = {
  ...Style,
  [string]: Style,
};

type customStyleT = $Shape<
  nestT<
    $Shape<{
      angle?: number,
      velocity?: number,
    }>,
  >,
>;

interface CustomEngine {
  someMethod: customStyleT => string;
}

const customDriver = (style: customStyleT, engine: CustomEngine) =>
  engine.someMethod(style);
const customGetInitialStyle = () => ({}: customStyleT);

const customStyled: styledFnT<customStyleT, CustomEngine> = createStyled({
  getInitialStyle: customGetInitialStyle,
  driver: customDriver,
  wrapper: Component => props => (
    <div>
      <Component {...props} />
    </div>
  ),
});

// $FlowFixMe
const shouldError: styledFnT<customStyleT, CustomEngine> = createStyled({
  getInitialStyle: customGetInitialStyle,
  driver: customDriver,
  wrapper: Component => props => invalid => invalid,
});

// $FlowFixMe
const ShouldError = customStyled("div", {invalid: 0});

const Custom1 = customStyled("div", {velocity: 0});
const Custom2 = customStyled("div", (props: {$foo?: boolean}) => ({
  angle: 23,
}));

const SomeComponent = withStyle(Custom2, (props: {$bar: number}) => ({
  angle: 23,
}));

export {SomeComponent};

<Custom2 $foo={true} />;

// $FlowFixMe
<Custom2 $foo="invalid" />;

const Custom3 = withStyle(Custom2, (props: {$bar: number}) => ({
  angle: 23,
}));

// $FlowFixMe
<Custom3 />;

// $FlowFixMe
<Custom3 $bar="invalid" />;

// $FlowFixMe
<Custom3 $bar={0} $foo="invalid" />;

<Custom3 $bar={0} $foo />;

export {customStyled};
