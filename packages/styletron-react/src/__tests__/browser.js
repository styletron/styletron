/* eslint-env browser */

import test from 'tape';
import React from 'react';
import PropTypes from 'prop-types';
import ReactTestUtils from 'react-dom/test-utils';
import Styletron from 'styletron-server';
import {injectStylePrefixed} from 'styletron-utils';
import core from '../core';
import styled from '../styled';
import Provider from '../provider';

function strictMapStyleToProps(styletron, styleResult) {
  return {className: injectStylePrefixed(styletron, styleResult)};
}

test('provider provides instance', t => {
  const mockInstance = {};
  const MockComponent = (props, context) => {
    t.equal(
      context.styletron,
      mockInstance,
      'styletron instance override provided'
    );
    return React.createElement('div');
  };
  MockComponent.contextTypes = {styletron: PropTypes.object};
  ReactTestUtils.renderIntoDocument(
    React.createElement(
      Provider,
      {
        styletron: mockInstance,
      },
      React.createElement(MockComponent)
    )
  );
  t.end();
});

test('props passed to core function', t => {
  t.plan(1);
  const expected = {
    prop1: 'foo',
  };
  const Widget = core(
    'div',
    props => {
      t.deepEqual(props, expected, 'props accessible in core fn');
      return {};
    },
    strictMapStyleToProps
  );
  const styletron = new Styletron();
  ReactTestUtils.renderIntoDocument(
    React.createElement(
      Provider,
      {styletron},
      React.createElement(Widget, expected)
    )
  );
});

test('core applies styles', t => {
  const Widget = core(
    'div',
    () => {
      return {color: 'red'};
    },
    strictMapStyleToProps
  );
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron}, React.createElement(Widget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('core applies static styles', t => {
  const Widget = core('div', {color: 'red'}, strictMapStyleToProps);
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron}, React.createElement(Widget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('core passes through valid props', t => {
  const Widget = core('div', {color: 'red'}, strictMapStyleToProps);
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(
      Provider,
      {styletron},
      React.createElement(Widget, {
        'data-bar': 'bar',
      })
    )
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(
    div.getAttribute('data-bar'),
    'bar',
    'valid attribute prop passed through'
  );
  t.end();
});

test('core composition', t => {
  const Widget = core(
    'div',
    {color: 'red', display: 'inline'},
    strictMapStyleToProps
  );
  const SuperWidget = core(
    Widget,
    {display: 'block', background: 'black'},
    strictMapStyleToProps
  );
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron}, React.createElement(SuperWidget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a b c', 'matches expected styletron classes');
  t.equal(
    styletron.getCss(),
    '.a{color:red}.b{display:block}.c{background:black}'
  );
  t.end();
});

test('core component', t => {
  const Widget = ({className}) => React.createElement('div', {className});
  const SuperWidget = core(Widget, {color: 'red'}, strictMapStyleToProps);
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron}, React.createElement(SuperWidget))
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('innerRef works', t => {
  t.plan(1);

  const Widget = core('button', {color: 'red'}, strictMapStyleToProps);
  const styletron = new Styletron();

  class TestComponent extends React.Component {
    componentDidMount() {
      t.ok(this.widgetInner instanceof HTMLButtonElement, 'is button');
    }

    render() {
      return React.createElement(Widget, {
        innerRef: c => {
          this.widgetInner = c;
        },
      });
    }
  }

  ReactTestUtils.renderIntoDocument(
    React.createElement(
      Provider,
      {styletron},
      React.createElement(TestComponent)
    )
  );
});

test('innerRef not passed', t => {
  t.plan(2);

  class InnerComponent extends React.Component {
    render() {
      t.deepEqual(
        this.props,
        {
          className: 'a',
          foo: 'bar',
        },
        'props match expected'
      );
      return <button>InnerComponent</button>;
    }
  }

  const Widget = core(InnerComponent, {color: 'red'}, strictMapStyleToProps);
  const styletron = new Styletron();

  class TestComponent extends React.Component {
    componentDidMount() {
      t.ok(
        ReactTestUtils.isCompositeComponentWithType(
          this.widgetInner,
          InnerComponent
        ),
        'is InnerComponent'
      );
    }

    render() {
      return React.createElement(Widget, {
        foo: 'bar',
        innerRef: c => {
          this.widgetInner = c;
        },
      });
    }
  }

  ReactTestUtils.renderIntoDocument(
    React.createElement(
      Provider,
      {styletron},
      React.createElement(TestComponent)
    )
  );
});

test('core merges props', t => {
  t.plan(1);

  class InnerComponent extends React.Component {
    render() {
      t.deepEqual(
        this.props,
        {
          foo: 'foo',
          bar: 'bar',
          className: 'a',
        },
        'matches merged props'
      );
      return <button>InnerComponent</button>;
    }
  }

  function mergeProps(styleProps, ownProps) {
    return Object.assign({bar: 'bar'}, styleProps, ownProps);
  }
  const Widget = core(
    InnerComponent,
    {color: 'red'},
    strictMapStyleToProps,
    mergeProps
  );
  const styletron = new Styletron();

  ReactTestUtils.renderIntoDocument(
    React.createElement(
      Provider,
      {styletron},
      React.createElement(Widget, {
        foo: 'foo',
      })
    )
  );
});

test('styled merges class name prop', t => {
  const Widget = styled('div', {color: 'red'});
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(
      Provider,
      {styletron},
      React.createElement(Widget, {className: 'foo'})
    )
  );
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'foo a', 'matches expected classes');
  t.end();
});
