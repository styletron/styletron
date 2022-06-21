import Styletron from "../server";

describe("server", () => {
  it("StyletronServer toCss", () => {
    const styletron = new Styletron();
    expect(styletron.getCss()).toBe("");

    injectFixtureStyles(styletron);
    expect(styletron.getCss()).toBe(
      ".css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
    );

    injectFixtureStyles(styletron);
    expect(styletron.getCss()).toBe(
      ".css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
    );

    injectFixtureKeyframes(styletron);
    expect(styletron.getCss()).toBe(
      ".css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}",
    );

    injectFixtureFontFace(styletron);
    expect(styletron.getCss()).toBe(
      ".css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}@font-face{font-family:font-WNyjs;src:local('Roboto')}",
    );
  });

  it("StyletronServer getStylesheets", () => {
    const styletron = new Styletron();
    expect(styletron.getStylesheets()).toEqual([
      {css: "", attrs: {"data-hydrate": ""}},
    ]);

    injectFixtureStyles(styletron);
    expect(styletron.getStylesheets()).toEqual([
      {
        css: ".css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}",
        attrs: {"data-hydrate": "gMxcYW PKJb ihRfbR eaGfYw"},
      },
    ]);

    injectFixtureKeyframes(styletron);
    expect(styletron.getStylesheets()).toEqual([
      {
        css: ".css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}",
        attrs: {"data-hydrate": "gMxcYW PKJb ihRfbR eaGfYw blGUxF"},
      },
    ]);

    injectFixtureFontFace(styletron);
    expect(styletron.getStylesheets()).toEqual([
      {
        css: ".css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}@font-face{font-family:font-WNyjs;src:local('Roboto')}",
        attrs: {
          "data-hydrate": "gMxcYW PKJb ihRfbR eaGfYw blGUxF WNyjs",
        },
      },
    ]);
  });

  it("StyletronServer getStylesheetsHtml ", () => {
    const styletron = new Styletron();
    expect(styletron.getStylesheetsHtml()).toBe(
      '<style class="_styletron_hydrate_" data-hydrate=""></style>',
    );

    injectFixtureStyles(styletron);
    expect(styletron.getStylesheetsHtml()).toBe(
      '<style class="_styletron_hydrate_" data-hydrate="gMxcYW PKJb ihRfbR eaGfYw">.css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}</style>',
    );

    injectFixtureKeyframes(styletron);
    expect(styletron.getStylesheetsHtml()).toBe(
      '<style class="_styletron_hydrate_" data-hydrate="gMxcYW PKJb ihRfbR eaGfYw blGUxF">.css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}</style>',
    );

    injectFixtureFontFace(styletron);
    expect(styletron.getStylesheetsHtml()).toBe(
      '<style class="_styletron_hydrate_" data-hydrate="gMxcYW PKJb ihRfbR eaGfYw blGUxF WNyjs">.css-gMxcYW{color:red;border:1px solid black;}.css-gMxcYW:hover{color:green;}@media (min-width: 200px){.css-gMxcYW{color:hotpink;}.css-gMxcYW:hover{color:red;}}@media (min-width: 400px){.css-gMxcYW{color:violet;}}@supports (display: grid){div{display:-ms-grid;display:grid;}}.css-eaGfYw{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}@keyframes animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}@font-face{font-family:font-WNyjs;src:local(\'Roboto\')}</style>',
    );
  });

  it("StyletronServer prefix option", () => {
    const styletron = new Styletron({prefix: "foo_"});
    expect(styletron.renderStyle({color: "red"})).toBe("foo_css-jZABor");
    expect(injectFixtureFontFace(styletron)).toBe("foo_font-WNyjs");
    expect(injectFixtureKeyframes(styletron)).toBe("foo_animation-blGUxF");
    expect(styletron.getStylesheets()).toEqual([
      {
        css: ".foo_css-jZABor{color:red;}@font-face{font-family:foo_font-WNyjs;src:local('Roboto')}@keyframes foo_animation-blGUxF{from{color:purple}50%{color:yellow}to{color:orange}}",
        attrs: {"data-hydrate": "jZABor WNyjs blGUxF"},
      },
    ]);
  });

  it("StyletronServer deeply nested rules", () => {
    const styletron = new Styletron({});
    expect(
      styletron.renderStyle({
        "@supports (flex-wrap: wrap)": {
          "@media (min-width: 50em)": {
            ":hover": {
              background: "blue",
            },
          },
        },
      }),
    ).toBe("css-gPyDTX");

    expect(styletron.getStylesheets()).toEqual([
      {
        css: "@supports (flex-wrap: wrap){@media (min-width: 50em){.css-gPyDTX:hover{background:blue;}}}",
        attrs: {"data-hydrate": "gPyDTX"},
      },
    ]);
  });
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
