// @flow
import test from "tape";
import {Server as ServerMonolithic} from "styletron-engine-monolithic";
import {Server as ServerAtomic} from "styletron-engine-atomic";
import {driver} from "../index";

test("driver atomic", t => {
  let cssString;
  const instance = new ServerAtomic();
  const styleObject = {
    color: "red",
  };
  driver(styleObject, instance);
  cssString = ".a{color:red}";
  t.strictEqual(instance.getCss(), cssString, "injects basic style");
  const fontFallback = {
    fontFamily: ["Arial", "sans-serif"],
  };
  driver(fontFallback, instance);
  cssString = `${cssString}.b{font-family:Arial,sans-serif}`;
  t.strictEqual(instance.getCss(), cssString, "injects font fallbacks - basic");
  const fontFace = {
    src: "url(some-awesome-font.ttf)",
  };
  const declaredFontFaceFallback = {
    fontFamily: [fontFace, "cursive"],
  };
  driver(declaredFontFaceFallback, instance);
  cssString = `@font-face{font-family:a;src:url(some-awesome-font.ttf)}${cssString}.c{font-family:a,cursive}`;
  t.strictEqual(
    instance.getCss(),
    cssString,
    "injects font fallbacks - declared",
  );
  t.end();
});

test("driver monolithic", t => {
  let cssString;
  const instance = new ServerMonolithic();
  const styleObject = {
    color: "red",
  };
  driver(styleObject, instance);
  cssString = ".css-jZABor{color:red;}";
  t.strictEqual(instance.getCss(), cssString, "injects basic style");
  const fontFallback = {
    fontFamily: ["Arial", "sans-serif"],
  };
  driver(fontFallback, instance);
  cssString = `${cssString}.css-hAHJYW{font-family:Arial,sans-serif;}`;
  t.strictEqual(instance.getCss(), cssString, "injects font fallbacks - basic");
  const fontFace = {
    src: "url(some-awesome-font.ttf)",
  };
  const declaredFontFaceFallback = {
    fontFamily: [fontFace, "cursive"],
  };
  driver(declaredFontFaceFallback, instance);
  cssString = `${cssString}@font-face{font-family:font-jllknz;src:url(some-awesome-font.ttf)}.css-cwIyhY{font-family:font-jllknz,cursive;}`;
  t.strictEqual(
    instance.getCss(),
    cssString,
    "injects font fallbacks - declared",
  );
  t.end();
});

test("font-family undefined consistency between engines", t => {
  const atomic = new ServerAtomic();
  const monolithic = new ServerMonolithic();

  // eslint-disable-next-line no-undefined
  driver({fontFamily: undefined}, atomic);
  t.strictEqual(atomic.getCss(), "", "atomic font-family undefined");

  // eslint-disable-next-line no-undefined
  driver({fontFamily: undefined}, monolithic);
  t.strictEqual(monolithic.getCss(), "", "monolithic font-family undefined");
  t.end();
});
