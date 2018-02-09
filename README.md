# [![Styletron logo](https://cdn.rawgit.com/rtsao/styletron/logo/logo.svg "Styletron")](https://github.com/rtsao/styletron)

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

Toolkit for component-oriented styling

## Design principles

TODO

## Getting Started


### Defining styled components

```js
import {styled} from "styletron-react";


```

See [packages/styletron-react](packages/styletron-react/README.md) for full documentation

### Composing styled components

```js
import {withStyle} from "styletron-react";

```

See [packages/styletron-react](packages/styletron-react/README.md) for full documentation

### Providing a rendering engine

Styled components require a rendering engine to perform side effects.

```js
import {Provider as StyletronProvider} from "styletron-react";
import {Client as Styletron} from "styletron-engine-atomic";

// create an engine instance
const engine = new Styletron();

// wrap root component with provider
React.render(
  <StyletronProvider value={engine}>
    <App/>
  </StyletronProvider>
);
```

### Server-side rendering

#### Extracting server-rendered styles

```js
import {Provider as StyletronProvider} from "styletron-react";
import {Server as StyletronServer} from "styletron-engine-atomic";

// create an engine instance
const engine = new StyletronServer();

// wrap root component with provider
React.render(
  <StyletronProvider value={engine}>
    <App/>
  </StyletronProvider>
);

const styles = engine.getStyleSheetsHTML();
```

#### Hydrating server-rendered styles

```diff
import {Provider as StyletronProvider} from "styletron-react";
import {Client as Styletron} from "styletron-engine-atomic";

// create an engine instance
- const engine = new Styletron();
+ const engine = new Styletron(document.getElementsByClassName('_styletron_hydrate'));

// wrap root component with provider
React.render(
  <StyletronProvider value={engine}>
    <App/>
  </StyletronProvider>
);
```

See [packages/styletron-engine-atomic](packages/styletron-engine-atomic/README.md) for full documentation.

## Architecture

See [docs/architecture.md](docs/architecture.md)


[build-badge]: https://travis-ci.org/rtsao/styletron.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/styletron
[deps-badge]: https://david-dm.org/rtsao/styletron.svg
[deps-href]: https://david-dm.org/rtsao/styletron
[npm-badge]: https://badge.fury.io/js/styletron.svg
[npm-href]: https://www.npmjs.com/package/styletron
