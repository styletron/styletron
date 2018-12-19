# Child and descendant combinators in Styletron

Styletron supports pseudo selectors such as `:hover`, but what about using child or descendant combinators in conjunction with `:hover`?

The common use case for this is styling a child element based on the hover state of an ancestor element.

In vanilla HTML and CSS, this would look something like:
```html
<style>
  #child {
    color: blue;
  }

  #parent:hover > #child {
    color: red;
  }
</style>

<div id="parent">
  Hover me!
  <div id="child">child</div>
</div>
```

## Usage with Styletron

Style objects neatly describe the style of a particular element. Even though media queries and pseudo selectors aren't part of vanilla inline style objects, they fit neatly into the concept of style objects and are hence supported in Styletron.

Descendant combinators such as `.parent > .child` or `.ancestor .descendant`/`.ancestor >> .descendant` have no clear analogue in a style object representation of a single element. As a result, it is better to manage hover state with JS and then use that state to control styles via props.

### Using React Hooks

Managing hover state is less burdensome than you would think. For example, using [`useHover` from https://usehooks.com](https://usehooks.com/#useHover):

```js
function App() {
  const [hoverRef, isHovered] = useHover();
  return (
    <div ref={hoverRef}>
      Hover me!
      <Button highlighted={isHovered}>Click me</Button>
    </div>
  );
}
```
