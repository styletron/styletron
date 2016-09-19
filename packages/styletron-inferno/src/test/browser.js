const test = require('tape');
const Inferno = require('inferno');
const InfernoComponent = require('inferno-component');
const InfernoDOM = require('inferno-dom');
const createElement = require('inferno-create-element');
const Styletron = require('styletron-server');

const connectToStyles = require('../connect-to-styles');
const Provider = require('../provider');

test('provider provides instance', t => {
  const mockInstance = {};
  t.plan(1);
  const MockComponent = (props, context) => {
    t.equal(context.styletron, mockInstance, 'styletron instance override provided');
    return createElement('div');
  };
  renderIntoDocument(createElement(Provider, {
    styletron: mockInstance
  }, createElement(MockComponent)));
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
    return createElement('div');
  }
  const Wrapped = hoc(MockComponent);
  const styletron = new Styletron();
  const output = renderIntoDocument(
    createElement(Provider, {styletron},
      createElement(Wrapped, expectedProps))
  );
  t.equal(styletron.getCss(), '.c0{color:red}');
});

function renderIntoDocument(node) {
  const div = document.body.appendChild(document.createElement('div'));
  InfernoDOM.render(node, div);
  return div.children[0];
}
