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
  return {color: props.$fraction < 0.5 ? "red" : "green"};
});

<Foo $fraction={Math.random()} />;

```


#### Styled prop filtering

Styled components automatically pass through all props to their underlying base except those prefixed by `$`, which will be filtered out. Use this namespace for props only used for styling. React will [no longer automatically filter out non-HTML props](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html) so this convention solves this problem without burdensome manual prop filtering.

```jsx
const StyledInput = styled("input", props => ({
  color: props.disabled ? "gray" : "black",
  background: props.$variant === "error" ? "red" : "blue"
}));

<StyledInput disabled={true} $variant="error"/>
```

#### Built-in props

#### `$as`
```jsx
const Foo = styled("div", /* ... */);

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

`styletron-react` also exports several composition functions. These can be used to create new styled components by composing styles from existing ones.

- [`withStyle`](#withstyle)
- [`withStyleDeep`](#withstyledeep)
- [`withTransform`](#withtransform)

### `withStyle`

```js
import {withStyle} from "styletron-react";
```

Use `withStyle` for style composition via shallow object merging.

#### Params
1. `styledComponent` (`StyledComponent`)
2. `style` (`Style` | `(props: Object) => Style`)

```jsx
const Foo = styled("div, {color: "red", background: "red"});

// Static styles
const Bar = withStyle(Foo, {background: "green"});

// Prop-driven styles
const Baz = withStyle(Foo, props => ({
  letterSpacing: props.$crushed ? "-5px" : "0px"
}));
```

### `withStyleDeep`

```js
import {withStyle} from "styletron-react";
```

Deep object merging

#### Params
1. `styledComponent` (`StyledComponent`)
2. `style` (`Style` | `(props: Object) => Style`)

#### Examples

```jsx
const Foo = styled("div");
const Bar = withStyle(Foo, {});
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
