// @flow

import test from "tape";
import Styletron from "../server.js";

test("StyletronServer toCss", t => {
  const styletron = new Styletron();
  t.equal(styletron.getCss(), "", "returns empty string when no styles");
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getCss(),
    ".css-fw0pf{color:red;border:1px solid black;}.css-fw0pf:hover{color:green;}@media (min-width: 200px){.css-fw0pf{color:hotpink;}.css-fw0pf:hover{color:red;}}@media (min-width: 400px){.css-fw0pf{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-ubk92s{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
  );
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getCss(),
    ".css-fw0pf{color:red;border:1px solid black;}.css-fw0pf:hover{color:green;}@media (min-width: 200px){.css-fw0pf{color:hotpink;}.css-fw0pf:hover{color:red;}}@media (min-width: 400px){.css-fw0pf{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-ubk92s{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getCss(),
    "@keyframes animation-89735a{from{color:purple}50%{color:yellow}to{color:orange}}.css-fw0pf{color:red;border:1px solid black;}.css-fw0pf:hover{color:green;}@media (min-width: 200px){.css-fw0pf{color:hotpink;}.css-fw0pf:hover{color:red;}}@media (min-width: 400px){.css-fw0pf{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-ubk92s{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
  );
  injectFixtureFontFace(styletron);
  t.equal(
    styletron.getCss(),
    "@font-face{font-family:font-1iyw4wu;src:local('Roboto')}@keyframes animation-89735a{from{color:purple}50%{color:yellow}to{color:orange}}.css-fw0pf{color:red;border:1px solid black;}.css-fw0pf:hover{color:green;}@media (min-width: 200px){.css-fw0pf{color:hotpink;}.css-fw0pf:hover{color:red;}}@media (min-width: 400px){.css-fw0pf{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-ubk92s{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
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
        ".css-fw0pf{color:red;border:1px solid black;}.css-fw0pf:hover{color:green;}@media (min-width: 200px){.css-fw0pf{color:hotpink;}.css-fw0pf:hover{color:red;}}@media (min-width: 400px){.css-fw0pf{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-ubk92s{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
      attrs: {"data-hydrate": "fw0pf 1d8ny0s 60fc11 ubk92s"},
    },
  ]);
  injectFixtureKeyframes(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        "@keyframes animation-89735a{from{color:purple}50%{color:yellow}to{color:orange}}.css-fw0pf{color:red;border:1px solid black;}.css-fw0pf:hover{color:green;}@media (min-width: 200px){.css-fw0pf{color:hotpink;}.css-fw0pf:hover{color:red;}}@media (min-width: 400px){.css-fw0pf{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-ubk92s{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
      attrs: {"data-hydrate": "89735a fw0pf 1d8ny0s 60fc11 ubk92s"},
    },
  ]);
  injectFixtureFontFace(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        "@font-face{font-family:font-1iyw4wu;src:local('Roboto')}@keyframes animation-89735a{from{color:purple}50%{color:yellow}to{color:orange}}.css-fw0pf{color:red;border:1px solid black;}.css-fw0pf:hover{color:green;}@media (min-width: 200px){.css-fw0pf{color:hotpink;}.css-fw0pf:hover{color:red;}}@media (min-width: 400px){.css-fw0pf{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-ubk92s{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
      attrs: {
        "data-hydrate": "1iyw4wu 89735a fw0pf 1d8ny0s 60fc11 ubk92s",
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
    '<style class="_styletron_hydrate_" data-hydrate="fw0pf 1d8ny0s 60fc11 ubk92s">.css-fw0pf{color:red;border:1px solid black;}.css-fw0pf:hover{color:green;}@media (min-width: 200px){.css-fw0pf{color:hotpink;}.css-fw0pf:hover{color:red;}}@media (min-width: 400px){.css-fw0pf{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-ubk92s{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}</style>',
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-hydrate="89735a fw0pf 1d8ny0s 60fc11 ubk92s">@keyframes animation-89735a{from{color:purple}50%{color:yellow}to{color:orange}}.css-fw0pf{color:red;border:1px solid black;}.css-fw0pf:hover{color:green;}@media (min-width: 200px){.css-fw0pf{color:hotpink;}.css-fw0pf:hover{color:red;}}@media (min-width: 400px){.css-fw0pf{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-ubk92s{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}</style>',
  );
  injectFixtureFontFace(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-hydrate="1iyw4wu 89735a fw0pf 1d8ny0s 60fc11 ubk92s">@font-face{font-family:font-1iyw4wu;src:local(\'Roboto\')}@keyframes animation-89735a{from{color:purple}50%{color:yellow}to{color:orange}}.css-fw0pf{color:red;border:1px solid black;}.css-fw0pf:hover{color:green;}@media (min-width: 200px){.css-fw0pf{color:hotpink;}.css-fw0pf:hover{color:red;}}@media (min-width: 400px){.css-fw0pf{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-ubk92s{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}</style>',
  );
  t.end();
});

test("StyletronServer prefix option", t => {
  const styletron = new Styletron({prefix: "foo_"});
  t.equal(styletron.renderStyle({color: "red"}), "foo_css-1gao8uk");
  t.equal(injectFixtureFontFace(styletron), "foo_font-1iyw4wu");
  t.equal(injectFixtureKeyframes(styletron), "foo_animation-89735a");
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        "@font-face{font-family:foo_font-1iyw4wu;src:local('Roboto')}@keyframes foo_animation-89735a{from{color:purple}50%{color:yellow}to{color:orange}}.foo_css-1gao8uk{color:red;}",
      attrs: {"data-hydrate": "1iyw4wu 89735a 1gao8uk"},
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
