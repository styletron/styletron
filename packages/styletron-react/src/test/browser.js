const test = require('tape');
const React = require('react');
const PropTypes = require('prop-types');
const ReactTestUtils = require('react-dom/test-utils');
const Styletron = require('styletron-server');

const styled = require('../styled');
const Provider = require('../provider');

test('provider provides instance and function', t => {
  const mockInstance = {};
  const mockFunc = () => true;
  const MockComponent = (props, context) => {
    t.equal(context.styletron, mockInstance, 'styletron instance provided');
    t.equal(context.injectStyle, mockFunc, 'inject style function provided');
    return React.createElement('div');
  };
  MockComponent.contextTypes = {
    styletron: PropTypes.object,
    injectStyle: PropTypes.func
  };
  ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron: mockInstance, injectStyle: mockFunc},
      React.createElement(MockComponent))
  );
  t.end();
});

test('provider overrides function', t => {
  const mockInstance = {};
  const mockFunc1 = () => true;
  const mockFunc2 = () => true;
  const MockComponent = (props, context) => {
    t.equal(context.styletron, mockInstance, 'styletron instance passed');
    t.equal(context.injectStyle, mockFunc2, 'inject style function overrided');
    return React.createElement('div');
  };
  MockComponent.contextTypes = {
    styletron: React.PropTypes.object,
    injectStyle: React.PropTypes.func
  };
  ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron: mockInstance, injectStyle: mockFunc1},
      React.createElement(Provider, {injectStyle: mockFunc2},
        React.createElement(MockComponent)))
  );
  t.end();
});

test('props passed to styled function', t => {
  t.plan(1);
  const mockProps = {
    prop1: 'foo'
  };
  const Widget = styled('div', props => {
    t.deepEqual(props, mockProps, 'props accessible in style fn');
    return {};
  });
  const styletron = new Styletron();
  ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(Widget, mockProps))
  );
});

test('styled applies styles', t => {
  const Widget = styled('div', () => {
    return {color: 'red'};
  });
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(Widget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
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
  t.equal(div.className, 'a', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('styled passes through valid props', t => {
  const Widget = styled('div', {color: 'red'});
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(Widget, {'data-bar': 'bar'}))
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
  t.equal(div.className, 'a b c', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}.b{display:block}.c{background:black}');
  t.end();
});

test('styled component', t => {
  const Widget = ({className}) => React.createElement('div', {className});
  const SuperWidget = styled(Widget, {color: 'red'});
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(SuperWidget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('innerRef works', t => {
  t.plan(1);

  const Widget = styled('button', {color: 'red'});
  const styletron = new Styletron();

  class TestComponent extends React.Component {
    componentDidMount() {
      t.ok(this.widgetInner instanceof HTMLButtonElement, 'is button');
    }

    render() {
      return React.createElement(Widget, {innerRef: c => {
        this.widgetInner = c;
      }});
    }
  }

  ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(TestComponent))
  );
});

test('innerRef not passed', t => {
  t.plan(2);

  class InnerComponent extends React.Component {
    render() {
      t.deepEqual(this.props, {
        className: 'a',
        foo: 'bar'
      }, 'props match expected');
      return <button>InnerComponent</button>;
    }
  }

  const Widget = styled(InnerComponent, {color: 'red'});
  const styletron = new Styletron();

  class TestComponent extends React.Component {
    componentDidMount() {
      t.ok(
        ReactTestUtils.isCompositeComponentWithType(this.widgetInner, InnerComponent),
        'is InnerComponent'
      );
    }

    render() {
      return React.createElement(Widget, {
        foo: 'bar',
        innerRef: c => {
          this.widgetInner = c;
        }
      });
    }
  }

  ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron},
      React.createElement(TestComponent))
  );
});
