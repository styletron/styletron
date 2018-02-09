# styletron-engine-atomic

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
