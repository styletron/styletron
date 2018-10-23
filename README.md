# [![Styletron logo](https://cdn.rawgit.com/styletron/styletron/logo/logo.svg "Styletron")](https://github.com/styletron/styletron)

[![build status][build-badge]][build-href]

Toolkit for component-oriented styling

[*Looking for v3.x docs?*](http://styletron.js.org/) | [*v3.x to v4.x migration guide*](docs/v3-migration-guide.md)

## Packages

* [`styletron-engine-atomic`](packages/styletron-engine-atomic)
* [`styletron-react`](packages/styletron-react)
* [`styletron-react-core`](packages/styletron-react-core)
* [`styletron-standard`](packages/styletron-standard)

## Design principles

1. Component-oriented
   * Stateless, single-element styled components as base styling primitive
   * Prop interfaces for conditional/dynamic styling
2. Embrace typed JavaScript
   * Composition of styles via (typed) JavaScript objects
   * No extra tooling (e.g. Webpack loaders, Babel plugins, etc.)
3. Portability and flexibility
   * Portability of styled components across different rendering engines (e.g. atomic CSS)
   * Core implementation agnostic of shape of style objects

See [docs/design.md](docs/design.md) for more details.

## Getting Started

### Defining styled components

```js
import {styled} from "styletron-react";

// Create a styled component by passing an element name and a style object
const RedAnchor = styled("a", {color: "red"});

<RedAnchor href="/foo">Hello</RedAnchor>;

// Or pass a function that takes props and returns a style object
const Panel = styled("div", props => {
  return {backgroundColor: props.$alert ? "orange" : "lightblue"};
});

<Panel $alert>Hello!</Panel>;
```

See [packages/styletron-react](packages/styletron-react/README.md) for full documentation

### Composing styled components

`styletron-react` also provides composition helpers such as [`withStyle`](packages/styletron-react#withstyle) to build styled components from existing styled components.

```js
import {withStyle} from "styletron-react";

const FancyAnchor = withStyle(RedAnchor, {fontFamily: "cursive"});

<FancyAnchor href="/foo">Hello</FancyAnchor>;

const DeluxePanel = withStyle(Panel, props => ({
  backgroundColor: props.alert ? "firebrick" : "rebeccapurple",
  color: "white",
  boxShadow: "3px 3px 3px darkgray"
}));

<DeluxePanel>Bonjour Monde</DeluxePanel>;
```

See [packages/styletron-react](packages/styletron-react/README.md) for full documentation

### Providing a rendering engine

Styled components require a rendering engine to perform side effects (such as rendering styles to the page).

```js
import {Provider as StyletronProvider} from "styletron-react";
import {Client as Styletron} from "styletron-engine-atomic";

// 1. Create a client engine instance
const engine = new Styletron();

// 2. Provide the engine to the app
React.render(
  <StyletronProvider value={engine}>
    <App />
  </StyletronProvider>
);
```

### Server-side rendering

#### Extracting server-rendered styles

```js
import {Provider as StyletronProvider} from "styletron-react";
import {Server as Styletron} from "styletron-engine-atomic";

// 1. Create a server engine instance
const engine = new Styletron();

// 2. Provide the engine to the app
const html = React.render(
  <StyletronProvider value={engine}>
    <App />
  </StyletronProvider>
);

// 3. Extract critical styles after SSR
const styles = engine.getStylesheetsHtml();
// → "<style ..."
```

#### Hydrating server-rendered styles

When server-side rendering, pass the server-rendered styled elements to the client engine constructor to hydrate the client-side cache. This prevents these styles from being re-rendered and avoids potential style conflicts.

```diff
import {Provider as StyletronProvider} from "styletron-react";
import {Client as Styletron} from "styletron-engine-atomic";

// create an engine instance
- const engine = new Styletron();
+ const engine = new Styletron({hydrate: document.getElementsByClassName("_styletron_hydrate_")});

// wrap root component with provider
React.render(
  <StyletronProvider value={engine}>
    <App/>
  </StyletronProvider>
);
```

See [packages/styletron-engine-atomic](packages/styletron-engine-atomic/README.md) for full documentation.

## Tradeoffs

See [TRADEOFFS.md](TRADEOFFS.md)

[build-badge]: https://travis-ci.org/styletron/styletron.svg?branch=master
[build-href]: https://travis-ci.org/styletron/styletron
