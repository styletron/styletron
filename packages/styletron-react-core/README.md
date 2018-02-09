# styletron-react-core

React bindings for Styletron, inspired by [styled-components](https://github.com/styled-components/styled-components).

This package provides the core implementation that unopinionated with regard to the shape of style objects and engine interface.

## API
The `styletron-react-core` package consists of the following named exports:
- [`createStyled`](#createstyled)
- [`withStyle`](#withstyle)
- [`withStyleDeep`](#withstyledeep)
- [`withTransform`](#withtransform)
- [`withWrapper`](#withwrapper)

## Customizing `styled`

### `createStyled`

```js
import {createStyled} from "styletron-react";
```

Returns a `styled` function.

#### Params
1. `opts`
- `opts.getInitialStyle`: (`void => Style`)
- `opts.driver`: (`(Style, Engine) => string`)
- `opts.wrapper`: (`StatelessFunctionalComponent<*> => StatelessFunctionalComponent<*>`)


#### Examples

```js
import {createStyled} from "styletron-react-core";

type customStyleT = $Shape<{
  angle?: number,
  velocity?: number
}>;

interface CustomEngine {
  someMethod: customStyleT => string
}

function driver(style: customStyleT, engine: CustomEngine) : string {
  return engine.someMethod(style);
}

function getInitialStyle() : customStyleT {
  return {};
}

const wrapper = StyledComponent => props => <div><StyledComponent {...props}/></div>;

const styled = createStyled({getInitialStyle, driver, wrapper})

```
