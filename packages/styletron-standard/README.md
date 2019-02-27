# styletron-standard

[![npm version][npm-badge]][npm-href] [![dependencies status][deps-badge]][deps-href]

Opinionated, standard interfaces for Styletron.

**Check our documentation at [styletron.org](https://www.styletron.org)**.

## Installation

```
yarn add styletron-standard
```

## API

### Style object interface

```js
import type {StyleObject} from "styletron-standard";
```

`styletron-standard` defines a specific style object interface (along with corresponding Flow type definitions).

#### Camel case properties

CSS property names are camel cased.

```js
const style: StyleObject = {
  textAlign: "center"
};
```

#### Pseudo classes

Nesting is used for pseudo selectors.

```js
const style: StyleObject = {
  textAlign: "center"
  ":hover": {
    color: "red"
  }
};
```

#### Media queries

To define styles that correspond to media queries, use nested style object.

```js
const style: StyleObject = {
  textAlign: "center"
  "@media (max-width: 800px)": {
    color: "red"
  }
};
```

### Declarative `@keyframes`

The `animationName` property takes a string, but declarative animation is also supported.

```js
import type {KeyframesObject} from "styletron-standard";

const animation: KeyframesObject = {
  to: {},
  from: {}
};

const style: KeyframesObject = {
  animationName: animation
};
```

### Declarative `@font-face`

The `fontFamily` property takes a string, fonts can also be used declaratively.

```js
import type {FontFaceObject} from "styletron-standard";

const font: FontFaceObject = {
  src: "url(/path/to/font.woff)"
};

const style: StyleObject = {
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
