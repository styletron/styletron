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
} from "../index";

import {getInitialStyle, driver} from "styletron-standard";
import type {StyleObject} from "styletron-standard";

Enzyme.configure({adapter: new Adapter()});

test("styled (static)", () => {
  const style = {color: "red"};
  const Widget = styled("div", style);
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          expect(x).toEqual(style);
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
  expect(divs.length).toBe(1);
  expect(divs.hasClass("foo bar")).toBe(true);
});

test("styled (dynamic)", () => {
  const Widget = styled("div", (props: {$foo: boolean}) => ({
    color: props.$foo ? "red" : "blue",
  }));

  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          expect(x).toEqual({color: "red"});
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <Widget $foo={true} />
    </Provider>,
  );
});

test("withStyle (static)", () => {
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
          expect(x).toEqual({
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
});

test("withStyle (dynamic)", () => {
  const Widget = styled("div", {
    lineHeight: 1,
    color: "red",
    ":hover": {fontSize: "12px"},
  });
  const SuperWidget = withStyle<typeof Widget, {$round: boolean}>(
    Widget,
    props => ({
      background: props.$round ? "yellow" : "green",
      ":hover": {borderWidth: 0},
    }),
  );
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          expect(x).toEqual({
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
});

test("$style prop (static)", () => {
  const Widget = styled("div", {
    lineHeight: 1,
    color: "red",
    ":hover": {fontSize: "12px"},
  });

  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          expect(x).toEqual({
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
});

test("$style prop (dynamic)", () => {
  const Widget = styled<"div", {$round: boolean}>("div", {
    lineHeight: 1,
    color: "red",
    ":hover": {fontSize: "12px"},
  });

  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          expect(x).toEqual({
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
});

test("$style overrides nested withStyle", () => {
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
          expect(x).toEqual({
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
});

test("withTransform", () => {
  const Widget = styled("div", {color: "red", background: "green"});
  const SuperWidget = withTransform(
    Widget,
    (style, props: {$round: boolean}) => ({
      ...style,
      background: props.$round ? "yellow" : "green",
    }),
  );
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          expect(x).toEqual({color: "red", background: "yellow"});
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
});

test("$as works", () => {
  const Widget = styled("div", {});
  const MockComponent = props => {
    expect(props.className).toBe("foo");
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
  expect(wrapper.find("span").length).toBe(1);
});

test("$-prefixed props not passed", () => {
  class InnerComponent extends React.Component<{
    className?: string;
  }> {
    render() {
      expect(this.props).toEqual({
        className: "styleclass",
        "data-bar": "bar",
      });
      return <button>InnerComponent</button>;
    }
  }

  const Widget = styled<typeof InnerComponent, {$foo: any; $baz: any}>(
    InnerComponent,
    {color: "red"},
  );

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

test("callback ref forwarding", () => {
  const Widget = styled("button", {color: "red"});
  class TestComponent extends React.Component<{}> {
    widgetInner: HTMLButtonElement | undefined | null;
    componentDidMount() {
      expect(this.widgetInner instanceof HTMLButtonElement).toBe(true);
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

test("React.createRef() ref forwarding", () => {
  const Widget = styled("button", {color: "red"});
  class TestComponent extends React.Component<{}> {
    widgetInner = React.createRef<any>();

    componentDidMount() {
      expect(this.widgetInner.current instanceof HTMLButtonElement).toBe(true);
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

test("React.useRef() ref forwarding", () => {
  const Widget = styled("button", {color: "red"});
  const TestComponent = () => {
    const widgetInner = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
      expect(widgetInner.current instanceof HTMLButtonElement).toBe(true);
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

test("legacy string ref forwarding", () => {
  const Widget = styled("button", {color: "red"});
  class TestComponent extends React.Component<{}> {
    componentDidMount() {
      expect(this.refs.myButton instanceof HTMLButtonElement).toBe(true);
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

test("withWrapper", () => {
  const Widget = styled<"button", {foo?: string}>("button", {
    color: "red",
  });
  const WrappedWidget = withWrapper(Widget, StyledElement => props => {
    expect(props).toEqual({foo: "bar"});
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
          expect(style).toEqual({color: "red"});
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <WrappedWidget foo="bar" />
    </Provider>,
  );
  expect(wrapper1.find("section").length).toBe(1);

  const DeluxeWrappedWidget = withStyle(WrappedWidget, {color: "blue"});
  const wrapper2 = Enzyme.mount(
    <Provider
      value={{
        renderStyle: style => {
          expect(style).toEqual({color: "blue"});
          return "";
        },
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
    >
      <DeluxeWrappedWidget foo="bar" />
    </Provider>,
  );
  expect(wrapper2.find("section").length).toBe(1);
});

test("styled debug mode (client only)", () => {
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
          expect(stackIndex).toBe(2);
          expect(typeof stackInfo).toBe("object");
          expect(typeof stackInfo.stack).toBe("string");
          expect(typeof stackInfo.message).toBe("string");
          return "__arbitrary_debug_class__";
        },
      }}
    >
      <Widget className="foo" />
    </Provider>,
  );

  const divs = wrapper.find("div");
  expect(divs.length).toBe(1);
  expect(divs.hasClass("__arbitrary_debug_class__ foo bar")).toBe(true);
  wrapper.unmount();
  wrapper.mount();
  wrapper.unmount();
  expect(debugCallCount).toBe(1);
});

test("styled debug mode (ssr)", () => {
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
          expect(count).toBe(2);
          return "__some_debug_class";
        },
      }}
      debugAfterHydration
    >
      <Widget />
    </Provider>,
  );
  const divs = wrapper.find("div");
  expect(count).toBe(2);
  expect(divs.hasClass("__some_debug_class foo")).toBe(true);
});

test("font-face injection", () => {
  const fontFace = {
    src: "foo",
  };
  const style = {fontFamily: fontFace} as StyleObject;
  const Widget = styled("div", style);
  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          expect(x).toEqual({
            fontFamily: "foo",
          });
          return "";
        },
        renderFontFace: x => {
          expect(x).toEqual(fontFace);
          return "foo";
        },
        renderKeyframes: () => "",
      }}
    >
      <Widget />
    </Provider>,
  );
});

test("keyframes injection", () => {
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
          expect(x).toEqual({animationName: "foo"});
          return "";
        },
        renderKeyframes: x => {
          expect(x).toEqual(keyframes);
          return "foo";
        },
        renderFontFace: () => "",
      }}
    >
      <Widget />
    </Provider>,
  );
});

test("createStyled wrapper", () => {
  const customStyled = createStyled({
    driver,
    getInitialStyle,
    wrapper: _Component => props => {
      expect(props.foo).toBe("foo");
      return <div>hello world</div>;
    },
  });
  const Widget = customStyled<"div", {foo: string}>("div", {
    color: "red",
  });
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
});

test("useStyletron css", () => {
  function Link() {
    const [css] = useStyletron();
    const className = css({color: "blue"});
    expect(className).toBe(".abc");
    return <a className={className}>Foo</a>;
  }

  Enzyme.mount(
    <Provider
      value={{
        renderStyle: x => {
          expect(x).toEqual({
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
});

test("useStyletron debug mode", () => {
  function Widget() {
    const [css] = useStyletron();
    const [on, setOn] = React.useState(false);
    const className = css({color: "red"});
    return (
      <button onClick={() => setOn(!on)} className={className}>
        test
      </button>
    );
  }

  let debugCallCount = 0;
  const wrapper = Enzyme.mount(
    <Provider
      value={{
        renderStyle: () => "bar",
        renderKeyframes: () => "",
        renderFontFace: () => "",
      }}
      debug={{
        debug: () => {
          debugCallCount++;
          return `__debug-${debugCallCount}`;
        },
      }}
    >
      <Widget />
    </Provider>,
  );

  const button = wrapper.find("button");
  expect(button.hasClass("__debug-1 bar")).toBe(true);
  button.simulate("click");
  expect(button.hasClass("__debug-1 bar")).toBe(true);
  expect(debugCallCount).toBe(1);
});

test("no-op engine", () => {
  const consoleWarn = console.warn; // eslint-disable-line

  (console as any).warn = message => {
    expect(message.split("\n")[1]).toBe(
      "Styletron has been switched to a no-op (test) mode.",
    );
  };
  const Widget = styled("div", {
    color: "red",
  });
  Enzyme.mount(<Widget />);

  (console as any).warn = consoleWarn;
});
