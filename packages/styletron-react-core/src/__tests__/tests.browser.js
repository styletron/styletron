// @flow

import test from "tape";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";

import {
  withWrapper,
  withStyle,
  withStyleDeep,
  withTransform,
  Provider,
} from "../index.js";
import {styled} from "./utils/custom-styled.js";

Enzyme.configure({adapter: new Adapter()});

test("styled (static)", t => {
  t.plan(3);
  const style = {size: 1};
  const Widget = styled("div", style);
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, style);
        },
      }}
    >
      <Widget />
    </Provider>,
  );
  const wrapper = Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => "bar",
      }}
    >
      <Widget className="foo" />
    </Provider>,
  );
  const divs = wrapper.find("div");
  t.equal(divs.length, 1, "single div rendered");
  t.ok(divs.hasClass("foo bar"), "explicit and generated class names merged");
  t.end();
});

test("styled (dynamic)", t => {
  t.plan(1);
  const Widget = styled("div", (props: {foo: boolean}) => ({
    size: props.foo ? 1 : 2,
  }));

  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {size: 1});
        },
      }}
    >
      <Widget foo={true} />
    </Provider>,
  );
  t.end();
});

test("withStyle (static)", t => {
  t.plan(1);
  const Widget = styled("div", {size: 1, color: "red"});
  const SuperWidget = withStyle(Widget, {
    color: "blue",
    shape: "circle",
  });
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {size: 1, color: "blue", shape: "circle"});
        },
      }}
    >
      <SuperWidget />
    </Provider>,
  );
  t.end();
});

test("withStyle (dynamic)", t => {
  t.plan(1);
  const Widget = styled("div", {color: "red", shape: "square"});
  const SuperWidget = withStyle(Widget, props => ({
    shape: props.$round ? "circle" : "square",
    size: 1,
  }));
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {color: "red", shape: "circle", size: 1});
        },
      }}
    >
      <SuperWidget $round={true} />
    </Provider>,
  );
  t.end();
});

test("withStyleDeep (static)", t => {
  t.plan(1);
  const Widget = styled("div", {size: 1, color: "red", velocity: {speed: 1}});
  const SuperWidget = withStyleDeep(Widget, {
    color: "blue",
    velocity: {direction: 1},
  });
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {
            size: 1,
            color: "blue",
            velocity: {speed: 1, direction: 1},
          });
        },
      }}
    >
      <SuperWidget />
    </Provider>,
  );
  t.end();
});

test("withStyleDeep (dynamic)", t => {
  t.plan(1);
  const Widget = styled("div", {size: 1, color: "red", velocity: {speed: 1}});
  const SuperWidget = withStyleDeep(Widget, props => ({
    shape: props.$round ? "circle" : "square",
    velocity: {direction: 1},
  }));
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {
            color: "red",
            shape: "circle",
            size: 1,
            velocity: {direction: 1, speed: 1},
          });
        },
      }}
    >
      <SuperWidget $round={true} />
    </Provider>,
  );
  t.end();
});

test("withTransform", t => {
  t.plan(1);
  const Widget = styled("div", {color: "red", shape: "square"});
  const SuperWidget = withTransform(Widget, (style, props) => ({
    ...style,
    shape: props.$round ? "circle" : "square",
  }));
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {color: "red", shape: "circle"});
        },
      }}
    >
      <SuperWidget $round={true} />
    </Provider>,
  );
  t.end();
});

test("$as works", t => {
  t.plan(2);
  const Widget = styled("div", {});
  const MockComponent = props => {
    t.equal(props.className, "foo", "styled class is passed");
    return <div />;
  };
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => {
          return "foo";
        },
      }}
    >
      <Widget $as={MockComponent} />
    </Provider>,
  );
  const wrapper = Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => {},
      }}
    >
      <Widget $as="span" />
    </Provider>,
  );
  t.equal(wrapper.find("span").length, 1, "span rendered");
  t.end();
});

