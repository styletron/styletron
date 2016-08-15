# [![Styletron logo](https://cdn.rawgit.com/rtsao/styletron/logo/logo.svg "Styletron")](https://github.com/rtsao/styletron)

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

Universal, high-performance JavaScript styles.

Styletron is designed for high performance in two ways:

#### Advanced critical rendering path optimization of server-rendered pages
- Generation of critical stylesheets with minimum possible size and parse times
  - Dynamic elimination of unused CSS for each render
  - Automatic generation of atomic CSS with declaration-level deduplication
- Native media query support for full critical CSS without JavaScript

#### Efficient dynamic client-side styles
- Hyper-granular memoization to avoid making unnecessary modifications to stylesheet
- Cache hydration of server-rendered styles 
- Use of `CSSStyleSheet` API to inject styles to ensure *only* newly added styles get parsed

[build-badge]: https://travis-ci.org/rtsao/styletron.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/styletron
[deps-badge]: https://david-dm.org/rtsao/styletron.svg
[deps-href]: https://david-dm.org/rtsao/styletron
[npm-badge]: https://badge.fury.io/js/styletron.svg
[npm-href]: https://www.npmjs.com/package/styletron
