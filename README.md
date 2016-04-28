# styletron

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

A generic server-rendering helper for css-in-js tools

This module provides functionality for:
 * Injection of CSS into the document head in browsers
   * Buffering of multiple injections into a single update
   * Ignoring of duplicate style injections
 * Extraction of CSS at render-time on the server, which can be sent down along with markup

This concept behind this module is originally from https://github.com/Khan/aphrodite, but this module is smaller in scope and more generic.

## Usage

#### Injecting a style into document `<head>`

```js
const styletron = require('styletron');
styletron.injectOnce('someUniqueId', '.foo { color: red }');
```

#### Extracting "injected" CSS at render-time on the server

**See [`styletron-server`](https://github.com/rtsao/styletron-server)**

## [API documentation](docs/api.md)

[build-badge]: https://travis-ci.org/rtsao/styletron.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/styletron
[deps-badge]: https://david-dm.org/rtsao/styletron.svg
[deps-href]: https://david-dm.org/rtsao/styletron
[npm-badge]: https://badge.fury.io/js/styletron.svg
[npm-href]: https://www.npmjs.com/package/styletron
