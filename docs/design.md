# Design

## Decoupled architecture

Styletron is completely un-opinionated about the shape of style objects.

Styletron is made up of three key concepts:

1. Styled components
2. Drivers
3. Rendering engines

### Styled components

Components are used to compose style objects, which are then passed to a driver, which yields a corresponding class name.

### Drivers

Drivers are stateless functions take a particular object shape and produce engine method calls. This is the glue that enables portability of styled components across different rendering engines.

### Rendering engines

Rendering engines are stateful instances that have methods that can produce side effects, such as appending styles to a style sheet.

Engines are responsible for client-side rendering, SSR, and hydration.
