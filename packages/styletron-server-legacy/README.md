# styletron-server

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

A server-rendering helper module for [`styletron`](https://github.com/rtsao/styletron)

## Usage

#### Extracting "injected" CSS at render-time on the server

```js
const styletronServer = require('styletron-server');

const renderApp = function mockRenderFn() {
  /**
   * `renderApp` is some function that renders your app, returning a string of HTML. 
   * This function should also result in `injectOnce` being called at some point.
   */
};

const {html, css, hydrationSrc} = styletronServer.renderStatic(() => {
  const html = renderApp();
  return html;
}

/**
 * `html` is simply the return value of the function passed into `renderStatic`.
 * It is passed through for convenience.
 */

/**
 * `css` is a string containing all CSS that was that injected into the buffer
 * during the render.
 */

/**
 * `hydrationSrc` is a string of JS source code to hydrate styletron on the client.
 * This script injects a <style> element containing the server-rendered styles and also 
 * prevents re-injection of server-rendered styles on subsequent client renders.
 * Set this string as the contents of a <script> element in <head> so it is before <body>
 * and your client bundle.
 */
```

[build-badge]: https://travis-ci.org/rtsao/styletron-server.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/styletron-server
[deps-badge]: https://david-dm.org/rtsao/styletron-server.svg
[deps-href]: https://david-dm.org/rtsao/styletron-server
[npm-badge]: https://badge.fury.io/js/styletron-server.svg
[npm-href]: https://www.npmjs.com/package/styletron-server
