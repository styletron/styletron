# styletron-react-core

[![npm version][npm-badge]][npm-href] [![dependencies status][deps-badge]][deps-href]

React bindings for Styletron, inspired by [styled-components](https://github.com/styled-components/styled-components).

This package provides the core implementation that is agnostic of the shape style objects and the engine interface.

## Installation

```
yarn add styletron-react-core
```

## API

The `styletron-react-core` package consists of the following named exports:

* [`createStyled`](#createstyled)
* [`withStyle`](#withstyle)
* [`withStyleDeep`](#withstyledeep)
* [`withTransform`](#withtransform)
* [`withWrapper`](#withwrapper)

## Customizing `styled`

### `createStyled`

```js
import {createStyled} from "styletron-react-core";
```

Returns a `styled` function.

#### Params

1. `opts`

* `opts.getInitialStyle`: (`void => Style`)
* `opts.driver`: (`(Style, Engine) => string`)
* `opts.wrapper`: (`StatelessFunctionalComponent<*> => StatelessFunctionalComponent<*>`)

#### Examples

```js
import {createStyled} from "styletron-react-core";

type customStyleT = $Shape<{
  angle?: number,
  velocity?: number
}>;

interface CustomEngine {
  someMethod: customStyleT => string;
}

function driver(style: customStyleT, engine: CustomEngine): string {
  return engine.someMethod(style);
}

function getInitialStyle(): customStyleT {
  return {};
}

const wrapper = StyledComponent => props => (
  <div>
    <StyledComponent {...props} />
  </div>
);

const styled = createStyled({getInitialStyle, driver, wrapper});
```

[deps-badge]: https://david-dm.org/rtsao/styletron-react-core.svg
[deps-href]: https://david-dm.org/rtsao/styletron-react-core
[npm-badge]: https://badge.fury.io/js/styletron-react-core.svg
[npm-href]: https://www.npmjs.com/package/styletron-react-core
