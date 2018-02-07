# styletron-react

React bindings for Styletron, inspired by the excellent [styled-components](https://github.com/styled-components/styled-components) library.

## API
The `styletron-react` package consists of the following named exports:
- [`styled`](#styled)
- [`withStyle`](#withstyle)
- [`withStyleDeep`](#withstyledeep)
- [`withTransform`](#withtransform)
- [`withWrapper`](#withwrapper)

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
  return {color: props.$num < 0.5 ? "red" : "green"};
});

<Foo $num={Math.random()} />;

```


#### Styled prop filtering

Styled components automatically pass through all props to their underlying base except those prefixed by `$`, which will be filtered out.

```jsx
const StyledInput = styled("input", ({$variant}) => /* ... */);

<StyledInput disabled={true} $variant="primary"/>
```


#### `$as`
```jsx
const Foo = styled("div", {color: "red"});

<Foo/>;
<Foo $as="span"/>;
<Foo $as={Link}/>;
```

#### `$ref`

The the `$ref` prop to set a React `ref` on the underlying element.

```jsx
const Foo = styled('div', /* ... */);

class Component extends React.Component {
  <Foo
    $ref={c => {
      this.foo = c;
    }}
  />
}

```

## Composing styles

`styletron-react` also exports several composition functions, allowing you to create new styled element components from existing ones.

- [`withStyle`](#withstyle)
- [`withStyleDeep`](#withstyledeep)
- [`withTransform`](#withtransform)

### `withStyle`

Shallow object merging


```js
import {withStyle} from "styletron-react";
```

#### Params
1. `base` (`string` | `React.ComponentType`)
2. `style` (`Style` | `(props: Object) => Style`)

```jsx
const Foo = styled("div");
const Bar = withStyle(Foo, {});
```

### `withStyleDeep`
Deep object merging
```js
import {withStyle} from "styletron-react";
```

#### Params
1. `base` (`string` | `React.ComponentType`)
2. `style` (`Style` | `(props: Object) => Style`)



#### Examples

```jsx
const Foo = styled("div");
const Bar = withStyle(Foo, {});
```

### `withTransform`
Arbitrary transforms

```js
import {withTransform} from "styletron-react";
```

#### Params
1. `component` (`StyledComponent`)
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

It may be useful to add wrapping components such as context providers to styled components. This can be done with `withWrapper` while preserving the ability to compose styles later on.

### `withWrapper`

```js
import {withWrapper} from "styletron-react";
```

#### Params
1. `component` (`StyledComponent`)
2. `wrapFn` (`StyledComponent => props => ReactElement`)

#### Examples

```jsx
// New proposed React context API
const {Provider, Consumer} = React.createContext(/* ... */);

const Foo = styled("div", {color: "red"});

const Wrapped = withWrapper(Foo, Styled => props => (
  <Consumer>{value => <Styled {...props} arbitraryProp={value} />}</Consumer>
));

const Bar = withStyle(Wrapped, {background: "red"});

```
