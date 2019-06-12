// @flow

import test from "tape";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";

import {
  styled,
  createStyled,
  withWrapper,
  withStyle,
  withTransform,
  Provider,
  useStyletron,
} from "../index.js";

import {getInitialStyle, driver} from "styletron-standard";

Enzyme.configure({adapter: new Adapter()});

test("styled (static)", t => {
  t.plan(3);
  const style = {color: "red"};
  const Widget = styled("div", style);
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, style);
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <Widget />
    </Provider>,
  );
  const wrapper = Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => "bar",
        renderKeyframes: () => "",
        renderFontFace: () => "",
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
  const Widget = styled("div", (props: {$foo: boolean}) => ({
    color: props.$foo ? "red" : "blue",
  }));

  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {color: "red"});
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <Widget $foo={true} />
    </Provider>,
  );
  t.end();
});

test("withStyle (static)", t => {
  t.plan(1);
  const Widget = styled("div", {
    borderWidth: 0,
    color: "red",
    ":hover": {fontSize: "12px"},
  });
  const SuperWidget = withStyle(Widget, {
    color: "blue",
    ":hover": {borderWidth: "10px"},
  });
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {
            borderWidth: 0,
            color: "blue",
            ":hover": {fontSize: "12px", borderWidth: "10px"},
          });
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <SuperWidget />
    </Provider>,
  );
  t.end();
});

test("withStyle (dynamic)", t => {
  t.plan(1);
  const Widget = styled("div", {
    lineHeight: 1,
    color: "red",
    ":hover": {fontSize: "12px"},
  });
  const SuperWidget = withStyle(Widget, props => ({
    background: props.$round ? "yellow" : "green",
    ":hover": {borderWidth: 0},
  }));
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {
            color: "red",
            background: "yellow",
            lineHeight: 1,
            ":hover": {borderWidth: 0, fontSize: "12px"},
          });
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <SuperWidget $round={true} />
    </Provider>,
  );
  t.end();
});

test("$style prop (static)", t => {
  t.plan(1);
  const Widget = styled("div", {
    lineHeight: 1,
    color: "red",
    ":hover": {fontSize: "12px"},
  });

  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {
            color: "blue",
            lineHeight: 1,
            ":hover": {fontSize: "12px"},
          });
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <Widget $style={{color: "blue"}} />
    </Provider>,
  );
  t.end();
});

test("$style prop (dynamic)", t => {
  t.plan(1);
  const Widget = styled("div", {
    lineHeight: 1,
    color: "red",
    ":hover": {fontSize: "12px"},
  });

  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {
            color: "blue",
            background: "yellow",
            lineHeight: 1,
            ":hover": {fontSize: "12px", borderWidth: 0},
          });
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <Widget
        $style={props => ({
          color: "blue",
          background: props.$round ? "yellow" : "green",
          ":hover": {borderWidth: 0},
        })}
        $round={true}
      />
    </Provider>,
  );
  t.end();
});

test("$style overrides nested withStyle", t => {
  t.plan(1);
  const Widget = styled("div", {
    color: "red",
    fontSize: "12px",
  });

  const WidgetColor = withStyle(Widget, {color: "blue"});
  const WidgetFontSize = withStyle(WidgetColor, {fontSize: "14px"});

  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {
            color: "yellow",
            fontSize: "14px",
            padding: "10px",
          });
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <WidgetFontSize
        $style={{
          color: "yellow",
          padding: "10px",
        }}
      />
    </Provider>,
  );
  t.end();
});

test("withTransform", t => {
  t.plan(1);
  const Widget = styled("div", {color: "red", background: "green"});
  const SuperWidget = withTransform(Widget, (style, props) => ({
    ...style,
    background: props.$round ? "yellow" : "green",
  }));
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {color: "red", background: "yellow"});
          return "";
        },
        renderFontFace: () => {
          return "";
        },
        renderKeyframes: () => {
          return "";
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
        renderStyle: () => "foo",
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <Widget $as={MockComponent} />
    </Provider>,
  );
  const wrapper = Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => "",
        renderKeyframes: () => "",
        renderFontFace: () => "",
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
        renderStyle: () => "styleclass",
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <Widget $foo="foo" $baz="baz" data-bar="bar" />
    </Provider>,
  );
});

