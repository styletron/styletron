// @flow
/* eslint-env browser */
/* eslint-disable no-unused-vars, no-redeclare, no-shadow */

declare var __DEV__: boolean;
declare var __BROWSER__: boolean;
declare var process: any;

import * as React from "react";
import {
  driver,
  getInitialStyle,
  type StandardEngine,
  type StyleObject,
} from "styletron-standard";

import type {
  Styletron,
  StyletronComponent,
  ReducerContainer,
  AssignmentCommutativeReducerContainer,
  NonAssignmentCommutativeReducerContainer,
  StyledFn,
  WithStyleFn,
  WithTransformFn,
  WithWrapperFn,
} from "./types.js";
import {
  addDebugMetadata,
  setupDevtoolsExtension,
  DebugEngine,
} from "./dev-tool.js";

export {DebugEngine};
export type {StyleObject};

const noopEngine = {
  renderStyle: () => "",
  renderKeyframes: () => "",
  renderFontFace: () => "",
};

const StyletronContext = React.createContext<StandardEngine>(noopEngine);
const HydrationContext = React.createContext(false);
const DebugEngineContext = React.createContext();
const ThemeContext = React.createContext();

type DevProviderProps = {
  children: React.Node,
  value: StandardEngine,
  debugAfterHydration?: boolean,
  debug?: any,
};

class DevProvider extends React.Component<
  DevProviderProps,
  {hydrating: boolean},
> {
  constructor(props: DevProviderProps) {
    super();
    this.state = {
      hydrating: Boolean(props.debugAfterHydration),
    };
  }

  componentDidMount() {
    if (__BROWSER__) {
      if (this.state.hydrating === true) {
        this.setState({
          hydrating: false,
        });
      }
    }
  }

  render() {
    return (
      <StyletronContext.Provider value={this.props.value}>
        <DebugEngineContext.Provider value={this.props.debug}>
          <HydrationContext.Provider value={this.state.hydrating}>
            {this.props.children}
          </HydrationContext.Provider>
        </DebugEngineContext.Provider>
      </StyletronContext.Provider>
    );
  }
}

export const Provider =
  __BROWSER__ && __DEV__ ? DevProvider : StyletronContext.Provider;

if (__BROWSER__ && __DEV__ && !window.__STYLETRON_DEVTOOLS__) {
  setupDevtoolsExtension();
}

// TODO: more precise types
export function DevConsumer(props: {children: (any, any, any) => React.Node}) {
  return (
    <StyletronContext.Consumer>
      {styletronEngine => (
        <DebugEngineContext.Consumer>
          {debugEngine => (
            <HydrationContext.Consumer>
              {hydrating =>
                props.children(styletronEngine, debugEngine, hydrating)
              }
            </HydrationContext.Consumer>
          )}
        </DebugEngineContext.Consumer>
      )}
    </StyletronContext.Consumer>
  );
}

const Consumer =
  __BROWSER__ && __DEV__ ? DevConsumer : StyletronContext.Consumer;

type createStyledOpts = {
  getInitialStyle: () => StyleObject,
  driver: typeof driver,
  wrapper: (
    React.StatelessFunctionalComponent<any>,
  ) => React.ComponentType<any>,
};

function checkNoopEngine(engine: StandardEngine) {
  // if no engine provided, we default to no-op, handy for tests
  // however, print a warning in other envs
  if (process.env.NODE_ENV !== "test") {
    engine === noopEngine &&
      // eslint-disable-next-line no-console
      console.warn(
        __DEV__
          ? `
Styletron has been switched to a no-op (test) mode.

A Styletron styled component was rendered, but no Styletron engine instance was provided in React context.

Did you forget to provide a Styletron engine instance to React context via using the Styletron provider component?

Note: Providers and Consumers must come from the exact same React.createContext call to work.
If your app has multiple instances of the "styletron-react" package in your node_module tree,
your Provider may be coming from a different React.createContext call, which means the styled components
will not recieve the provided engine instance. This scenario can arise, for example, when using "npm link".
`
          : `Styletron Provider is not set up. Defaulting to no-op.`,
      );
  }
}

