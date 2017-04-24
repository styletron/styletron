import test from 'tape';
import Preact from 'preact';
import Styletron from 'styletron-server';
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
    return Preact.h('div');
  };
  renderIntoDocument(
    Preact.h(
      Provider,
      {
        styletron: mockInstance,
      },
      Preact.h(MockComponent)
    )
  );
  t.end();
});

test('props passed to styled function', t => {
  t.plan(1);
  const props = {
    prop1: 'foo',
  };
  const Widget = styled('div', props => {
    t.deepEqual(props, props, 'props accessible in style fn');
    return {};
  });
  const styletron = new Styletron();
  renderIntoDocument(Preact.h(Provider, {styletron}, Preact.h(Widget, props)));
});

test('styled applies styles', t => {
  const Widget = styled('div', () => {
    return {color: 'red'};
  });
  const styletron = new Styletron();
  const output = renderIntoDocument(
    Preact.h(Provider, {styletron}, Preact.h(Widget))
  );
  const div = findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('styled applies static styles', t => {
  const Widget = styled('div', {color: 'red'});
  const styletron = new Styletron();
  const output = renderIntoDocument(
    Preact.h(Provider, {styletron}, Preact.h(Widget))
  );
  const div = findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('styled passes through valid props', t => {
  const Widget = styled('div', {color: 'red'});
  const styletron = new Styletron();
  const output = renderIntoDocument(
    Preact.h(
      Provider,
      {styletron},
      Preact.h(Widget, {
        'data-bar': 'bar',
      })
    )
  );
  const div = findRenderedDOMComponentWithTag(output, 'div');
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
  const output = renderIntoDocument(
    Preact.h(Provider, {styletron}, Preact.h(SuperWidget))
  );
  const div = findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a b c', 'matches expected styletron classes');
  t.equal(
    styletron.getCss(),
    '.a{color:red}.b{display:block}.c{background:black}'
  );
  t.end();
});

test('styled component', t => {
  const Widget = ({className}) => Preact.h('div', {className});
  const SuperWidget = styled(Widget, {color: 'red'});
  const styletron = new Styletron();
  const output = renderIntoDocument(
    Preact.h(Provider, {styletron}, Preact.h(SuperWidget))
  );
  const div = findRenderedDOMComponentWithTag(output, 'div');
  t.equal(div.className, 'a', 'matches expected styletron classes');
  t.equal(styletron.getCss(), '.a{color:red}');
  t.end();
});

test('innerRef works', t => {
  t.plan(1);

  const Widget = styled('button', {color: 'red'});
  const styletron = new Styletron();

  class TestComponent extends Preact.Component {
    componentDidMount() {
      t.ok(this.widgetInner instanceof HTMLButtonElement, 'is button');
    }

    render() {
      return Preact.h(Widget, {
        innerRef: c => {
          this.widgetInner = c;
        },
      });
    }
  }

  renderIntoDocument(Preact.h(Provider, {styletron}, Preact.h(TestComponent)));
});

test('innerRef not passed', t => {
  t.plan(3);

  class InnerComponent extends Preact.Component {
    render() {
      t.equal(this.props.className, 'a', 'classname passed in');
      t.equal(this.props.foo, 'bar', 'props passed through');
      return Preact.h('button', null, 'InnerComponent');
    }
  }

  const Widget = styled(InnerComponent, {color: 'red'});
  const styletron = new Styletron();

  class TestComponent extends Preact.Component {
    componentDidMount() {
      t.ok(
        isCompositeComponentWithType(this.widgetInner, InnerComponent),
        'is InnerComponent'
      );
    }

    render() {
      return Preact.h(Widget, {
        foo: 'bar',
        innerRef: c => {
          this.widgetInner = c;
        },
      });
    }
  }

  renderIntoDocument(Preact.h(Provider, {styletron}, Preact.h(TestComponent)));
});

function renderIntoDocument(tree) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  Preact.render(tree, root);
  return root;
}

function findRenderedDOMComponentWithTag(element, tag) {
  return element.querySelector(tag);
}

function isCompositeComponentWithType(component, type) {
  return component instanceof type;
}
