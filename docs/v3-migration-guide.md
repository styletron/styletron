# Styletron v3 to v4 Migration Guide

## Automated codemods
For convenience, there are automated codemod scripts for migrating:
```
npm i --no-package-lock --no-save styletron-codemods
npx babel-codemod --plugin styletron-codemods/transform-styled-composition src/**/**.js
npx babel-codemod --plugin styletron-codemods/transform-provider src/**/**.js
npx babel-codemod --plugin transform-styletron-client src/**/**.js
npx babel-codemod --plugin transform-styletron-server src/**/**.js
```

## Replacing browser and server Styletron instances

The atomic rendering engine is now in a single package instead of being split into server/client packages. This both ensures that versions of coupled server and client code are in sync and opens the door for different rendering engines.

### Updating client-side instance

The constructor has been changed to a single argument to match the server-side interface and making it easier to provide configuration without hydration.

```diff
- import StyletronClient from "styletron-client";
+ import {Client as StyletronClient} from "styletron-engine-atomic";

const ssrStyles = document.getElementsByClassName('_styletron_hydrate');

- const instance = new StyletronClient(ssrStyles, {prefix: '_'});
+ const instance = new StyletronClient({hydrate: ssrStyles, prefix: '_'});

```

### Updating server-side instance
```diff
- import StyletronServer from "styletron-server";
+ import {Server as StyletronServer} from "styletron-engine-atomic";

const instance = new StyletronServer({prefix: '_'});
```

## Updating the Styletron provider

The Styletron provider has been updated to match the [new React 16 context API](https://github.com/facebook/react/pull/11818).

```diff
- import {StyletronProvider} from "styletron-react";
+ import {Provider as StyletronProvider} from "styletron-react";

const app = (
-  <StyletronProvider styletron={instance}>
+  <StyletronProvider value={instance}>
    <App />
  </StyletronProvider>
);

```

## Updating styled components

The API for styled components is largely the same, but with a few minor changes.

### `innerRef` to `$ref`

```diff
- <MyStyledComponent innerRef="someStringRef" />;
+ <MyStyledComponent $ref="someStringRef" />;
```


### `$`-prefixed props

To avoid warnings regarding unknown props, with `styletron-react` v3, props used for styling only could be namespaced under `props.styleProps`, which would automatically get removed. Unfortunately, this makes using these props in JSX much less convenient. Styletron v4 has a new convention where any props starting with a dollar sign (`$`) will never be passed through. So for any styling-only props, you can simply use a `$` prefix.

```diff

const Foo = styled("div", props => ({
-  color: props.styleProps.danger ? "red" : "blue"
+  color: props.$danger ? "red" : "blue"
}));

- <Foo styleProps={{danger: true}} />;
+ <Foo $danger />;

```

### Composing styled components

Before, styled components could be composed with one another using the base `styled` function. Styletron v4 provivdes multiple, explicit composition HOCs including `withStyle` (equivalent to the old shallow merge behavior of `styled`), `withStyleDeep`, and `withTransform`.

Now there is no ambiguity with `styled` whether it is composition from an existing styled component or a new styled component is being created based on a regular component.

```diff

- import {styled} from "styletron-react";
+ import {styled, withStyle} from "styletron-react";

const Foo = styled("div", {color: "red"});

- const Bar = styled(Foo, {background: "green"});
+ const Bar = withStyle(Foo, {background: "green"});
```
