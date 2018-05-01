// @flow

declare var __DEV__: boolean;
declare var __BROWSER__: boolean;

import type {
  Ref,
  StatelessFunctionalComponent,
  ElementType,
  ElementConfig,
} from "react";
import {createElement} from "react";

import createReactContext, {type Context} from "create-react-context";

import {addDebugClass} from "./dev-tool.js";

const StyletronContext: Context<any> = createReactContext();

export const Provider = StyletronContext.Provider;

const Consumer = StyletronContext.Consumer;

export type styledElementProps<Base> = {
  $as?: Base,
  $ref?: Ref<*>,
};

export type reducerT<Style: Object, Props: Object = {}> = (
  style: Style,
  props: Props,
) => Style;

export type assignCommutativeReducerT<Style: Object> = reducerT<Style> & {
  style: Style,
  factory: Style => reducerT<Style>,
};

export type assignCommutativeReducerItemT<Style: Object> = {|
  assignCommutative: true,
  reducer: assignCommutativeReducerT<Style>,
|};

export type regularReducerItemT<Style: Object, Props: Object> = {|
  assignCommutative: false,
  reducer: reducerT<Style, Props>,
|};

export type reducerItemT<Style: Object, Props: Object> =
  | assignCommutativeReducerItemT<Style>
  | regularReducerItemT<Style, Props>;

export type driverT<Style: Object, Engine> = (
  style: Style,
  styletron: Engine,
) => string;

export type wrapperT = (
  StatelessFunctionalComponent<*>,
) => StatelessFunctionalComponent<*>;

/* eslint-disable no-unused-vars */
export type styletronT<Style: Object, Props: Object, Base, Engine> = {|
  // TODO: Variadic generics for multiple reducer prop types?
  // Look into $Compose?
  reducers: Array<reducerItemT<Style, *>>,
  base: ElementType,
  getInitialStyle: () => Style,
  driver: driverT<Style, Engine>,
  wrapper: any,
  debugClass?: string,
|};
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
export type styletronComponentT<
  Style: Object,
  Props: Object,
  Base,
  Engine,
> = StatelessFunctionalComponent<
  Props &
    styledElementProps<Base> &
    $Diff<ElementConfig<Base>, {className: any}>,
>;
/* eslint-enable no-unused-vars */

export type styledFnT<Style: Object, Engine> = <Props: Object, Base>(
  Base,
  styleArgT<Style, Props>,
) => styletronComponentT<Style, Props, Base, Engine>;

type styledConfig<Style: Object, Engine> = {
  getInitialStyle: void => Style,
  driver: driverT<Style, Engine>,
  wrapper: wrapperT,
};

export function createStyled<Style: Object, Engine>({
  getInitialStyle,
  driver,
  wrapper,
}: styledConfig<Style, Engine>): styledFnT<Style, Engine> {
  return function styled<Props: Object, Base>(
    base: Base,
    styleArg: styleArgT<Style, Props>,
  ): styletronComponentT<Style, Props, Base, Engine> {
    const baseStyletron: styletronT<Style, {}, Base, Engine> = {
      reducers: [],
      // TODO: use typed generic instead of coercion once
      // https://github.com/facebook/flow/issues/6157 is resolved
      base: ((base: any): ElementType),
      driver,
      getInitialStyle,
      wrapper,
    };
    if (__BROWSER__ && __DEV__) {
      addDebugClass(baseStyletron, 3);
    }
    return createStyledElementComponent(
      autoComposeShallow(baseStyletron, styleArg),
    );
  };
}

export function withTransform<
  Style: Object,
  Props: Object,
  Base,
  TransformerProps: Object,
  Engine,
>(
  component: styletronComponentT<Style, Props, Base, Engine>,
  transformer: (style: Style, props: TransformerProps) => Style,
): styletronComponentT<Style, Props & TransformerProps, Base, Engine> {
  const styletron = (component: any).__STYLETRON__;
  if (__BROWSER__ && __DEV__) {
    addDebugClass(styletron, 3);
  }

  return createStyledElementComponent(
    composeDynamic(styletron, {
      assignCommutative: false,
      reducer: transformer,
    }),
  );
}

type styleFnArgT<Style: Object, Props: Object> = (props: Props) => Style;

export type styleArgT<Style: Object, Props: Object> =
  | Style
  | styleFnArgT<Style, Props>;

export function withStyle<
  Style: Object,
  Props: Object,
  Base,
  ReducerProps: Object,
  Engine,
>(
  component: styletronComponentT<Style, Props, Base, Engine>,
  styleArg: styleArgT<Style, ReducerProps>,
): styletronComponentT<Style, Props & ReducerProps, Base, Engine> {
  const styletron = (component: any).__STYLETRON__;
  if (__BROWSER__ && __DEV__) {
    addDebugClass(styletron, 3);
  }
  return createStyledElementComponent(autoComposeShallow(styletron, styleArg));
}

