const http = require('http');
const connect = require('connect');
const compression = require('compression');
const serve = require('serve-static');
const path = require('path');

const StyletronServer = require('styletron-server');
const {createElement} = require('react');
const {renderToString} = require('react-dom/server');
const {StyletronProvider} = require('styletron-react');
const App = require('./app');

const server = connect();
server.use(compression());
server.use(serve(path.resolve(__dirname, '../static'), {index: false}));

const getMarkup = (bodyContent, cssContent) =>
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Styletron React Demo</title>
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
${cssContent}
</head>
<body>
<div id="app">${bodyContent}</div>
<script src="/bundle.js"></script>
</body>
</html>`;

server.use((req, res) => {
  const styletron = new StyletronServer();
  const app = createElement(StyletronProvider, {styletron}, createElement(App, {
    path: req.url
  }));
  const html = renderToString(app);
  const css = styletron.getStylesheetsHtml();
  res.end(getMarkup(html, css));
});

http.createServer(server).listen(3000, () => {
  console.log('Server listening on: http://localhost:3000');
});
