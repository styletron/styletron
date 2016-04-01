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

Real-world usage examples coming soon.

This concept is originally from https://github.com/Khan/aphrodite, but this module is much smaller in scope and unopinionated.

[build-badge]: https://travis-ci.org/rtsao/styletron.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/styletron
[deps-badge]: https://david-dm.org/rtsao/styletron.svg
[deps-href]: https://david-dm.org/rtsao/styletron
[npm-badge]: https://badge.fury.io/js/styletron.svg
[npm-href]: https://www.npmjs.com/package/styletron
