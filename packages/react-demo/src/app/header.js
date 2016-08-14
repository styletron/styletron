const {div, createFactory} = require('react-fp');

function Header(props) {
  return div('hello world');
}

module.exports = createFactory(Header);
