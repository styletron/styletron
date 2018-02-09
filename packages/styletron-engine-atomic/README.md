# styletron-engine-atomic

[![npm version][npm-badge]][npm-href] [![dependencies status][deps-badge]][deps-href]

Atomic implementation of `styletron-standard` engine interface.

## `Client`

```js
import {Client} from "styletron-engine-atomic";
```

### API

#### `.constructor()`

##### Example

```js
new Client();
```

#### `.renderStyle(style) => string`

#### `.renderKeyframes(keyframes) => string`

#### `.renderFontFace(fontFace) => string`

## `Server`

```js
import {Server} from "styletron-engine-atomic";
```

### API

#### `.constructor()`

#### `.renderStyle(style) => string`

#### `.renderKeyframes(keyframes) => string`

#### `.renderFontFace(fontFace) => string`

#### `.getStylesheets() => Array<{css: string, media: string, "keyframes"?: string[], "font-face"?: string[]}>`

#### `.getStylesheetsHtml(className: string) => string`
Returns a string of HTML

#### `.getCss() => string`

Returns a string of all CSS for purely server-side rendering use cases where no client-side hydration is needed.

[deps-badge]: https://david-dm.org/rtsao/styletron-engine-atomic.svg
[deps-href]: https://david-dm.org/rtsao/styletron-engine-atomic
[npm-badge]: https://badge.fury.io/js/styletron-engine-atomic.svg
[npm-href]: https://www.npmjs.com/package/styletron-engine-atomic
