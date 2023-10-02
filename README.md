# [![Styletron logo](https://cdn.rawgit.com/styletron/styletron/logo/logo.svg "Styletron")](https://github.com/styletron/styletron)

![test workflow](https://github.com/styletron/styletron/actions/workflows/test.yml/badge.svg)

Styletron is an universal toolkit for component-oriented styling. It falls into the CSS in JS category. Styletron works great with React but can be used with other frameworks or plain JS as well.

**Go to our documentation at [styletron.org](https://www.styletron.org)**!

## Usage with React

```js
import { styled } from "styletron-react";

// Create a styled component by passing an element name and a style object
const RedAnchor = styled("a", { color: "red" });
<RedAnchor href="/foo">Hello</RedAnchor>;

// Or pass a function that takes props and returns a style object
const Panel = styled("div", props => {
  return { backgroundColor: props.$alert ? "orange" : "lightblue" };
});
<Panel $alert>Hello</Panel>;

// Do you prefer hooks?
import { useStyletron } from "styletron-react";
const [css] = useStyletron();
<a className={css({ color: "red" })} href="/foo">
  Hello
</a>;
```

## Getting Started

Check [the documentation](https://www.styletron.org/getting-started/) to setup Styletron with Next.js, Gatsby or plain React/JS apps.

[_Looking for v3.x docs?_](https://www.styletron.org/v3/) | [_v3.x to v4.x migration guide_](docs/v3-migration-guide.md)

## Design principles

1.  Component-oriented
    - Stateless, single-element styled components as base styling primitive
    - Prop interfaces for conditional/dynamic styling
2.  Embrace typed JavaScript
    - Composition of styles via (typed) JavaScript objects
    - No extra tooling (e.g. Webpack loaders, Babel plugins, etc.)
3.  Portability and flexibility
    - Portability of styled components across different rendering engines (e.g. atomic CSS)

See [docs/design.md](docs/design.md) for more details.

## Packages

- [`styletron-engine-atomic`](packages/styletron-engine-atomic)
- [`styletron-react`](packages/styletron-react)
- [`styletron-standard`](packages/styletron-standard)
