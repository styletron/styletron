const {createElement} = require('react');
const ReactDOM = require('react-dom');

const StyletronClient = require('styletron-client');
const {StyletronProvider} = require('styletron-react');
const App = require('./app');

const styletron = new StyletronClient(document.getElementsByClassName('styletron'));
ReactDOM.render(
  createElement(StyletronProvider, {styletron}, createElement(App, {
    path: window.location.pathname
  })),
  document.getElementById('app')
);
