const http = require('http');
const connect = require('connect');
const compression = require('compression');
const static = require('serve-static');

const {createElement} = require('react');
const {renderToString} = require('react-dom/server');
const App = require('./app');

const server = connect();
server.use(compression());
server.use(static('static', {index: false}));

const getMarkup = (bodyContent) =>
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Styletron React Demo</title>
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
</head>
<body>
<div id="app">${bodyContent}</div>
<script src="/bundle.js"></script>
</body>
</html>`;

server.use((req, res) => {
  const render = renderToString(createElement(App));
  res.end(getMarkup(render));
});

http.createServer(server).listen(3000, () => {
  console.log('Server listening on: http://localhost:3000');
});
