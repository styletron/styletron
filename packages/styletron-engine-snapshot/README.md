# styletron-engine-snapshot

[![npm version][npm-badge]][npm-href] [![dependencies status][deps-badge]][deps-href]

Implementation of the [`styletron-standard`](../styletron-standard) engine interface useful when testing with [jest snapshots](https://jestjs.io/docs/en/snapshot-testing).

**SHOULD NOT BE USED IN PRODUCTION**

## Installation

```sh
yarn add --dev styletron-engine-snapshot
```

## Reasoning

Snapshots generated with `styletron-engine-atomic` have 2 main issues

1. non-debuggable classNames in snapshots (`"a b c aa ab ac ae"`)

2. className generation is dependent on internal engine state. If you create a new component,
it might break an unrelated snapshot since that component rendering shifts the
generation for the old snapshot.

The package provides a *deterministic* engine that simply returns a `JSON.stringify`-ed version of the style object (with alpha-sorted keys).
A snapshot should not fail **UNLESS** a style applied to the component changes (which you want).
It also makes it easier to detect what exactly changed in the css in the snapshot since we actually now render all of the css values (we are essentially almost rendering the styles inline).

### Downsides of This Package/Approach

1. The engine generates invalid css class names (as they are essentially JSON)
2. Styles are **NOT ACTUALLY APPLIED**, so if you have existing tests that check/rely on computed styles, they no longer work.

### Future Improvements

There is a path forward that can fix the downsides mentioned above.
We can modify the engine into creating valid class names + style declarations **PER STYLE**, similar to what https://acss.io/ does.
That would make it so that snapshots still diff nicely, while actually applying styles as well.


