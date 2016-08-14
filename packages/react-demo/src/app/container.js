const {div, createFactory} = require('react-fp');
const {connectToStyles} = require('styletron-react');

function Container({styles, children}) {
  return div({className: styles.container}, children);
}

Container.defaultProps = {
  color: 'green'
};

const hoc = connectToStyles(props => {
  return {
    container: {
      margin: '0px auto',
      width: '640px',
      padding: `${props.size}px`,
      background: props.color
    }
  }
});

module.exports = createFactory(hoc(Container));
