const {createElement} = require('react');
const ReactDOM = require('react-dom');

const App = require('./app');

ReactDOM.render(
  createElement(App, {
    path: window.location.pathname
  }),
  document.getElementById('app')
);
