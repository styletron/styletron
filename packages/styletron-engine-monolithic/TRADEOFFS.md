# Tradeoffs

## Atomic CSS

### Benefits

* Lightweight CSS for inlining critical styles in SSR
* Efficient runtime performance, caching, and hydration

### Drawbacks

* Footguns
  * Overlapping media queries on same element
  * Mixing shorthand and longform properties on same element

## Rendering CSS with `CSSStyleSheet.insertRule()`

### Benefits

* Performance

### Drawbacks

* CSSOM bugs in Chrome DevTools
