const test = require('tape');
const createElement = require('inferno-create-element');
const InfernoComponent = require('inferno-component');
const InfernoTestUtils = require('inferno-test-utils');
const StyletronServer = require('styletron-server');
const Provider = require('../provider');
const styled = require('../styled');

test('Provider provides Styletron instance on component context', (t) => {
  t.plan(1);
  const mockStyletronInstance = {};

  const MockComponent = (props, context) => {
    t.equal(context.styletron, mockStyletronInstance,
      'Styletron instance on component context');
    return createElement('div');
  };

  InfernoTestUtils.renderIntoDocument(
    createElement(Provider, {
      styletron: mockStyletronInstance
    }, createElement(MockComponent))
  );
});

test('props passed to styled function', (t) => {
  t.plan(1);
  const mockProps = {foo: 'bar'};
  const styletron = new StyletronServer();

  const StyledComponent = styled('div', (props) => {
    t.deepEqual(props, mockProps, 'props accessible in styled function');
    return {};
  });

  InfernoTestUtils.renderIntoDocument(
    createElement(Provider, {styletron},
      createElement(StyledComponent, mockProps)
    )
  );
});

test('styled applies styles object', (t) => {
  const styletron = new StyletronServer();

  const StyledComponent = styled('div', {color: 'red'});

  const result = InfernoTestUtils.renderIntoDocument(
    createElement(Provider, {styletron},
      createElement(StyledComponent)
    )
  );

  const element = InfernoTestUtils.findRenderedDOMElementWithTag(result, 'div');

  t.equal(element.className, 'a', 'matches expected className');
  t.equal(styletron.getCss(), '.a{color:red}', 'matches expected CSS');
  t.end();
});

test('styled applies styles function', (t) => {
  const styletron = new StyletronServer();

  const StyledComponent = styled('div', (props) => ({
    [props.property]: props.value
  }));

  const result = InfernoTestUtils.renderIntoDocument(
    createElement(Provider, {styletron},
      createElement(StyledComponent, {
        property: 'color',
        value: 'red'
      })
    )
  );

  const element = InfernoTestUtils.findRenderedDOMElementWithTag(result, 'div');

  t.equal(element.className, 'a', 'matches expected className');
  t.equal(styletron.getCss(), '.a{color:red}', 'matches expected CSS');
  t.end();
});

test('styled passes through valid props', (t) => {
  const styletron = new StyletronServer();

  const StyledComponent = styled('div', {color: 'red'});

  const result = InfernoTestUtils.renderIntoDocument(
    createElement(Provider, {styletron},
      createElement(StyledComponent, {
        'data-bar': 'bar'
      })
    )
  );

  const element = InfernoTestUtils.findRenderedDOMElementWithTag(result, 'div');

  t.equal(element.getAttribute('data-bar'), 'bar', 'valid attribute prop passed through');
  t.end();
});

test('styled composition', (t) => {
  const styletron = new StyletronServer();

  const StyledComponent = styled('div', {
    display: 'inline',   // .a
    color: 'red'         // .b
  });

  const SuperStyledComponent = styled(StyledComponent, {
    background: 'black', // .c
    display: 'block'     // .a (replaced)
  });

  const result = InfernoTestUtils.renderIntoDocument(
    createElement(Provider, {styletron},
      createElement(SuperStyledComponent)
    )
  );

  const element = InfernoTestUtils.findRenderedDOMElementWithTag(result, 'div');

  t.equal(element.className, 'a b c', 'matches expected className');
  t.equal(styletron.getCss(), '.a{display:block}.b{color:red}.c{background:black}', 'matches expected CSS');
  t.end();
});

test('styled component', (t) => {
  const styletron = new StyletronServer();

  const BaseComponent = (props) => createElement('div', props);
  const StyledComponent = styled(BaseComponent, {color: 'red'});

  const result = InfernoTestUtils.renderIntoDocument(
    createElement(Provider, {styletron},
      createElement(StyledComponent)
    )
  );

  const element = InfernoTestUtils.findRenderedDOMElementWithTag(result, 'div');

  t.equal(element.className, 'a', 'matches expected className');
  t.equal(styletron.getCss(), '.a{color:red}', 'matches expected CSS');
  t.end();
});

test('innerRef works', (t) => {
  t.plan(3);

  const styletron = new StyletronServer();

  const StyledComponent = styled('div', {color: 'red'});

  class ClassComponent extends InfernoComponent {
    componentDidMount() {
      t.ok(this.styledDiv instanceof HTMLDivElement, 'element ref passed');
    }
    render() {
      return createElement(StyledComponent, {
        innerRef: styledDiv => {
          t.ok(styledDiv instanceof HTMLDivElement, 'element ref passed');
          t.equal(styledDiv.className, 'a', 'matches expected className');
          this.styledDiv = styledDiv
        }
      });
    }
  }

  InfernoTestUtils.renderIntoDocument(
    createElement(Provider, {styletron},
      createElement(ClassComponent)
    )
  );
});

test('innerRef not passed', (t) => {
  t.plan(3);
  const styletron = new StyletronServer();

  class InnerComponent extends InfernoComponent {
    render() {
      t.deepEqual(this.props, {className: 'a', foo: 'bar'}, 'matches expected props');
      return createElement('div');
    }
  }

  const StyledInnerComponent = styled(InnerComponent, {color: 'red'});

  class ClassComponent extends InfernoComponent {
    componentDidMount() {
      t.ok(InfernoTestUtils.isRenderedClassComponentOfType(this.innerComponent, InnerComponent), 'is InnerComponent');
    }
    render() {
      return createElement(StyledInnerComponent, {
        foo: 'bar',
        innerRef: innerComponent => {
          t.ok(InfernoTestUtils.isRenderedClassComponentOfType(innerComponent, InnerComponent), 'is InnerComponent');
          this.innerComponent = innerComponent
        }
      });
    }
  }

  InfernoTestUtils.renderIntoDocument(
    createElement(Provider, {styletron},
      createElement(ClassComponent)
    )
  );
});
