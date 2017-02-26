# styletron-inferno

Styletron bindings for [Inferno](https://infernojs.org/).

## `Provider`

`Provider` is a component that exposes a `styletron` instance to child components on their `context`.

An instance of `styletron-server` or `styletron-client` must be passed to `Provider` as a `styletron` prop.

**Server-side Example**

```js
import StyletronServer from 'styletron-server';
import { Provider } from 'styletron-inferno';
import { renderToString } from 'inferno-server';
import express from 'express';
import App from './path/to/app';

function renderHMTL() {
  const styletron = new StyletronServer();
  const root = renderToString(
    <Provider styletron={styletron}>
      <App/>
    </Provider>
  );

  // NOTE: getStylesheetsHtml must be called after renderToString
  const stylesheets = styletron.getStylesheetsHtml('my-custom-class');
  return `
    <!DOCTYPE html>
    <html>
      <head>
        ${stylesheets}
      </head>
      <body>
        <div id="root">${root}</div>
      </body>
    </html>
  `;
}

const app = express();
app.get('/', (req, res) => {
  res.send(renderHMTL());
});
```

**Client-side Example**

```js
import { render } from 'inferno';
import { Provider } from 'styletron-inferno';
import StyletronClient from 'styletron-client';
import App from './path/to/app';

const stylesheets = document.getElementsByClassName('my-custom-class');
const styletron = new StyletronClient(stylesheets);

render((
  <Provider styletron={styletron}>
    <App/>
  </Provider>
), document.getElementsById('root'));
```

## `styled(name, styles)`

```
const StyledComponent = styled(
  name: string|function,
  styles: object|function
):VNode
```

`name` can be a `string` to create a styled _element_, or it can be a `class|function` _component_.

`styles` can be an `object` with CSS property/value pairs, or it can be a `function` that returns an `object` with CSS property/value pairs. When a `function` is passed, it is called with `props` and `context`.

```js
import { styled } from 'styletron-inferno';

const StaticStyledDiv = styled('div', {
  backgroundColor: 'lightblue',
  fontSize: '12px'
});

const DynamicStyledDiv = styled('div', (props) => ({
  backgroundColor: props.alert ? 'orange' : 'lightblue',
  fontSize: '12px'
}));

const ComposedStyledDiv = styled(StaticStyledDiv, (props) => ({
  backgroundColor: props.alert ? 'red' : 'lime',
  boxShadow: '0 2px 4px darkgray'
}));

Inferno.render((
  <div>
    <StaticStyledDiv/>
    <DynamicStyledDiv alert={true}/>
    <DynamicStyledDiv alert={false}/>
    <ComposedStyledDiv alert={true}/>
    <ComposedStyledDiv alert={false}/>
  </div>
), document.getElementsById('root'));
```

If you want a `ref` to the inner `DOMElement` or rendered `Component` instance, a special `innerRef` prop is provided. `innerRef` _must_ be a function—**string refs are not supported**.

**NOTE:** `ref` _does not work with functional components_ since they are stateless.

```js
const StyledDiv = styled('div', {
  backgroundColor: 'lightblue',
  fontSize: '12px'
});

class SomeComponent extends Component {
  componentDidMount() {
    console.log(this.styledDiv);
  }
  render() {
    return <StyledDiv innerRef={el => this.styledDiv = el}/>
  }
}
```
