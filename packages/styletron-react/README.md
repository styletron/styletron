# styletron-react

[![npm version][npm-badge]][npm-href] [![dependencies status][deps-badge]][deps-href]

React bindings for Styletron, inspired by the excellent [styled-components](https://github.com/styled-components/styled-components) library. Adheres to `styletron-standard` interface.

**Check our documentation at [styletron.org](https://www.styletron.org)**.

## Installation

```
yarn add styletron-react
```

## API

The `styletron-react` package consists of the following named exports:

* [`styled`](#styled)
* [`withStyle`](#withstyle)
* [`withStyleDeep`](#withstyledeep)
* [`withTransform`](#withtransform)
* [`withWrapper`](#withwrapper)
* [`Provider`](#provider)
* [`createStyled`](#createstyled)

## Creating styled components

### `styled`

```js
import {styled} from "styletron-react";
```

The `styled` function is used to create a styled component.

#### Params

1. `base` (`string` | `React.ComponentType`)
2. `style` (`Style` | `(props: Object) => Style`)

```js
// Static styles
const Foo = styled("div", {color: "red"});

<Foo />;

// Prop-driven styles
const Foo = styled("div", props => {
  return {color: props.$fraction < 0.5 ? "red" : "green"};
});

<Foo $fraction={Math.random()} />;
```

#### Styled prop filtering

Styled components automatically pass through all props to their underlying base except those prefixed by `$`, which will be filtered out. Use this namespace for props only used for styling. React will [no longer automatically filter out non-HTML props](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html) so this convention avoids the need for burdensome manual prop filtering.

```jsx
const StyledInput = styled("input", props => ({
  color: props.disabled ? "gray" : "black",
  background: props.$variant === "error" ? "red" : "blue"
}));

<StyledInput disabled={true} $variant="error" />;
```

#### Built-in props

#### `$as`

The `$as` prop can be used to render a different element/component than what was passed into the original `styled` call.

```jsx
const Foo = styled("div", /* ... */);

<Foo />;
<Foo $as="span" />;
<Foo $as={Link} />;
```

#### `$ref`

The the `$ref` prop to set a React `ref` on the underlying element.

```jsx
const Foo = styled("div", /* ... */);

class Component extends React.Component {
  <Foo
    $ref={c => {
      this.foo = c;
    }}
  />
}
```

## Declarative `@keyframes` and `@font-face` rules

Both `@font-face` and `@keyframes` rules can be used declaratively within style objects.

### `@font-face`

If a font face object is used in place of a string for `fontFamily`, a corresponding `@font-face` rule will be automatically generated.

```jsx
const font = {
  src: "..."
};

const Foo = styled("div", {fontFamily: font});

<Foo />;
```

### `@keyframes`

If a keyframes object is used in place of a string for `animationName`, a corresponding `@keyframes` rule will be automatically generated.

```jsx
const animation = {
  from: {color: "red"},
  to: {color: "blue"}
};

const Foo = styled("div", {animationName: animation});

<Foo />;
```

## Composing styles

`styletron-react` also exports several composition functions. These can be used to create new styled components by composing styles from existing ones.

* [`withStyle`](#withstyle)
* [`withStyleDeep`](#withstyledeep)
* [`withTransform`](#withtransform)

### `withStyle`

```js
import {withStyle} from "styletron-react";
```

Use `withStyle` for style composition via shallow object merging.

#### Params

1. `styledComponent` (`StyledComponent`)
2. `style` (`Style` | `(props: Object) => Style`)

#### Examples

```jsx
const Foo = styled("div", {color: "red", background: "red"});

// Static styles
const Bar = withStyle(Foo, {background: "green"});

// Prop-driven styles
const Baz = withStyle(Foo, props => ({
  letterSpacing: props.$crushed ? "-5px" : "0px"
}));
```

### `withStyleDeep`

```js
import {withStyleDeep} from "styletron-react";
```

Use `withStyleDeep` for style composition via deep object merging.

#### Params

1. `styledComponent` (`StyledComponent`)
2. `style` (`Style` | `(props: Object) => Style`)

#### Examples

```jsx
const Foo = styled("div");

// Static styles
const Bar = withStyleDeep(Foo, {":hover": {background: "green"}});

// Props-driven styles
const Bar = withStyleDeep(Foo, props => ({
  ":hover": {background: props.$green ? "green" : "white"}
});
```

### `withTransform`

```js
import {withTransform} from "styletron-react";
```

Shallow and deep object merging gets the job done most of the time, but for more control over composition, `withTransform` allows for direct style manipulation via an arbitrary transformation function.

#### Params

1. `styledComponent` (`StyledComponent`)
2. `transform` (`(style: Style, props: Object) => Style`)

#### Examples

```jsx
const Foo = styled("div");

const Bar = withTransform(Foo, (style, props) => {
  let display =
    style.display === "none"
      ? "none"
      : props.$inline === true ? "inline-flex" : "flex";
  return {...style, display};
});
```

## Adding wrappers

### `withWrapper`

```js
import {withWrapper} from "styletron-react";
```

Use `withWrapper` to add wrapping components while preserving the ability to compose styles later on.

#### Params

1. `styledComponent` (`StyledComponent`)
2. `wrapFn` (`StyledComponent => props => ReactElement`)

#### Examples

```jsx
// New proposed React context API
const {Provider, Consumer} = React.createContext(/* ... */);

const Foo = styled("div", {color: "red"});

const Wrapped = withWrapper(Foo, Styled => props => (
  <Consumer>{value => <Styled {...props} arbitraryProp={value} />}</Consumer>
));

// Style composition still works as normal
const Bar = withStyle(Wrapped, {background: "red"});
```

## Context provider

### `Provider`

```js
import {Provider} from "styletron-react";
```

A Styletron engine must be provided using the `Provider` component.

#### Props

- `value` (`StyletronEngine`)
- `debug?` (`DebugEngine`)
- `debugAfterHydration?` (`boolean`)

#### Examples

```jsx
import {Provider} from "styletron-react";
import {Client as Styletron} from "styletron-engine-atomic";

const engine = new Styletron();

const App = () => (
  <Provider value={engine}>
    <RootComponent/>
  </Provider>
);
```


#### Browser debug mode

In the browser, there's an optional debug mode which will render debug classes to styled elements which point to the JS source location of the styled component. This mode can be enabled with the `debugMode` prop on the client side `Provider`.



##### Example

<img height="550" src="https://user-images.githubusercontent.com/780408/39457018-ac42410e-4c9f-11e8-91e7-ac2da8bfe230.gif"></img>

**Providing the debug utility**

Instantiate the debug utility and pass it to the Provider.

```diff
+ import {DebugEngine} from "styletron-react";

+ const debug = process.env.NODE_ENV === "production"
+   ? void 0
+   : new DebugEngine();

const App = () => (
- <Provider value={engine}>
+ <Provider value={engine} debug={debug}>
    <RootComponent/>
  </Provider>
);
```

**Hydrating from SSR**

When hydrating from SSR, set the `debugAfterHydration` prop to `true` to prevent warnings from mismatched client/server rendered markup. This will trigger a one-time re-render after initial hydration to add the debug classes.

```diff
import {Provider, DebugEngine} from "styletron-react";

const debug = process.env.NODE_ENV === "production"
  ? void 0
  : new DebugEngine();

const App = () => (
-  <Provider value={engine} debug={debug}>
+  <Provider value={engine} debug={debug} debugAfterHydration>
    <RootComponent/>
  </Provider>
);
```

**Debug utility interface**

```
interface DebugEngine {
  debug({stackIndex, stackInfo}) : string
}
```

## Customizing `styled`

### `createStyled`

```js
import {createStyled} from "styletron-react";
```

Returns a `styled` function.

#### Params

1. `opts`

* `opts.getInitialStyle`: (`void => StyleObject`)
* `opts.driver`: (`(StyleObject, Engine) => string`)
* `opts.wrapper`: (`StatelessFunctionalComponent<*> => StatelessFunctionalComponent<*>`)

#### Examples

```js
import {createStyled} from "styletron-react";
import type {StyleObject, StandardEngine} from "styletron-standard";

function driver(style: StyleObject, engine: any): string {
  return engine.someMethod(style);
}

function getInitialStyle(): StyleObject {
  return {};
}

const wrapper = StyledComponent => props => (
  <div>
    <StyledComponent {...props} />
  </div>
);

const styled = createStyled({getInitialStyle, driver, wrapper});
```


[deps-badge]: https://david-dm.org/rtsao/styletron-react.svg
[deps-href]: https://david-dm.org/rtsao/styletron-react
[npm-badge]: https://badge.fury.io/js/styletron-react.svg
[npm-href]: https://www.npmjs.com/package/styletron-react
