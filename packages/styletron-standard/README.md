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
import type { StyleObject } from "styletron-standard";
```

`styletron-standard` defines a specific style object interface (along with corresponding Flow type definitions).

### Engine interface

```js
import type { StandardEngine } from "styletron-standard";
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
import type { StandardEngine } from "styletron-standard";
```

[deps-badge]: https://david-dm.org/rtsao/styletron-standard.svg
[deps-href]: https://david-dm.org/rtsao/styletron-standard
[npm-badge]: https://badge.fury.io/js/styletron-standard.svg
[npm-href]: https://www.npmjs.com/package/styletron-standard
