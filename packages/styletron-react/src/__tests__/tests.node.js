// @flow strict

import test from "tape";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";

import {withStyle, styled, withTransform} from "../index.js";

Enzyme.configure({adapter: new Adapter()});

test("styled static", t => {
  const style = {color: "red", display: "inline"};
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
  t.end();
});

test("styled dynamic", t => {
  const Widget = styled("div", (props: {foo: boolean}) => ({
    color: props.foo ? "red" : "blue"
  }));

  Enzyme.shallow(<Widget foo={true} />, {
    context: {
      styletron: {
        renderStyle: x => {
          t.deepEqual(x, {color: "red"});
        }
      }
    }
  });
  t.end();
});

test("withStyle static", t => {
  const Widget = styled("div", {color: "red", display: "inline"});
  const SuperWidget = withStyle(Widget, {
    display: "block",
    background: "black"
  });
  Enzyme.shallow(<SuperWidget />, {
    context: {
      styletron: {
        renderStyle: x => {
          t.deepEqual(x, {color: "red", display: "block", background: "black"});
        }
      }
    }
  });
  t.end();
});

test("withStyle dynamic", t => {
  const Widget = styled("div", {color: "red", display: "inline"});
  const SuperWidget = withStyle(Widget, props => ({
    display: props.$block ? "block" : "inline",
    background: "black"
  }));
  Enzyme.shallow(<SuperWidget $block={true} />, {
    context: {
      styletron: {
        renderStyle: x => {
          t.deepEqual(x, {color: "red", display: "block", background: "black"});
        }
      }
    }
  });
  t.end();
});

test("withTransform", t => {
  const Widget = styled("div", {color: "red", display: "inline"});
  const SuperWidget = withTransform(Widget, (style, props) => ({
    ...style,
    display: props.$block ? "block" : "inline"
  }));
  Enzyme.shallow(<SuperWidget $block={true} />, {
    context: {
      styletron: {
        renderStyle: x => {
          t.deepEqual(x, {color: "red", display: "block"});
        }
      }
    }
  });
  t.end();
});
