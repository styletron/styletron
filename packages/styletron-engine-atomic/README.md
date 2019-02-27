# styletron-engine-atomic

[![npm version][npm-badge]][npm-href] [![dependencies status][deps-badge]][deps-href]

Atomic implementation of the [`styletron-standard`](../styletron-standard) engine interface.

**Check our documentation at [styletron.org](https://www.styletron.org)**.

## Installation

```
yarn add styletron-engine-atomic
```

## API

This package provides two named exports:

* [`Client`](#client) - Client-side engine class
* [`Server`](#server) - Server-side engine class

### `Client`

```js
import {Client} from "styletron-engine-atomic";
```

#### `.constructor(opts?: {prefix?: string, hydrate?: HTMLStyleElement[], container: Element})`

##### Options

* `prefix?: string` The prefix to be used for all generated atomic identifiers (e.g. class names, `@keyframes` names, etc.)
* `hydrate?: HTMLStyleElement[]` Collection of server-rendered style elements. Hydration is required when server-side rendering.
* `container?: Element` The element that new stylesheets should be appended to. Defaults to the parent element of the first stylesheet passed via `hydrate`, otherwise defaults to `document.head`.

```js
const instance = new Client();
```

#### [`.renderStyle(style) => string`](#renderstylestyle--string-2)

#### [`.renderKeyframes(keyframes) => string`](#renderkeyframeskeyframes--string-2)

#### [`.renderFontFace(fontFace) => string`](#renderfontfacefontface--string-2)

### `Server`

```js
import {Server} from "styletron-engine-atomic";
```

#### `.constructor(opts?: {prefix?: string})`

##### Options

* `prefix?: string` The prefix to be used for all generated atomic identifiers (e.g. class names, `@keyframes` names, etc.)

```js
const instance = new Server();
```

#### `.getStylesheets() => Array<{css: string, attrs: {[string]: string}}>`

Returns styles as an array of stylesheet objects.

#### `.getStylesheetsHtml(className: string) => string`

Returns styles as a string of HTML that can also be used for client-side hydration.

#### `.getCss() => string`

Returns styles as a string of CSS for purely server-side rendering use cases where no client-side hydration is needed.

#### [`.renderStyle(style) => string`](#renderstylestyle--string-2)

#### [`.renderKeyframes(keyframes) => string`](#renderkeyframeskeyframes--string-2)

#### [`.renderFontFace(fontFace) => string`](#renderfontfacefontface--string-2)

### Universal methods

These methods exist on both the server and client instances.

#### `.renderStyle(style) => string`

Renders a given style object, returning the corresponding generated class name.

```js
instance.renderStyle({
  color: "red",
  fontSize: "12px"
});
// → "a b"
```

#### `.renderKeyframes(keyframes) => string`

Renders a given keyframes object, returning the corresponding generated `@keyframes` rule name.

```js
const animationName = instance.renderKeyframes({
  from: {color: "red"},
  to: {color: "blue"}
});
// → "a"
```

#### `.renderFontFace(fontFace) => string`

Renders a given font face object, returning the font-family name from the corresponding generated `@font-face` rule.

```js
const fontFamily = instance.renderFontFace({
  src: "..."
});
// → "a"
```

## Tradeoffs

See [TRADEOFFS.md](TRADEOFFS.md)

[deps-badge]: https://david-dm.org/rtsao/styletron-engine-atomic.svg
[deps-href]: https://david-dm.org/rtsao/styletron-engine-atomic
[npm-badge]: https://badge.fury.io/js/styletron-engine-atomic.svg
[npm-href]: https://www.npmjs.com/package/styletron-engine-atomic
