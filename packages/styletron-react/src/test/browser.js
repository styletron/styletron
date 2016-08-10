const test = require('tape');
const React = require('react');
const ReactTestUtils = require('react-addons-test-utils');
const Styletron = require('styletron-server');

const connectToStyles = require('../connect-to-styles');
const Provider = require('../provider');

test('provider provides instance', t => {
  const mockInstance = {};
  const MockComponent = (props, context) => {
    t.equal(context.styletron, mockInstance, 'styletron instance override provided');
    return React.createElement('div');
  };
  MockComponent.contextTypes = {styletron: React.PropTypes.object};
  ReactTestUtils.renderIntoDocument(React.createElement(Provider, {
    styletron: mockInstance
  }, React.createElement(MockComponent)));
  t.end();
});

test('connectToStyles works', t => {
  t.plan(3);
  const expectedProps = {prop1: 'red'};
  const hoc = connectToStyles(props => {
    t.deepEqual(props, expectedProps, 'props accessible in hoc');
    return {style1: {color: 'red'}};
  });
  const MockComponent = props => {
    t.deepEqual(props.styles, {style1: ' c0'}, 'style props passed');
    return React.createElement('div');
  }
  const Wrapped = hoc(MockComponent);
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(Wrapped, expectedProps))
  );
  t.equal(styletron.getCss(), '.c0{color:red}');
});
