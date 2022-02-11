// @flow

import test from "tape";
import Styletron from "../server.js";

test("StyletronServer toCss", t => {
  const styletron = new Styletron();
  t.equal(styletron.getCss(), "", "returns empty string when no styles");
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getCss(),
    ".a{color:red}.b{color:green}.f:hover{display:none}.g{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.h{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (min-width: 600px){.d{color:red}}@media (min-width: 800px){.c{color:green}.e:hover{color:green}}",
  );
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getCss(),
    ".a{color:red}.b{color:green}.f:hover{display:none}.g{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.h{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (min-width: 600px){.d{color:red}}@media (min-width: 800px){.c{color:green}.e:hover{color:green}}",
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getCss(),
    "@keyframes a{from{color:purple}50%{color:yellow}to{color:orange}}.a{color:red}.b{color:green}.f:hover{display:none}.g{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.h{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (min-width: 600px){.d{color:red}}@media (min-width: 800px){.c{color:green}.e:hover{color:green}}",
  );
  t.end();
});

test("StyletronServer getStylesheets", t => {
  const styletron = new Styletron();
  t.deepEqual(
    styletron.getStylesheets(),
    [{css: "", attrs: {}}],
    "no styles yields array with single empty stylesheet",
  );
  injectFixtureStyles(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        ".a{color:red}.b{color:green}.f:hover{display:none}.g{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.h{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {},
    },
    {css: ".d{color:red}", attrs: {media: "(min-width: 600px)"}},
    {
      css: ".c{color:green}.e:hover{color:green}",
      attrs: {media: "(min-width: 800px)"},
    },
  ]);
  injectFixtureKeyframes(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css: "@keyframes a{from{color:purple}50%{color:yellow}to{color:orange}}",
      attrs: {"data-hydrate": "keyframes"},
    },
    {
      css:
        ".a{color:red}.b{color:green}.f:hover{display:none}.g{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.h{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {},
    },
    {css: ".d{color:red}", attrs: {media: "(min-width: 600px)"}},
    {
      css: ".c{color:green}.e:hover{color:green}",
      attrs: {media: "(min-width: 800px)"},
    },
  ]);
  injectFixtureFontFace(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css: "@keyframes a{from{color:purple}50%{color:yellow}to{color:orange}}",
      attrs: {"data-hydrate": "keyframes"},
    },
    {
      css: "@font-face{font-family:a;src:local('Roboto')}",
      attrs: {"data-hydrate": "font-face"},
    },
    {
      css:
        ".a{color:red}.b{color:green}.f:hover{display:none}.g{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.h{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {},
    },
    {css: ".d{color:red}", attrs: {media: "(min-width: 600px)"}},
    {
      css: ".c{color:green}.e:hover{color:green}",
      attrs: {media: "(min-width: 800px)"},
    },
  ]);
  t.end();
});

test("StyletronServer getStylesheetsHtml ", t => {
  const styletron = new Styletron();
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_"></style>',
    "returns single empty stylesheet when no styles",
  );

  injectFixtureStyles(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_">.a{color:red}.b{color:green}.f:hover{display:none}.g{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.h{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(min-width: 600px)">.d{color:red}</style><style class="_styletron_hydrate_" media="(min-width: 800px)">.c{color:green}.e:hover{color:green}</style>',
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-hydrate="keyframes">@keyframes a{from{color:purple}50%{color:yellow}to{color:orange}}</style><style class="_styletron_hydrate_">.a{color:red}.b{color:green}.f:hover{display:none}.g{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.h{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(min-width: 600px)">.d{color:red}</style><style class="_styletron_hydrate_" media="(min-width: 800px)">.c{color:green}.e:hover{color:green}</style>',
  );
  injectFixtureFontFace(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-hydrate="keyframes">@keyframes a{from{color:purple}50%{color:yellow}to{color:orange}}</style><style class="_styletron_hydrate_" data-hydrate="font-face">@font-face{font-family:a;src:local(\'Roboto\')}</style><style class="_styletron_hydrate_">.a{color:red}.b{color:green}.f:hover{display:none}.g{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.h{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(min-width: 600px)">.d{color:red}</style><style class="_styletron_hydrate_" media="(min-width: 800px)">.c{color:green}.e:hover{color:green}</style>',
  );
  t.end();
});

test("StyletronServer prefix option", t => {
  const styletron = new Styletron({prefix: "foo_"});
  t.equal(styletron.renderStyle({color: "red"}), "foo_a");
  t.equal(injectFixtureFontFace(styletron), "foo_a");
  t.equal(injectFixtureKeyframes(styletron), "foo_a");
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        "@keyframes foo_a{from{color:purple}50%{color:yellow}to{color:orange}}",
      attrs: {"data-hydrate": "keyframes"},
    },
    {
      css: "@font-face{font-family:foo_a;src:local('Roboto')}",
      attrs: {"data-hydrate": "font-face"},
    },
    {css: ".foo_a{color:red}", attrs: {}},
  ]);
  t.end();
});

function injectFixtureStyles(styletron) {
  styletron.renderStyle({color: "red"});
  styletron.renderStyle({color: "green"});
  styletron.renderStyle({
    "@media (min-width: 800px)": {
      color: "green",
    },
  });
  // should be added before "min-width: 800px" query
  // test that Styletron properly sort media queries
  styletron.renderStyle({
    "@media (min-width: 600px)": {
      color: "red",
    },
  });
  styletron.renderStyle({
    "@media (min-width: 800px)": {
      ":hover": {
        color: "green",
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
    ":hover": {
      display: "none",
    },
  });
  styletron.renderStyle({
    userSelect: "none",
  });
  styletron.renderStyle({
    display: "flex",
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
