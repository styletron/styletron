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

## Basic usage

The core Styletron module is totally unopinonated and works with or without any view-rendering library.

```js
import Styletron from 'styletron/server';

const styletron = new Styletron();
styletron.injectDeclaration({prop: 'background-color', val: 'red'}); // returns a class name
// ➜ 'c0'
styletron.injectDeclaration({prop: 'font-size', val: '12px'});
// ➜ 'c1'
styletron.getCss();
// ➜ '.c0{background-color:red}.c1{font-size:12px}'
```

Of course, this would be an inconvient API to use directly, so there's a `styletron-utils` package provides a more convient way to inject style objects in an interface that should be very familiar:
```js
import Styletron from 'styletron/server';
import {injectStyle} from 'styletron-utils';

const styletron = new Styletron();
injectStyle(styletron, {
  backgroundColor: 'red',
  fontSize: '12px'
});
// ➜ 'c0 c1'
styletron.getCss();
// ➜ '.c0{background-color:red}.c1{font-size:12px}'
```

Because the core Styletron API is very unopinionated, it can be integrated into virtually any app or even other CSS-in-JS solutions.

## Getting started with React

[Full isomorphic demo app](https://github.com/rtsao/styletron/tree/master/packages/react-demo)

There's also slightly more opinionated `styletron-react` package for React applications:

```bash
npm install styletron-react --save
```

```js
import React from 'react';
import {connectToStyles} from 'styletron-react';

const hoc = connectToStyles(props => {
  return {
    container: {
      margin: '0px auto',
      width: '640px',
      background: props.color
    },
    title: {
      fontSize: '24px'
    }
  }
});

class MyComponent extends React.Component {
  render() {
    const {styles} = this.props;
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>{this.props.title}</h2>
      </div>
    );
  }
}

MyComponent.defaultProps = {
  color: 'green'
};

export default hoc(MyComponent);
```

```js
import Styletron from 'styletron/client';
import {StyletronProvider} from 'styletron-react';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './my-app';

const styleElement = document.body.appendChild(document.createElement('style'));

ReactDOM.render(
  <StyletronProvider styletron={new Styletron(styleElement)}/>
    <App/>
  </StyletronProvider>,
  document.getElementById('app')
);
```

[build-badge]: https://travis-ci.org/rtsao/styletron.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/styletron
[deps-badge]: https://david-dm.org/rtsao/styletron.svg
[deps-href]: https://david-dm.org/rtsao/styletron
[npm-badge]: https://badge.fury.io/js/styletron.svg
[npm-href]: https://www.npmjs.com/package/styletron
