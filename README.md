# [![Styletron logo](https://cdn.rawgit.com/rtsao/styletron/logo/logo.svg "Styletron")](https://github.com/rtsao/styletron)

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

Universal, high-performance JavaScript styles.

**[API documentation: http://styletron.js.org](http://styletron.js.org)**

## What is Styletron?

Styletron is a universal CSS-in-JS engine built from the ground up for high-performance. Features include:

#### Advanced critical rendering path optimization of server-rendered pages
- Dynamic generation of inlineable critical stylesheets with minimum possible size and parse times
  - Automatic generation of maximally compressed "atomic" critical CSS via declaration-level deduplication
  - Automatic declaration-level dead CSS elimination - only *actually used* declarations get included in output
- Native media query support for full critical CSS without JavaScript

#### Efficient dynamic client-side styles
- Hyper-granular memoization to avoid making unnecessary modifications to stylesheet
- Fast cache hydration of server-rendered styles to prevent re-rendering of server-rendered styles
- Use of `CSSStyleSheet` rule injection ensuring *only* new styles get parsed

[build-badge]: https://travis-ci.org/rtsao/styletron.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/styletron
[deps-badge]: https://david-dm.org/rtsao/styletron.svg
[deps-href]: https://david-dm.org/rtsao/styletron
[npm-badge]: https://badge.fury.io/js/styletron.svg
[npm-href]: https://www.npmjs.com/package/styletron
