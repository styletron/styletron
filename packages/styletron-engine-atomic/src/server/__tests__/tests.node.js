import test from "tape";
import Styletron from "../server.js";

test("StyletronServer toCss", t => {
  const styletron = new Styletron();
  t.equal(styletron.getCss(), "", "returns empty string when no styles");
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getCss(),
    ".a{color:red}.b{color:green}.e:hover{display:none}.f{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.g{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (max-width: 800px){.c{color:green}.d:hover{color:green}}"
  );
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getCss(),
    ".a{color:red}.b{color:green}.e:hover{display:none}.f{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.g{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (max-width: 800px){.c{color:green}.d:hover{color:green}}"
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getCss(),
    ".a{color:red}.b{color:green}.e:hover{display:none}.f{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.g{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (max-width: 800px){.c{color:green}.d:hover{color:green}}@keyframes a{from{color:purple}50%{color:yellow}to{color:orange}}"
  );
  t.end();
});

test("StyletronServer getStylesheets", t => {
  const styletron = new Styletron();
  t.deepEqual(
    styletron.getStylesheets(),
    [{css: "", attrs: {}}],
    "no styles yields array with single empty stylesheet"
  );
  injectFixtureStyles(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        ".a{color:red}.b{color:green}.e:hover{display:none}.f{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.g{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {}
    },
    {
      css: ".c{color:green}.d:hover{color:green}",
      attrs: {media: "(max-width: 800px)"}
    }
  ]);
  injectFixtureKeyframes(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        ".a{color:red}.b{color:green}.e:hover{display:none}.f{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.g{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {}
    },
    {
      css: ".c{color:green}.d:hover{color:green}",
      attrs: {media: "(max-width: 800px)"}
    },
    {
      css: "@keyframes a{from{color:purple}50%{color:yellow}to{color:orange}}",
      attrs: {"data-hydrate": "keyframes"}
    }
  ]);
  injectFixtureFontFace(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css: "@font-face{font-family:a;src:local('Roboto')}",
      attrs: {"data-hydrate": "font-face"}
    },
    {
      css:
        ".a{color:red}.b{color:green}.e:hover{display:none}.f{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.g{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {}
    },
    {
      css: ".c{color:green}.d:hover{color:green}",
      attrs: {media: "(max-width: 800px)"}
    },
    {
      css: "@keyframes a{from{color:purple}50%{color:yellow}to{color:orange}}",
      attrs: {"data-hydrate": "keyframes"}
    }
  ]);
  t.end();
});

test("StyletronServer getStylesheetsHtml ", t => {
  const styletron = new Styletron();
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_"></style>',
    "returns single empty stylesheet when no styles"
  );

  injectFixtureStyles(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_">.a{color:red}.b{color:green}.e:hover{display:none}.f{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.g{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(max-width: 800px)">.c{color:green}.d:hover{color:green}</style>'
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_">.a{color:red}.b{color:green}.e:hover{display:none}.f{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.g{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(max-width: 800px)">.c{color:green}.d:hover{color:green}</style><style class="_styletron_hydrate_" data-hydrate="keyframes">@keyframes a{from{color:purple}50%{color:yellow}to{color:orange}}</style>'
  );
  injectFixtureFontFace(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-hydrate="font-face">@font-face{font-family:a;src:local(\'Roboto\')}</style><style class="_styletron_hydrate_">.a{color:red}.b{color:green}.e:hover{display:none}.f{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.g{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(max-width: 800px)">.c{color:green}.d:hover{color:green}</style><style class="_styletron_hydrate_" data-hydrate="keyframes">@keyframes a{from{color:purple}50%{color:yellow}to{color:orange}}</style>'
  );
  t.end();
});

function injectFixtureStyles(styletron) {
  styletron.renderStyle({color: "red"});
  styletron.renderStyle({color: "green"});
  styletron.renderStyle({
    "@media (max-width: 800px)": {
      color: "green"
    }
  });
  styletron.renderStyle({
    "@media (max-width: 800px)": {
      ":hover": {
        color: "green"
      }
    }
  });
  styletron.renderStyle({
    ":hover": {
      display: "none"
    }
  });
  styletron.renderStyle({
    userSelect: "none"
  });
  styletron.renderStyle({
    display: "flex"
  });
}

function injectFixtureKeyframes(styletron) {
  styletron.renderKeyframes({
    from: {
      color: "purple"
    },
    "50%": {
      color: "yellow"
    },
    to: {
      color: "orange"
    }
  });
}

function injectFixtureFontFace(styletron) {
  styletron.renderFontFace({
    src: "local('Roboto')"
  });
}
