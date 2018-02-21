// @flow

import type {StandardEngine, declarativeStyleT} from "styletron-standard";
import {driver, getInitialStyle} from "styletron-standard";

import type {styledFnT} from "styletron-react-core";
import {createStyled, Provider} from "styletron-react-core";

export {Provider};

const styled: styledFnT<declarativeStyleT, StandardEngine> = createStyled({
  wrapper: Component => Component,
  getInitialStyle,
  driver
});

export {styled};

export {
  withStyle,
  withStyleDeep,
  withTransform,
  withWrapper
} from "styletron-react-core";
