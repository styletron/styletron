const { styled } = require('styletron-react');

const Container = styled('div', props => {
  return {
    margin: '0px auto',
    width: '640px',
    padding: `${props.size}px`,
    background: props.color,
  };
});

Container.defaultProps = {
  color: 'green',
};

module.exports = Container;
