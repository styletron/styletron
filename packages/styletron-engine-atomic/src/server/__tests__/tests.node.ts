import Styletron from "../server";

test("StyletronServer toCss", () => {
  const styletron = new Styletron();
  expect(styletron.getCss()).toBe("");

  injectFixtureStyles(styletron);
  expect(styletron.getCss()).toBe(
    ".ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (min-width: 600px){.ah{color:red}}@media (min-width: 800px){.ag{color:green}.ai:hover{color:green}}",
  );

  injectFixtureStyles(styletron);
  expect(styletron.getCss()).toBe(
    ".ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (min-width: 600px){.ah{color:red}}@media (min-width: 800px){.ag{color:green}.ai:hover{color:green}}",
  );

  injectFixtureKeyframes(styletron);
  expect(styletron.getCss()).toBe(
    "@keyframes ae{from{color:purple}50%{color:yellow}to{color:orange}}.ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (min-width: 600px){.ah{color:red}}@media (min-width: 800px){.ag{color:green}.ai:hover{color:green}}",
  );
});

test("StyletronServer getStylesheets", () => {
  const styletron = new Styletron();
  expect(styletron.getStylesheets()).toEqual([{css: "", attrs: {}}]);

  injectFixtureStyles(styletron);
  expect(styletron.getStylesheets()).toEqual([
    {
      css: ".ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {},
    },
    {css: ".ah{color:red}", attrs: {media: "(min-width: 600px)"}},
    {
      css: ".ag{color:green}.ai:hover{color:green}",
      attrs: {media: "(min-width: 800px)"},
    },
  ]);

  injectFixtureKeyframes(styletron);
  expect(styletron.getStylesheets()).toEqual([
    {
      css: "@keyframes ae{from{color:purple}50%{color:yellow}to{color:orange}}",
      attrs: {"data-hydrate": "keyframes"},
    },
    {
      css: ".ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {},
    },
    {css: ".ah{color:red}", attrs: {media: "(min-width: 600px)"}},
    {
      css: ".ag{color:green}.ai:hover{color:green}",
      attrs: {media: "(min-width: 800px)"},
    },
  ]);

  injectFixtureFontFace(styletron);
  expect(styletron.getStylesheets()).toEqual([
    {
      css: "@keyframes ae{from{color:purple}50%{color:yellow}to{color:orange}}",
      attrs: {"data-hydrate": "keyframes"},
    },
    {
      css: "@font-face{font-family:ae;src:local('Roboto')}",
      attrs: {"data-hydrate": "font-face"},
    },
    {
      css: ".ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {},
    },
    {css: ".ah{color:red}", attrs: {media: "(min-width: 600px)"}},
    {
      css: ".ag{color:green}.ai:hover{color:green}",
      attrs: {media: "(min-width: 800px)"},
    },
  ]);
});

test("StyletronServer getStylesheetsHtml ", () => {
  const styletron = new Styletron();
  expect(styletron.getStylesheetsHtml()).toBe(
    '<style class="_styletron_hydrate_"></style>',
  );

  injectFixtureStyles(styletron);
  expect(styletron.getStylesheetsHtml()).toBe(
    '<style class="_styletron_hydrate_">.ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(min-width: 600px)">.ah{color:red}</style><style class="_styletron_hydrate_" media="(min-width: 800px)">.ag{color:green}.ai:hover{color:green}</style>',
  );

  injectFixtureKeyframes(styletron);
  expect(styletron.getStylesheetsHtml()).toBe(
    '<style class="_styletron_hydrate_" data-hydrate="keyframes">@keyframes ae{from{color:purple}50%{color:yellow}to{color:orange}}</style><style class="_styletron_hydrate_">.ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(min-width: 600px)">.ah{color:red}</style><style class="_styletron_hydrate_" media="(min-width: 800px)">.ag{color:green}.ai:hover{color:green}</style>',
  );

  injectFixtureFontFace(styletron);
  expect(styletron.getStylesheetsHtml()).toBe(
    '<style class="_styletron_hydrate_" data-hydrate="keyframes">@keyframes ae{from{color:purple}50%{color:yellow}to{color:orange}}</style><style class="_styletron_hydrate_" data-hydrate="font-face">@font-face{font-family:ae;src:local(\'Roboto\')}</style><style class="_styletron_hydrate_">.ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(min-width: 600px)">.ah{color:red}</style><style class="_styletron_hydrate_" media="(min-width: 800px)">.ag{color:green}.ai:hover{color:green}</style>',
  );
});

test("StyletronServer prefix option", () => {
  const styletron = new Styletron({prefix: "foo_"});

  expect(styletron.renderStyle({color: "red"})).toBe("foo_ae");
  expect(injectFixtureFontFace(styletron)).toBe("foo_ae");
  expect(injectFixtureKeyframes(styletron)).toBe("foo_ae");

  expect(styletron.getStylesheets()).toEqual([
    {
      css: "@keyframes foo_ae{from{color:purple}50%{color:yellow}to{color:orange}}",
      attrs: {"data-hydrate": "keyframes"},
    },
    {
      css: "@font-face{font-family:foo_ae;src:local('Roboto')}",
      attrs: {"data-hydrate": "font-face"},
    },
    {css: ".foo_ae{color:red}", attrs: {}},
  ]);
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