export function withStyleDeep<
  Style: Object,
  Props: Object,
  Base,
  ReducerProps: Object,
  Engine,
>(
  component: styletronComponentT<Style, Props, Base, Engine>,
  styleArg: styleArgT<Style, ReducerProps>,
): styletronComponentT<Style, Props & ReducerProps, Base, Engine> {
  const styletron = (component: any).__STYLETRON__;
  if (__BROWSER__ && __DEV__) {
    addDebugClass(styletron, 3);
  }
  return createStyledElementComponent(autoComposeDeep(styletron, styleArg));
}

export function withWrapper<Style: Object, Props: Object, Base, Engine>(
  component: styletronComponentT<Style, Props, Base, Engine>,
  wrapper: any,
): styletronComponentT<Style, Props, Base, Engine> {
  const styletron = (component: any).__STYLETRON__;
  const composed = {
    getInitialStyle: styletron.getInitialStyle,
    base: styletron.base,
    driver: styletron.driver,
    wrapper: wrapper,
    reducers: styletron.reducers,
  };
  if (__BROWSER__ && __DEV__) {
    addDebugClass(composed, 3);
  }
  return createStyledElementComponent(composed);
}

export function autoComposeShallow<
  Style: Object,
  Props: Object,
  Base,
  ReducerProps: Object,
  Engine,
>(
  styletron: styletronT<Style, Props, Base, Engine>,
  styleArg: styleArgT<Style, ReducerProps>,
): styletronT<Style, Props & ReducerProps, Base, Engine> {
  if (typeof styleArg === "function") {
    return dynamicComposeShallow(styletron, styleArg);
  }
  // TODO: investigate how to eliminate this casting
  return (staticComposeShallow(styletron, styleArg): any);
}

export function autoComposeDeep<
  Style: Object,
  Props: Object,
  Base,
  ReducerProps: Object,
  Engine,
>(
  styletron: styletronT<Style, Props, Base, Engine>,
  styleArg: styleArgT<Style, ReducerProps>,
): styletronT<Style, Props & ReducerProps, Base, Engine> {
  if (typeof styleArg === "function") {
    return dynamicComposeDeep(styletron, styleArg);
  }
  // TODO: investigate how to eliminate this casting
  return (staticComposeDeep(styletron, styleArg): any);
}

export function staticComposeShallow<
  Style: Object,
  Props: Object,
  Base,
  Engine,
>(
  styletron: styletronT<Style, Props, Base, Engine>,
  style: Style,
): styletronT<Style, Props, Base, Engine> {
  return composeStatic(styletron, {
    reducer: createShallowMergeReducer(style),
    assignCommutative: true,
  });
}

export function staticComposeDeep<Style: Object, Props: Object, Base, Engine>(
  styletron: styletronT<Style, Props, Base, Engine>,
  style: Style,
): styletronT<Style, Props, Base, Engine> {
  return composeStatic(styletron, {
    reducer: createDeepMergeReducer(style),
    assignCommutative: true,
  });
}

export function dynamicComposeShallow<
  Style: Object,
  Props: Object,
  Base,
  ReducerProps: Object,
  Engine,
>(
  styletron: styletronT<Style, Props, Base, Engine>,
  styleFn: (props: ReducerProps) => Style,
): styletronT<Style, Props & ReducerProps, Base, Engine> {
  return composeDynamic(styletron, {
    assignCommutative: false,
    reducer: toMergeReducer(styleFn, shallowMerge),
  });
}

export function dynamicComposeDeep<
  Style: Object,
  Props: Object,
  Base,
  ReducerProps: Object,
  Engine,
>(
  styletron: styletronT<Style, Props, Base, Engine>,
  styleFn: (props: ReducerProps) => Style,
): styletronT<Style, Props & ReducerProps, Base, Engine> {
  return composeDynamic(styletron, {
    assignCommutative: false,
    reducer: toMergeReducer(styleFn, deepMerge),
  });
}

export function toMergeReducer<Style: Object, Props: Object>(
  fn: (props: Props) => Style,
  mergeFn: (a: Style, b: Style) => Style,
): reducerT<Style, Props> {
  return (style: Style, props: Props) => mergeFn(style, fn(props));
}

export function createShallowMergeReducer<Style: Object>(
  style: Style,
): assignCommutativeReducerT<Style> {
  // TODO: make this casting unnecessary
  function shallowMergeReducer(inputStyle) {
    return ((shallowMerge(inputStyle, style): any): Style);
  }
  shallowMergeReducer.factory = createShallowMergeReducer;
  shallowMergeReducer.style = style;
  return shallowMergeReducer;
}

export function createDeepMergeReducer<Style: Object>(
  style: Style,
): assignCommutativeReducerT<Style> {
  // TODO: make this casting unnecessary
  function deepMergeReducer(inputStyle) {
    return ((deepMerge(inputStyle, style): any): Style);
  }
  deepMergeReducer.factory = createDeepMergeReducer;
  deepMergeReducer.style = style;
  return deepMergeReducer;
}