test("$-prefixed props not passed", t => {
  t.plan(1);

  class InnerComponent extends React.Component<{className: string}> {
    render() {
      t.deepEqual(
        this.props,
        {
          className: "styleclass",
          "data-bar": "bar",
        },
        "props match expected",
      );
      return <button>InnerComponent</button>;
    }
  }

  const Widget = styled(InnerComponent, {size: 1});

  Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => {
          return "styleclass";
        },
      }}
    >
      <Widget $foo="foo" $baz="baz" data-bar="bar" />
    </Provider>,
  );
});

test("$ref", t => {
  t.plan(1);

  const Widget = styled("button", {size: 1});
  class TestComponent extends React.Component<{}> {
    widgetInner: ?HTMLButtonElement;
    componentDidMount() {
      t.ok(this.widgetInner instanceof HTMLButtonElement, "is button");
    }

    render() {
      return (
        <Provider value={{renderStyle: () => {}}}>
          <Widget
            $ref={c => {
              this.widgetInner = c;
            }}
          />
        </Provider>
      );
    }
  }
  Enzyme.mount(<TestComponent />);
});

test("withWrapper", t => {
  t.plan(6);
  const Widget = styled("button", {size: 1, color: "red"});
  const WrappedWidget = withWrapper(Widget, StyledElement => props => {
    t.deepEqual(props, {foo: "bar"}, "props passed");
    return (
      <section>
        <StyledElement {...props} />
      </section>
    );
  });
  const wrapper1 = Enzyme.mount(
    <Provider
      value={{
        renderStyle: style => {
          t.deepEqual(style, {size: 1, color: "red"});
        },
      }}
    >
      <WrappedWidget foo="bar" />
    </Provider>,
  );
  t.equal(wrapper1.find("section").length, 1, "wrapper rendered");

  const DeluxeWrappedWidget = withStyle(WrappedWidget, {
    size: 2,
    shape: "circle",
  });
  const wrapper2 = Enzyme.mount(
    <Provider
      value={{
        renderStyle: style => {
          t.deepEqual(
            style,
            {size: 2, color: "red", shape: "circle"},
            "style composition works after wrapping",
          );
        },
      }}
    >
      <DeluxeWrappedWidget foo="bar" />
    </Provider>,
  );
  t.equal(
    wrapper2.find("section").length,
    1,
    "wrapper rendered after composition",
  );

  t.end();
});

test("styled debug mode (client only)", t => {
  t.plan(7);

  let debugCallCount = 0;

  const style = {size: 1};
  const Widget = styled("div", style);

  const wrapper = Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => "bar",
      }}
      debug={{
        debug: ({stackIndex, stackInfo}) => {
          debugCallCount++;
          t.equal(stackIndex, 2, "stackIndex matches expected");
          t.equal(typeof stackInfo, "object", "stackInfo is an object");
          t.equal(
            typeof stackInfo.stack,
            "string",
            "stackInfo.stack is a string (chrome)",
          );
          t.equal(
            typeof stackInfo.message,
            "string",
            "stackInfo.message is a string (chrome)",
          );
          return "__arbitrary_debug_class__";
        },
      }}
    >
      <Widget className="foo" />
    </Provider>,
  );

  const divs = wrapper.find("div");
  t.equal(divs.length, 1, "single div rendered");
  t.ok(divs.hasClass("__arbitrary_debug_class__ foo bar"), "adds debug class");
  wrapper.unmount();
  wrapper.mount();
  wrapper.unmount();
  t.equal(debugCallCount, 1, "debug only called on initial render");
});

test("styled debug mode (ssr)", t => {
  t.plan(3);
  const style = {size: 1};
  let count = 0;
  const Widget = styled("div", style);
  const wrapper = Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => {
          count++;
          return "foo";
        },
      }}
      debug={{
        debug: () => {
          t.equal(count, 2, "debug class fetched during second render");
          return "__some_debug_class";
        },
      }}
      debugAfterHydration
    >
      <Widget />
    </Provider>,
  );
  const divs = wrapper.find("div");
  t.equal(count, 2, "renders twice");
  t.ok(
    divs.hasClass("__some_debug_class foo"),
    "explicit and generated class names merged",
  );
  t.end();
});
