# styletron-standard

[![npm version][npm-badge]][npm-href] [![dependencies status][deps-badge]][deps-href]

Opinionated, standard interfaces for Styletron.

## Installation

```
yarn add styletron-standard
```

## API

### Style object interface

```js
import type {baseStyleT} from "styletron-standard";
```

`styletron-standard` defines a specific style object interface (along with corresponding Flow type definitions).

#### Camel case properties

CSS property names are camel cased.

```js
const style: baseStyleT = {
  textAlign: "center"
};
```

#### Pseudo classes

Nesting is used for pseudo selectors.

```js
const style: baseStyleT = {
  textAlign: "center"
  ":hover": {
    color: "red"
  }
};
```

#### Media queries

To define styles that correspond to media queries, use nested style object.

```js
const style: baseStyleT = {
  textAlign: "center"
  "@media (max-width: 800px)": {
    color: "red"
  }
};
```

### Declarative `@keyframes`

The `animationName` property takes a string, but declarative animation is also supported.

```js
import type {keyframesT} from "styletron-standard";

const animation: keyframesT = {
  to: {},
  from: {}
};

const style: keyframesT = {
  animationName: animation
};
```

### Declarative `@font-face`

The `fontFamily` property takes a string, fonts can also be used declaratively.

```js
import type {fontFaceT} from "styletron-standard";

const font: fontFaceT = {
  src: "url(/path/to/font.woff)"
};

const style: baseStyleT = {
  fontFamily: font
};
```

### Engine interface

```js
import type {StandardEngine} from "styletron-standard";
```

`styletron-standard` also defines a standard engine interface.

```js
interface StandardEngine {
  renderStyle,
  renderKeyframes,
  renderFontFace,
};
```

### Driver

```js
import type {StandardEngine} from "styletron-standard";
```

[deps-badge]: https://david-dm.org/rtsao/styletron-standard.svg
[deps-href]: https://david-dm.org/rtsao/styletron-standard
[npm-badge]: https://badge.fury.io/js/styletron-standard.svg
[npm-href]: https://www.npmjs.com/package/styletron-standard
