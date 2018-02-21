# styletron-engine-atomic

[![npm version][npm-badge]][npm-href] [![dependencies status][deps-badge]][deps-href]

Atomic implementation of `styletron-standard` engine interface.

## API

This package provides two named exports:

* [`Client`](#client) - Client-side engine
* [`Server`](#server) - Server-side engine

### `Client`

```js
import {Client} from "styletron-engine-atomic";
```

#### `.constructor()`

```js
new Client();
```

#### `.renderStyle(style) => string`

Render a given style object, returning the corresponding generated class name.

```js
instance.renderStyle({
  color: "red",
  fontSize: "12px"
});
// → "a b"
```

#### `.renderKeyframes(keyframes) => string`

Render a given keyframes object, returning the corresponding generated keyframes name.

```js
const animationName = instance.renderKeyframes({
  to: {},
  from: {}
});
// → "a"
```

#### `.renderFontFace(fontFace) => string`

Render a given font face object, returning the corresponding generated font-family name.

```js
const fontFamily = instance.renderFontFace({
  src: "..."
});
// → "a"
```

---

### `Server`

```js
import {Server} from "styletron-engine-atomic";
```

#### `.constructor()`

#### `.renderStyle(style) => string`

Render a given style object, returning the corresponding generated class name.

```js
instance.renderStyle({
  color: "red",
  fontSize: "12px"
});
// → "a b"
```

#### `.renderKeyframes(keyframes) => string`

Render a given keyframes object, returning the corresponding generated keyframes name.

```js
instance.renderKeyframes({
  to: {},
  from: {}
});
// → "a"
```

#### `.renderFontFace(fontFace) => string`

Render a given font face object, returning the corresponding generated font-family name.

```js
instance.renderFontFace({
  src: "..."
});
// → "a"
```

#### `.getStylesheets() => Array<{css: string, attrs: {[string]: string}}>`

#### `.getStylesheetsHtml(className: string) => string`

Returns a string of HTML

#### `.getCss() => string`

Returns a string of all CSS for purely server-side rendering use cases where no client-side hydration is needed.

## Tradeoffs

See [TRADEOFFS.md](TRADEOFFS.md)

[deps-badge]: https://david-dm.org/rtsao/styletron-engine-atomic.svg
[deps-href]: https://david-dm.org/rtsao/styletron-engine-atomic
[npm-badge]: https://badge.fury.io/js/styletron-engine-atomic.svg
[npm-href]: https://www.npmjs.com/package/styletron-engine-atomic
