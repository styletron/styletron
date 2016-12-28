# [![Styletron logo](https://cdn.rawgit.com/rtsao/styletron/logo/logo.svg "Styletron")](https://github.com/rtsao/styletron)

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

Universal, high-performance JavaScript styles.

## What is Styletron?

Styletron is a universal CSS-in-JS engine built from the ground up for high-performance. Features include:

#### Advanced critical rendering path optimization of server-rendered pages
- Dynamic generation of inlineable critical stylesheets with minimum possible size and parse times
  - Automatic generation of maximally compressed "atomic" critical CSS via declaration-level deduplication
  - Automatic declaration-level dead CSS elimination - only *actually used* declarations get included in output
- Native media query and pseudo selector support for full critical CSS without JavaScript

#### Efficient dynamic client-side styles
- Hyper-granular memoization to avoid making unnecessary modifications to stylesheet
- Fast cache hydration of server-rendered styles to prevent re-rendering of server-rendered styles
- Use of `CSSStyleSheet` rule injection ensuring *only* new styles get parsed

### [Check out the introductory blog post to learn more](https://ryantsao.com/blog/virtual-css-with-styletron)

## For framework and library authors

The core Styletron module is a small, generic utility that is entirely independent of React so it can be integrated into virtually any web app. Additionally, many CSS-in-JS interfaces can be implemented with Styletron as a result of its low-level, unopinionated API.

#### Core API overview
```js
import Styletron from 'styletron'; // either styletron-server or styletron-client (package.json browser field)
const styletron = new Styletron();
styletron.injectDeclaration({prop: 'color', val: 'red'});
// → 'a'
styletron.injectDeclaration({prop: 'color', val: 'red', media: '(min-width: 800px)'});
// → 'b'
styletron.injectDeclaration({prop: 'color', val: 'blue'});
// → 'c'
```
#### Injecting style objects
The styletron-utils packages includes some convenient helper functions that make working with the core API easier.
```js
import {injectStyle} from 'styletron-utils';
injectStyle(styletron, {
  color: 'red',
  display: 'inline-block'
});
// → 'a d'
injectStyle(styletron, {
  color: 'red',
  fontSize: '1.6em'
});
// → 'a e'
```

#### Pseudo classes and media queries
The object literal syntax supported by Styletron also supports pseudo classes and media queries.
```jsx
import {styled} from 'styletron-react';

const Button = styled('button', (props) => ({
  paddingLeft: '80px',
  '@media (max-width: 768px)': {
    paddingLeft: '40px'
  },
  ':hover': {
    backgroundColor: 'papayawhip'
  }
}));

<Button>Bonjour Monde</Button>
```

**[Full API documentation for Styletron is available at http://styletron.js.org](http://styletron.js.org)**

## Using Styletron with React

**[Live Demo](http://www.webpackbin.com/N12fnIW7G)**

The `styletron-react` package provides a convenient way to use Styletron in React applications. The API is inspired by the wonderful [styled-components library](https://github.com/styled-components/styled-components), except with style objects instead of template strings.

**Note: this is just one high-level interface, many others are possible with Styletron.**

### Creating styled element components

#### Static styles
```jsx
import {styled} from 'styletron-react';

const Panel = styled('div', {
  backgroundColor: 'lightblue',
  fontSize: '12px'
});

<Panel>Hello World</Panel>
```

#### Using props and context in styles
```jsx
import {styled} from 'styletron-react';

const Panel = styled('div', (props) => ({
  backgroundColor: props.alert ? 'orange' : 'lightblue',
  fontSize: '12px'
}));

<Panel alert>Danger!</Panel>
```

#### Extending other styled element components
```jsx
import {styled} from 'styletron-react';

const DeluxePanel = styled(Panel, (props) => ({
  backgroundColor: props.alert ? 'firebrick' : 'rebeccapurple',
  color: 'white',
  boxShadow: '3px 3px 3px darkgray'
}));

<DeluxePanel>Bonjour Monde</DeluxePanel>
```

### App integration and server-side rendering

#### Client-side rendering
```jsx
import Styletron from 'styletron-client';
import {StyletronProvider} from 'styletron-react';

const styleElements = document.getElementsByClassName('_styletron_hydrate_');

ReactDOM.render(
  <StyletronProvider styletron={new Styletron(styleElements)}>
    <App/>
  </StyletronProvider>,
  document.getElementById('app')
);
```

#### Server-side rendering

```jsx
import Styletron from 'styletron-server';
import {StyletronProvider} from 'styletron-react';

function render() {
  const styletron = new Styletron();
  const appMarkup = ReactDOM.renderToString(
    <StyletronProvider styletron={styletron}>
      <App/>
    </StyletronProvider>
  );

  const stylesForHead = styletron.getStylesheetsHtml();
  
  return `<html><head>${stylesForHead}</head><body>${appMarkup}</body></html>`;
}

```

[build-badge]: https://travis-ci.org/rtsao/styletron.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/styletron
[deps-badge]: https://david-dm.org/rtsao/styletron.svg
[deps-href]: https://david-dm.org/rtsao/styletron
[npm-badge]: https://badge.fury.io/js/styletron.svg
[npm-href]: https://www.npmjs.com/package/styletron