test("callback ref forwarding", t => {
  t.plan(1);

  const Widget = styled("button", {color: "red"});
  class TestComponent extends React.Component<{}> {
    widgetInner: ?HTMLButtonElement;
    componentDidMount() {
      t.ok(this.widgetInner instanceof HTMLButtonElement, "is button");
    }

    render() {
      return (
        <Provider
          value={{
            renderStyle: () => "",
            renderKeyframes: () => "",
            renderFontFace: () => "",
          }}
        >
          <Widget
            ref={c => {
              this.widgetInner = c;
            }}
          />
        </Provider>
      );
    }
  }
  Enzyme.mount(<TestComponent />);
});

test("React.createRef() ref forwarding", t => {
  t.plan(1);

  const Widget = styled("button", {color: "red"});
  class TestComponent extends React.Component<{}> {
    widgetInner: {
      current: React.ElementRef<any> | null,
    } = React.createRef();

    componentDidMount() {
      t.ok(this.widgetInner.current instanceof HTMLButtonElement, "is button");
    }

    render() {
      return (
        <Provider
          value={{
            renderStyle: () => "",
            renderKeyframes: () => "",
            renderFontFace: () => "",
          }}
        >
          <Widget ref={this.widgetInner} />
        </Provider>
      );
    }
  }
  Enzyme.mount(<TestComponent />);
});

test("React.useRef() ref forwarding", t => {
  t.plan(1);
  const Widget = styled("button", {color: "red"});
  const TestComponent = () => {
    const widgetInner = React.useRef(null);
    React.useEffect(() => {
      t.ok(widgetInner.current instanceof HTMLButtonElement, "is button");
    }, []);
    return (
      <Provider
        value={{
          renderStyle: () => "",
          renderKeyframes: () => "",
          renderFontFace: () => "",
        }}
      >
        <Widget ref={widgetInner} />
      </Provider>
    );
  };

  Enzyme.mount(<TestComponent />);
});

test("legacy string ref forwarding", t => {
  t.plan(1);

  const Widget = styled("button", {color: "red"});
  class TestComponent extends React.Component<{}> {
    componentDidMount() {
      t.ok(this.refs.myButton instanceof HTMLButtonElement, "is button");
    }
    render() {
      return (
        <Provider
          value={{
            renderStyle: () => "",
            renderKeyframes: () => "",
            renderFontFace: () => "",
          }}
        >
          <Widget ref="myButton" />
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
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
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
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
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

  const style = {color: "red"};
  const Widget = styled("div", style);

  const wrapper = Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => "bar",
        renderKeyframes: () => "",
        renderFontFace: () => "",
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
  const style = {color: "red"};
  let count = 0;
  const Widget = styled("div", style);
  const wrapper = Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => {
          count++;
          return "foo";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
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
          return "";
        },
        renderFontFace: x => {
          t.deepEqual(x, fontFace);
          return "foo";
        },
        renderKeyframes: () => "",
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
          return "";
        },
        renderKeyframes: x => {
          t.deepEqual(x, keyframes);
          return "foo";
        },
        renderFontFace: () => "",
      }}
    >
      <Widget />
    </Provider>,
  );
  t.end();
});

test("createStyled wrapper", t => {
  t.plan(1);

  const customStyled = createStyled({
    driver,
    getInitialStyle,
    wrapper: _Component => props => {
      t.equal(props.foo, "foo");
      return <div>hello world</div>;
    },
  });
  const Widget = customStyled("div", {color: "red"});
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => "",
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <Widget foo="foo" />
    </Provider>,
  );
  t.end();
});

test("useStyletron css", t => {
  t.plan(2);

  function Link() {
    const [css] = useStyletron();
    const className = css({color: "blue"});
    t.equal(className, ".abc");
    return <a className={className}>Foo</a>;
  }

  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          t.deepEqual(x, {
            color: "blue",
          });
          return ".abc";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <Link />
    </Provider>,
  );
  t.end();
});

test("no-op engine", t => {
  t.plan(1);
  const consoleWarn = console.warn; // eslint-disable-line

  (console: any).warn = message => {
    t.equal(
      message.split("\n")[1],
      "Styletron has been switched to a no-op (test) mode.",
    );
  };
  const Widget = styled("div", {
    color: "red",
  });
  Enzyme.mount(<Widget />);

  (console: any).warn = consoleWarn;
  t.end();
});
