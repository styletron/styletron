# babel-plugin-transform-styletron-display-name

**Check our documentation at [styletron.org](https://www.styletron.org)**.

> Adds displayName to styletron-react components.

before

```js
const Foo = styled("div", {
  color: "red"
});
const Bar = styled("div", {
  color: "red"
});
```

after

```js
Foo = styled("div", {
  color: "red"
});
Foo.displayName = "Foo";
Bar = styled("div", {
  color: "red"
});
Bar.displayName = "Bar";
```

## Install

Using npm:

```sh
npm install --save-dev babel-plugin-transform-styletron-display-name
```

or using yarn:

```sh
yarn add babel-plugin-transform-styletron-display-name --dev
```
