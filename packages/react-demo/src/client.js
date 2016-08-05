const {createElement} = require('react');
const ReactDOM = require('react-dom');

const App = require('./app');

ReactDOM.render(createElement(App), document.getElementById('app'));
