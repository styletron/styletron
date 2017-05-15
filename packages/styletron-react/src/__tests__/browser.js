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

test('props passed to styled function', t => {
  t.plan(1);
  const expected = {
    prop1: 'foo',
  };
  const Widget = styled('div', props => {
    t.deepEqual(props, expected, 'props accessible in style fn');
    return {};
  });
  const styletron = new Styletron();
  ReactTestUtils.renderIntoDocument(
    React.createElement(
      Provider,
      {styletron},
      React.createElement(Widget, expected)
    )
  );
});

test('styled applies styles', t => {
  const Widget = styled('div', () => {
    return {color: 'red'};
  });
  const styletron = new Styletron();
  const output = ReactTestUtils.renderIntoDocument(
    React.createElement(Provider, {styletron}, React.createElement(Widget))
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
    React.createElement(Provider, {styletron}, React.createElement(Widget))
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

test('styled composition', t => {
  const Widget = styled('div', {color: 'red', display: 'inline'});
  const SuperWidget = styled(Widget, {display: 'block', background: 'black'});
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

test('styled component', t => {
  const Widget = ({className}) => React.createElement('div', {className});
  const SuperWidget = styled(Widget, {color: 'red'});
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

  const Widget = styled('button', {color: 'red'});
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

  const Widget = styled(InnerComponent, {color: 'red'});
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

test('core passes props', t => {
  t.plan(2);

  class InnerComponent extends React.Component {
    render() {
      t.deepEqual(
        this.props,
        {
          styleProps: {className: 'a'},
          ownProps: {foo: 'bar'},
        },
        'matches merged props'
      );
      return <button>InnerComponent</button>;
    }
  }

  function mapStyleToProps(styletron, styleResult) {
    return {className: injectStylePrefixed(styletron, styleResult)};
  }
  function mergeProps(styleProps, ownProps) {
    t.deepEqual(styleProps, {className: 'a'}, 'matches mapped style props');
    return {
      styleProps,
      ownProps,
    };
  }
  const Widget = core(
    InnerComponent,
    {color: 'red'},
    mapStyleToProps,
    mergeProps
  );
  const styletron = new Styletron();

  ReactTestUtils.renderIntoDocument(
    React.createElement(
      Provider,
      {styletron},
      React.createElement(Widget, {
        foo: 'bar',
      })
    )
  );
});