export function useStyletron() {
  const styletronEngine: StandardEngine = React.useContext(StyletronContext);
  const debugEngine = React.useContext(DebugEngineContext);
  const hydrating = React.useContext(HydrationContext);
  checkNoopEngine(styletronEngine);

  const debugClassName = React.useRef("");
  const prevDebugClassNameDeps = React.useRef([]);

  return [
    function css(style: StyleObject) {
      const className = driver(style, styletronEngine);
      if (!(__BROWSER__ && __DEV__)) {
        return className;
      }
      const {stack, message} = new Error("stacktrace source");

      const nextDeps = [debugEngine, hydrating];
      if (
        prevDebugClassNameDeps.current[0] !== nextDeps[0] ||
        prevDebugClassNameDeps.current[1] !== nextDeps[1]
      ) {
        if (debugEngine && !hydrating) {
          debugClassName.current = debugEngine.debug({
            stackInfo: {stack, message},
            stackIndex: 1,
          });
        }
        prevDebugClassNameDeps.current = nextDeps;
      }

      if (debugClassName.current) {
        return `${debugClassName.current} ${className}`;
      }

      return className;
    },
  ];
}

export function createStyled({
  getInitialStyle,
  driver,
  wrapper,
}: createStyledOpts): StyledFn {
  function styled(base: any, styleArg) {
    if (__DEV__) {
      if (base.__STYLETRON__) {
        /* eslint-disable no-console */
        console.warn(
          "It appears you are passing a styled component into `styled`.",
        );
        console.warn(
          "For composition with existing styled components, use `withStyle` or `withTransform` instead.",
        );
        /* eslint-enable no-console */
      }
    }

    const baseStyletron: Styletron = {
      reducers: [],
      base: base,
      driver,
      getInitialStyle,
      wrapper,
    };

    if (__BROWSER__ && __DEV__) {
      addDebugMetadata(baseStyletron, 2);
    }

    return createStyledElementComponent(
      autoComposeShallow(baseStyletron, styleArg),
    );
  }

  return styled;
}

export const styled: StyledFn = createStyled({
  getInitialStyle,
  driver,
  wrapper: Component => Component,
});

declare var withTransform: WithTransformFn;
export function withTransform(component, transformer) {
  const styletron = component.__STYLETRON__;

  if (__BROWSER__ && __DEV__) {
    addDebugMetadata(styletron, 2);
  }

  return createStyledElementComponent(composeDynamic(styletron, transformer));
}

declare var withStyle: WithStyleFn;
export var withStyle = withStyleDeep;

declare var withStyleDeep: WithStyleFn;
export function withStyleDeep(component, styleArg) {
  const styletron = component.__STYLETRON__;

  if (__DEV__) {
    if (!styletron) {
      /* eslint-disable no-console */
      console.warn(
        "The first parameter to `withStyle` must be a styled component (without extra wrappers).",
      );
      /* eslint-enable no-console */
    }
  }

  if (__BROWSER__ && __DEV__) {
    addDebugMetadata(styletron, 2);
    return createStyledElementComponent(
      addExtension(autoComposeDeep(styletron, styleArg), component, styleArg),
    );
  } else {
    return createStyledElementComponent(autoComposeDeep(styletron, styleArg));
  }
}

declare var withWrapper: WithWrapperFn;
export function withWrapper(component, wrapper) {
  const styletron = component.__STYLETRON__;

  if (__DEV__) {
    if (!styletron) {
      /* eslint-disable no-console */
      console.warn(
        "The first parameter to `withWrapper` must be a styled component (without extra wrappers).",
      );
      /* eslint-enable no-console */
    }
  }

  const composed = {
    getInitialStyle: styletron.getInitialStyle,
    base: styletron.base,
    driver: styletron.driver,
    wrapper: wrapper,
    reducers: styletron.reducers,
  };

  if (__BROWSER__ && __DEV__) {
    addDebugMetadata(composed, 2);
  }

  return createStyledElementComponent(composed);
}

