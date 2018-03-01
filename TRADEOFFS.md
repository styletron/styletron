# Tradeoffs

## Style objects

Styletron is fundamentally built around the concept style objects, which are a convenient means of expressing styles in JavaScript. Style objects are typically defined via a plain object literal, whose properties and values map to CSS declarations.

```js
// A basic style object
const style = {
  backgroundColor: "red",
  fontSize: "24px"
};
```

### Style objects are plain JavaScript
Style objects are plain JavaScript values.

#### ✅ Benefits
- Object types are well supported by type checkers such as Flow. Style composition and parameterization can be type checked!
- Composition of style objects in JS is both incredibly intuitive and highly flexible
- Style colocation along with JS components is easy and natural
- General-purpose optimization tools such as Prepack will likely apply to styling code
- No extra tooling requirements for style isolation

#### ❌ Drawbacks
- IDE autocomplete of style objects is likely dependent on the use of Flow (unlike static CSS files)
- Styles in JS means reduced opportunity for build-time optimizations compared to more easily statically analyzable
- Browser debugging tools have first-class support for CSS, but not style objects
- Memory and bundle-size overhead

### Style objects lack selectors

Unlike CSS, style objects inherently lack selectors; they are essentially a standalone collection of declarations.

#### ✅ Benefits

- Don't have to think about specificity
- Portability, isolation, and encapsulation by default

#### ❌ Drawbacks

- Selectors may have utility in some use cases, particularly descendant combinators (i.e. `>` and `>>`)
