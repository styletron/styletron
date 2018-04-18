// @flow

import test from "tape";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";

import {styled, withWrapper, withStyle, Provider} from "../index.js";

Enzyme.configure({adapter: new Adapter()});

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

  const Widget = styled(InnerComponent, {color: "red"});

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

  const Widget = styled("button", {color: "red"});
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
  const Widget = styled("button", {color: "red"});
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
          t.deepEqual(style, {color: "red"});
        },
      }}
    >
      <WrappedWidget foo="bar" />
    </Provider>,
  );
  t.equal(wrapper1.find("section").length, 1, "wrapper rendered");

  const DeluxeWrappedWidget = withStyle(WrappedWidget, {color: "blue"});
  const wrapper2 = Enzyme.mount(
    <Provider
      value={{
        renderStyle: style => {
          t.deepEqual(
            style,
            {color: "blue"},
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

test("font-face injection", t => {
  t.plan(2);
  const fontFace = {
    src: "foo",
  };
  const style = {fontFamily: fontFace};
  const Widget = styled("div", style);
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {
            fontFamily: "foo",
          });
        },
        renderFontFace: x => {
          t.deepEqual(x, fontFace);
          return "foo";
        },
      }}
    >
      <Widget />
    </Provider>,
  );
  t.end();
});

test("keyframes injection", t => {
  t.plan(2);
  const keyframes = {
    from: {color: "red"},
    to: {color: "green"},
  };
  const style = {animationName: keyframes};
  const Widget = styled("div", style);
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {
            animationName: "foo",
          });
        },
        renderKeyframes: x => {
          t.deepEqual(x, keyframes);
          return "foo";
        },
      }}
    >
      <Widget />
    </Provider>,
  );
  t.end();
});
