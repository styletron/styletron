const test = require('tape');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-addons-test-utils');
const Styletron = require('styletron-server');

const styled = require('../styled');
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

test('props passed to styled function', t => {
  t.plan(1);
  const props = {
    prop1: 'foo'
  };
  const Widget = styled('div', props => {
    t.deepEqual(props, props, 'props accessible in style fn');
    return {};
  });
  const styletron = new Styletron();
  ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(Widget, props))
  );
});

test('styled applies styles', t => {
  const Widget = styled('div', props => {
    return {color: 'red'};
  });
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(Widget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, ' c0', 'styletron classes');
  t.equal(styletron.getCss(), '.c0{color:red}');
  t.end();
});

test('styled applies static styles', t => {
  const Widget = styled('div', {color: 'red'});
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(Widget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, ' c0', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.c0{color:red}');
  t.end();
});

test('styled passes through valid props', t => {
  const Widget = styled('div', {color: 'red'});
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(Widget, {
        'data-bar': 'bar'
      }))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.getAttribute('data-bar'), 'bar', 'valid attribute prop passed through');
  t.end();
});

test('styled composition', t => {
  const Widget = styled('div', {color: 'red', 'display': 'inline'});
  const SuperWidget = styled(Widget, {display: 'block', background: 'black'});
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(SuperWidget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, ' c0 c1 c2', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.c0{color:red}.c1{display:block}.c2{background:black}');
  t.end();
});