export function autoComposeShallow<Props>(
  styletron: Styletron,
  styleArg: StyleObject | (Props => StyleObject),
) {
  if (typeof styleArg === "function") {
    return dynamicComposeShallow(styletron, styleArg);
  }

  return staticComposeShallow(styletron, styleArg);
}

function addExtension(composed, component, styleArg) {
  return {
    ...composed,
    ext: {
      with: styleArg,
      name: component.displayName,
      base: component.__STYLETRON__.base,
      getInitialStyle: component.__STYLETRON__.reducers.length
        ? component.__STYLETRON__.reducers[0].reducer
        : component.__STYLETRON__.getInitialStyle,
    },
  };
}

export function autoComposeDeep<Props>(
  styletron: Styletron,
  styleArg: StyleObject | (Props => StyleObject),
) {
  if (typeof styleArg === "function") {
    return dynamicComposeDeep(styletron, styleArg);
  }

  return staticComposeDeep(styletron, styleArg);
}

export function staticComposeShallow(styletron: Styletron, style: StyleObject) {
  return composeStatic(styletron, createShallowMergeReducer(style));
}

export function staticComposeDeep(styletron: Styletron, style: StyleObject) {
  return composeStatic(styletron, createDeepMergeReducer(style));
}

export function dynamicComposeShallow<Props>(
  styletron: Styletron,
  styleFn: Props => StyleObject,
) {
  return composeDynamic(styletron, (style, props) =>
    shallowMerge(style, styleFn(props)),
  );
}

export function dynamicComposeDeep<Props>(
  styletron: Styletron,
  styleFn: Props => StyleObject,
) {
  return composeDynamic(styletron, (style, props) =>
    deepMerge(style, styleFn(props)),
  );
}

export function createShallowMergeReducer(
  style: StyleObject,
): AssignmentCommutativeReducerContainer {
  return {
    reducer: inputStyle => shallowMerge(inputStyle, style),
    assignmentCommutative: true,
    factory: createShallowMergeReducer,
    style: style,
  };
}

export function createDeepMergeReducer(
  style: StyleObject,
): AssignmentCommutativeReducerContainer {
  return {
    reducer: inputStyle => deepMerge(inputStyle, style),
    assignmentCommutative: true,
    factory: createDeepMergeReducer,
    style: style,
  };
}

export function composeStatic(
  styletron: Styletron,
  reducerContainer: AssignmentCommutativeReducerContainer,
) {
  if (styletron.reducers.length === 0) {
    const style = reducerContainer.reducer(styletron.getInitialStyle());
    const result: Styletron = {
      reducers: styletron.reducers,
      base: styletron.base,
      driver: styletron.driver,
      wrapper: styletron.wrapper,
      getInitialStyle: () => style,
    };
    if (__BROWSER__ && __DEV__) {
      result.debug = styletron.debug;
    }
    return result;
  } else {
    const last = styletron.reducers[0];

    if (
      last.assignmentCommutative === true &&
      reducerContainer.assignmentCommutative === true
    ) {
      const composed = reducerContainer.reducer(last.style);

      const result: Styletron = {
        getInitialStyle: styletron.getInitialStyle,
        base: styletron.base,
        driver: styletron.driver,
        wrapper: styletron.wrapper,
        reducers: [last.factory(composed)].concat(styletron.reducers.slice(1)),
      };

      if (__BROWSER__ && __DEV__) {
        result.debug = styletron.debug;
      }

      return result;
    }

    return composeDynamic(styletron, reducerContainer.reducer);
  }
}

export function composeDynamic<Props>(
  styletron: Styletron,
  reducer: (StyleObject, Props) => StyleObject,
) {
  const composed: Styletron = {
    getInitialStyle: styletron.getInitialStyle,
    base: styletron.base,
    driver: styletron.driver,
    wrapper: styletron.wrapper,
    reducers: [{assignmentCommutative: false, reducer}].concat(
      styletron.reducers,
    ),
  };
  if (__BROWSER__ && __DEV__) {
    composed.debug = styletron.debug;
  }
  return composed;
}

