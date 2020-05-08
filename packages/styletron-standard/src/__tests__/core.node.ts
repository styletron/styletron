// @flow
import test from "tape";
import {Server} from "styletron-engine-atomic";
import {driver} from "../index";

test("driver", t => {
  let cssString;
  const instance = new Server();
  const styleObject = {
    color: "red",
  };
  driver(styleObject, instance);
  cssString = ".ae{color:red}";
  t.strictEqual(instance.getCss(), cssString, "injects basic style");
  const fontFallback = {
    fontFamily: ["Arial", "sans-serif"],
  };
  driver(fontFallback, instance);
  cssString = `${cssString}.af{font-family:Arial,sans-serif}`;
  t.strictEqual(instance.getCss(), cssString, "injects font fallbacks - basic");
  const fontFace = {
    src: "url(some-awesome-font.ttf)",
  };
  const declaredFontFaceFallback = {
    fontFamily: [fontFace, "cursive"],
  };
  driver(declaredFontFaceFallback, instance);
  cssString = `@font-face{font-family:ae;src:url(some-awesome-font.ttf)}${cssString}.ag{font-family:ae,cursive}`;
  t.strictEqual(
    instance.getCss(),
    cssString,
    "injects font fallbacks - declared",
  );
  t.end();
});
