// @flow strict

import test from "tape";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";

import {withStyle, withStyleDeep, withTransform} from "../index.js";
import {styled} from "./utils/custom-styled.js";

Enzyme.configure({adapter: new Adapter()});

// TODO: test immutability of functions

test("styled (static)", t => {
  const style = {size: 1};
  const Widget = styled("div", style);
  Enzyme.shallow(<Widget />, {
    context: {
      styletron: {
        renderStyle: x => {
          t.deepEqual(x, style);
        }
      }
    }
  });
  const wrapper = Enzyme.shallow(<Widget className="foo" />, {
    context: {
      styletron: {
        renderStyle: () => "bar"
      }
    }
  });
  const divs = wrapper.find("div");
  t.equal(divs.length, 1, "single div rendered");
  t.ok(divs.hasClass("foo bar"), "explicit and generated class names merged");
  t.end();
});

test("styled (dynamic)", t => {
  const Widget = styled("div", (props: {foo: boolean}) => ({
    size: props.foo ? 1 : 2
  }));

  Enzyme.shallow(<Widget foo={true} />, {
    context: {
      styletron: {
        renderStyle: x => {
          t.deepEqual(x, {size: 1});
        }
      }
    }
  });
  t.end();
});

test("withStyle (static)", t => {
  const Widget = styled("div", {size: 1, color: "red"});
  const SuperWidget = withStyle(Widget, {
    color: "blue",
    shape: "circle"
  });
  Enzyme.shallow(<SuperWidget />, {
    context: {
      styletron: {
        renderStyle: x => {
          t.deepEqual(x, {size: 1, color: "blue", shape: "circle"});
        }
      }
    }
  });
  t.end();
});

test("withStyle (dynamic)", t => {
  const Widget = styled("div", {color: "red", shape: "square"});
  const SuperWidget = withStyle(Widget, props => ({
    shape: props.$round ? "circle" : "square",
    size: 1
  }));
  Enzyme.shallow(<SuperWidget $round={true} />, {
    context: {
      styletron: {
        renderStyle: x => {
          t.deepEqual(x, {color: "red", shape: "circle", size: 1});
        }
      }
    }
  });
  t.end();
});

test("withStyleDeep (static)", t => {
  const Widget = styled("div", {size: 1, color: "red", velocity: {speed: 1}});
  const SuperWidget = withStyleDeep(Widget, {
    color: "blue",
    velocity: {direction: 1}
  });
  Enzyme.shallow(<SuperWidget />, {
    context: {
      styletron: {
        renderStyle: x => {
          t.deepEqual(x, {
            size: 1,
            color: "blue",
            velocity: {speed: 1, direction: 1}
          });
        }
      }
    }
  });
  t.end();
});

test("withStyleDeep (dynamic)", t => {
  const Widget = styled("div", {size: 1, color: "red", velocity: {speed: 1}});
  const SuperWidget = withStyleDeep(Widget, props => ({
    shape: props.$round ? "circle" : "square",
    velocity: {direction: 1}
  }));
  Enzyme.shallow(<SuperWidget $round={true} />, {
    context: {
      styletron: {
        renderStyle: x => {
          t.deepEqual(x, {
            color: "red",
            shape: "circle",
            size: 1,
            velocity: {direction: 1, speed: 1}
          });
        }
      }
    }
  });
  t.end();
});

test("withTransform", t => {
  const Widget = styled("div", {color: "red", shape: "square"});
  const SuperWidget = withTransform(Widget, (style, props) => ({
    ...style,
    shape: props.$round ? "circle" : "square"
  }));
  Enzyme.shallow(<SuperWidget $round={true} />, {
    context: {
      styletron: {
        renderStyle: x => {
          t.deepEqual(x, {color: "red", shape: "circle"});
        }
      }
    }
  });
  t.end();
});
