// @flow

import test from "tape";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import mock from "xhr-mock";

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
  t.plan(3);
  mock.setup();
  mock.use((req, res) => {
    mock.teardown();
    t.ok(req.url().path.endsWith(".js"), "requests source");
    return res.status(200);
  });

  const style = {size: 1};
  const Widget = styled("div", style);
  const wrapper = Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => "bar",
      }}
      debugMode={true}
    >
      <Widget className="foo" />
    </Provider>,
  );
  const divs = wrapper.find("div");
  t.equal(divs.length, 1, "single div rendered");
  t.ok(divs.hasClass("foo bar __debug_18"), "adds debug class");
});

test("styled debug mode (ssr)", t => {
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
      debugMode="ssr"
    >
      <Widget />
    </Provider>,
  );
  const divs = wrapper.find("div");
  t.equal(count, 2, "renders twice");
  t.ok(
    divs.hasClass("foo __debug_19"),
    "explicit and generated class names merged",
  );
  t.end();
});