export function createStyledElementComponent(styletron: Styletron) {
  const {reducers, base, driver, wrapper, getInitialStyle, ext} = styletron;

  if (__BROWSER__ && __DEV__) {
    var debugStackInfo, debugStackIndex;
    if (styletron.debug) {
      debugStackInfo = styletron.debug.stackInfo;
      debugStackIndex = styletron.debug.stackIndex;
    }
  }

  if (__BROWSER__ && __DEV__) {
    var debugClassName;
  }

  const StyledElement = React.forwardRef((props, ref) => {
    return (
      <Consumer>
        {(styletron, debugEngine, hydrating) => {
          checkNoopEngine(styletron);

          const elementProps = omitPrefixedKeys(props);
          let style = resolveStyle(getInitialStyle, reducers, props);

          if (props.$style) {
            if (typeof props.$style === "function") {
              style = deepMerge(style, props.$style(props));
            } else {
              style = deepMerge(style, props.$style);
            }
          }

          const styleClassString = driver(style, styletron);
          const Element = props.$as ? props.$as : base;
          elementProps.className = props.className
            ? `${props.className} ${styleClassString}`
            : styleClassString;

          if (__BROWSER__ && __DEV__ && debugEngine && !hydrating) {
            if (!debugClassName) {
              debugClassName = debugEngine.debug({
                stackInfo: debugStackInfo,
                stackIndex: debugStackIndex,
              });
            }

            const joined = `${debugClassName} ${elementProps.className}`;
            elementProps.className = joined;
          }

          if (__BROWSER__ && __DEV__ && window.__STYLETRON_DEVTOOLS__) {
            window.__STYLETRON_DEVTOOLS__.stylesMap.set(
              elementProps.className,
              style,
            );
            if (ext) {
              window.__STYLETRON_DEVTOOLS__.extensionsMap.set(
                elementProps.className,
                {
                  base: ext.base,
                  displayName: ext.name,
                  initialStyles: ext.getInitialStyle({}, props),
                  styleOverrides:
                    typeof ext.with === "function" ? ext.with(props) : ext.with,
                },
              );
            }
          }

          if (props.$ref) {
            // eslint-disable-next-line no-console
            console.warn(
              "The prop `$ref` has been deprecated. Use `ref` instead. Refs are now forwarded with React.forwardRef.",
            );
          }
          return <Element {...elementProps} ref={ref || props.$ref} />;
        }}
      </Consumer>
    );
  });

  const Wrapped = wrapper(StyledElement);
  Wrapped.__STYLETRON__ = {
    base,
    reducers,
    driver,
    wrapper,
    getInitialStyle,
  };

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

// Utility functions

export function resolveStyle(
  getInitialStyle: void => StyleObject,
  reducers: Array<ReducerContainer>,
  props: Object,
): StyleObject {
  let result = getInitialStyle();
  let i = reducers.length;
  while (i--) {
    // Cast to allow passing unused props param in case of static reducer
    const reducer = (reducers[i].reducer: (StyleObject, Object) => StyleObject);
    result = reducer(result, props);
  }
  return result;
}

function isObject(x: any) {
  return typeof x === "object" && x !== null;
}

function omitPrefixedKeys(source) {
  const result = {};

  for (const key in source) {
    if (key[0] !== "$") {
      result[key] = source[key];
    }
  }

  return result;
}

function deepMerge(a, b) {
  const result = assign({}, a);

  for (const key in b) {
    const val = b[key];

    if (isObject(val) && isObject(a[key])) {
      result[key] = deepMerge(a[key], val);
    } else {
      result[key] = val;
    }
  }

  return result;
}

function shallowMerge(a, b) {
  return assign(assign({}, a), b);
}

function assign(target, source) {
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}