export function composeStatic<Style: Object, Props: Object, Base, Engine>(
  styletron: styletronT<Style, Props, Base, Engine>,
  reducer: reducerItemT<Style, Props>,
): styletronT<Style, Props, Base, Engine> {
  if (styletron.reducers.length === 0) {
    // TODO: remove this casting
    const style = reducer.reducer(styletron.getInitialStyle(), ({}: any));
    return {
      reducers: styletron.reducers,
      base: styletron.base,
      driver: styletron.driver,
      debugClass: styletron.debugClass,
      wrapper: styletron.wrapper,
      getInitialStyle: () => style,
    };
  } else {
    const last = styletron.reducers[0];
    if (last.assignCommutative === true && reducer.assignCommutative === true) {
      // TODO: remove prop argument for static reducers
      const composed = reducer.reducer(last.reducer.style, {});

      return {
        getInitialStyle: styletron.getInitialStyle,
        base: styletron.base,
        debugClass: styletron.debugClass,
        driver: styletron.driver,
        wrapper: styletron.wrapper,
        reducers: [
          {
            assignCommutative: true,
            reducer: last.reducer.factory(composed),
          },
        ].concat(styletron.reducers.slice(1)),
      };
    }
    return composeDynamic(styletron, reducer);
  }
}

export function composeDynamic<
  Style: Object,
  Props: Object,
  Base,
  ReducerProps: Object,
  Engine,
>(
  styletron: styletronT<Style, Props, Base, Engine>,
  reducer: reducerItemT<Style, ReducerProps>,
): styletronT<Style, Props & ReducerProps, Base, Engine> {
  return {
    getInitialStyle: styletron.getInitialStyle,
    base: styletron.base,
    debugClass: styletron.debugClass,
    driver: styletron.driver,
    wrapper: styletron.wrapper,
    reducers: [reducer].concat(styletron.reducers),
  };
}

export function createStyledElementComponent<
  Style: Object,
  Props: Object,
  Base,
  Engine,
>({
  reducers,
  base,
  driver,
  debugClass,
  wrapper,
  getInitialStyle,
}: styletronT<Style, Props, Base, Engine>): styletronComponentT<
  Style,
  Props,
  Base,
  Engine,
> {
  // TODO: make casting not necessary
  function omitPrefixedKeys<T>(source: T): $Diff<T, Props> {
    const result = ({}: any);
    for (const key in (source: any)) {
      if (key[0] !== "$") {
        result[key] = (source: any)[key];
      }
    }
    return ((result: any): $Diff<T, Props>);
  }

  function StyledElement(props) {
    return createElement(Consumer, null, styletron => {
      const elementProps = omitPrefixedKeys(props);
      const style = resolveStyle(getInitialStyle, reducers, props);
      const styleClassString = driver(style, styletron);
      const element = props.$as ? props.$as : base;

      elementProps.className = props.className
        ? `${props.className} ${styleClassString}`
        : styleClassString;

      if (__DEV__ && __BROWSER__ && debugClass) {
        elementProps.className += " " + debugClass;
      }

      if (props.$ref) {
        elementProps.ref = props.$ref;
      }

      return createElement(element, elementProps);
    });
  }

  const Wrapped = wrapper(StyledElement);

  Wrapped.__STYLETRON__ = {base, reducers, driver, wrapper, getInitialStyle};

  if (__DEV__) {
    let displayName;
    if (typeof base === "string") {
      displayName = base;
    } else if (base.displayName) {
      displayName = base.displayName;
    } else if (base.name) {
      displayName = base.name;
    } else {
      displayName = "Unknown";
    }
    Wrapped.displayName = `Styled(${displayName})`;
  }
  return Wrapped;
}

export function resolveStyle<Style: Object, Props: Object>(
  getInitialStyle: () => Style,
  reducers: Array<reducerItemT<Style, Props>>,
  props: Props,
): Style {
  let result = getInitialStyle();
  let i = reducers.length;
  while (i--) {
    result = reducers[i].reducer(result, props);
  }
  return result;
}

export function isObject(x: any) {
  return typeof x === "object" && x !== null;
}

export function deepMerge<Style: Object>(a: Style, b: Style): Style {
  const result = assign({}, a);
  for (const key in b) {
    const val = b[key];
    if (isObject(val) && isObject(a[key])) {
      result[key] = deepMerge(a[key], val);
    } else {
      result[key] = val;
    }
  }
  // TODO: make this casting unecessary
  return (result: any);
}

export function shallowMerge<Style: Object>(a: Style, b: Style): Style {
  // TODO: make this casting unecessary
  return assign(assign((({}: any): Style), a), b);
}

export function assign<Style: Object>(target: Style, source: Style): Style {
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}

export function noop() {}
