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

## Usage

Note: This module is designed to be integrated into other, more opinionated modules with larger scope.

#### Injecting a style into document `<head>`

```js
const {injectOnce} = require('styletron').injector;
injectOnce('someUniqueId', '.foo {}');
```


#### Extracting "injected" CSS at render-time on the server

```js
const renderApp = require('./render-my-app-fn');
/**
 * `renderApp` is some function that renders the app, returning a string of HTML. 
 * This function should also result in `injectOnce` being called at some point.
 */
const styletron = require('styletron');
const {html, css} = styletron.server.renderStatic(() => {
  const html = renderApp();
  return html;
}
/**
 * `css` will be a string containing all the css that was passed into `injectOnce`
 * during the render. When you send down the HTML to the client, you should set this
 * as the contents of a <style data-styletron></style> element in the <head>.
 */
```

This concept is originally from https://github.com/Khan/aphrodite, but this module is much smaller in scope and unopinionated.

[build-badge]: https://travis-ci.org/rtsao/styletron.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/styletron
[deps-badge]: https://david-dm.org/rtsao/styletron.svg
[deps-href]: https://david-dm.org/rtsao/styletron
[npm-badge]: https://badge.fury.io/js/styletron.svg
[npm-href]: https://www.npmjs.com/package/styletron
