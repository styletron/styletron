// @flow

import {createStyled} from "../../index.js";

import type {styledFnT} from "../../index.js";

// Some arbitrary style
type customStyleT = $Shape<{
  size: number,
  color: string,
  shape: "square" | "circle",
  velocity: {speed?: number, direction?: number},
}>;

interface CustomEngine {
  renderStyle: customStyleT => string;
}

const customDriver = (style: customStyleT, styletron: CustomEngine) =>
  styletron.renderStyle(style);
const customGetInitialStyle = () => ({}: customStyleT);

const customStyled: styledFnT<customStyleT, CustomEngine> = createStyled({
  getInitialStyle: customGetInitialStyle,
  driver: customDriver,
  wrapper: Component => Component,
});

export {customStyled as styled};
