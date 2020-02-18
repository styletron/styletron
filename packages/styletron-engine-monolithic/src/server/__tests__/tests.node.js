// @flow

import test from "tape";
import Styletron from "../server.js";

test("StyletronServer toCss", t => {
  const styletron = new Styletron();
  t.equal(styletron.getCss(), "", "returns empty string when no styles");
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getCss(),
    ".css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
  );
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getCss(),
    ".css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getCss(),
    "@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}.css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
  );
  injectFixtureFontFace(styletron);
  t.equal(
    styletron.getCss(),
    "@font-face{font-family:font-WNyjs;src:local('Roboto')}@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}.css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
  );
  t.end();
});

test("StyletronServer getStylesheets", t => {
  const styletron = new Styletron();
  t.deepEqual(
    styletron.getStylesheets(),
    [{css: "", attrs: {"data-hydrate": ""}}],
    "no styles yields array with single empty stylesheet",
  );
  injectFixtureStyles(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        ".css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
      attrs: {"data-hydrate": "gMxcYW PKJb ihRfbR eaGfYw"},
    },
  ]);
  injectFixtureKeyframes(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        "@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}.css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
      attrs: {"data-hydrate": "blGUxF gMxcYW PKJb ihRfbR eaGfYw"},
    },
  ]);
  injectFixtureFontFace(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        "@font-face{font-family:font-WNyjs;src:local('Roboto')}@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}.css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
      attrs: {
        "data-hydrate": "WNyjs blGUxF gMxcYW PKJb ihRfbR eaGfYw",
      },
    },
  ]);
  t.end();
});

test("StyletronServer getStylesheetsHtml ", t => {
  const styletron = new Styletron();
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-hydrate=""></style>',
    "returns single empty stylesheet when no styles",
  );
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-hydrate="gMxcYW PKJb ihRfbR eaGfYw">.css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}</style>',
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-hydrate="blGUxF gMxcYW PKJb ihRfbR eaGfYw">@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}.css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}</style>',
  );
  injectFixtureFontFace(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-hydrate="WNyjs blGUxF gMxcYW PKJb ihRfbR eaGfYw">@font-face{font-family:font-WNyjs;src:local(\'Roboto\')}@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}.css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}</style>',
  );
  t.end();
});

test("StyletronServer prefix option", t => {
  const styletron = new Styletron({prefix: "foo_"});
  t.equal(styletron.renderStyle({color: "red"}), "foo_css-jZABor");
  t.equal(injectFixtureFontFace(styletron), "foo_font-WNyjs");
  t.equal(injectFixtureKeyframes(styletron), "foo_animation-blGUxF");
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        "@font-face{font-family:foo_font-WNyjs;src:local('Roboto')}@keyframes foo_animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}.foo_css-jZABor{color:red;}",
      attrs: {"data-hydrate": "WNyjs blGUxF jZABor"},
    },
  ]);
  t.end();
});

test("StyletronServer deeply nested rules", t => {
  const styletron = new Styletron({});
  t.equal(
    styletron.renderStyle({
      "@supports (flex-wrap: wrap)": {
        "@media (min-width: 50em)": {
          ":hover": {
            background: "blue",
          },
        },
      },
    }),
    "css-gPyDTX",
  );
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        "@supports (flex-wrap: wrap){@media (min-width: 50em){.css-gPyDTX:hover{background:blue;}}}",
      attrs: {"data-hydrate": "gPyDTX"},
    },
  ]);
  t.end();
});

function injectFixtureStyles(styletron) {
  styletron.renderStyle({
    color: "red",
    border: "1px solid black",
    ":hover": {color: "green"},
    "@media (min-width: 200px)": {
      color: "hotpink",
      ":hover": {
        color: "red",
      },
    },
    "@media (min-width: 400px)": {
      color: "violet",
    },
    "@supports (display: grid)": {
      div: {
        display: "grid",
      },
    },
  });
  styletron.renderStyle({
    zIndex: void 0, // Should be silently ignored
  });
  styletron.renderStyle({
    // null values were historically supported (albeit erronesouly)
    opacity: null, // Should be silently ignored
  });
  styletron.renderStyle({
    userSelect: "none",
  });
}

function injectFixtureKeyframes(styletron) {
  return styletron.renderKeyframes({
    from: {
      color: "purple",
    },
    "50%": {
      color: "yellow",
    },
    to: {
      color: "orange",
    },
  });
}

function injectFixtureFontFace(styletron) {
  return styletron.renderFontFace({
    src: "local('Roboto')",
  });
}
