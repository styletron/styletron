/* eslint-disable no-undefined */
// @flow

import test from "tape";
import Styletron from "../server.js";
import {
  injectFixtureStyles,
  injectFixtureKeyframes,
  injectFixtureFontFace,
} from "./fixtures";

test("StyletronServer getCss", t => {
  const styletron = new Styletron();
  t.equal(styletron.getCss(), "", "returns empty string when no styles");
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getCss(),
    ".ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (min-width: 600px){.ah{color:red}}@media (min-width: 800px){.ag{color:green}.ai:hover{color:green}}",
  );
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getCss(),
    ".ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (min-width: 600px){.ah{color:red}}@media (min-width: 800px){.ag{color:green}.ai:hover{color:green}}",
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getCss(),
    "@keyframes ae{from{color:purple}50%{color:yellow}to{color:orange}}.ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}@media (min-width: 600px){.ah{color:red}}@media (min-width: 800px){.ag{color:green}.ai:hover{color:green}}",
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
      insertBeforeMedia: undefined,
      css:
        ".ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {},
    },
    {
      insertBeforeMedia: undefined,
      css: ".ah{color:red}",
      attrs: {media: "(min-width: 600px)"},
    },
    {
      insertBeforeMedia: undefined,
      css: ".ag{color:green}.ai:hover{color:green}",
      attrs: {media: "(min-width: 800px)"},
    },
  ]);
  injectFixtureKeyframes(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css: "@keyframes ae{from{color:purple}50%{color:yellow}to{color:orange}}",
      attrs: {"data-hydrate": "keyframes"},
    },
    {
      insertBeforeMedia: undefined,
      css:
        ".ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {},
    },
    {
      insertBeforeMedia: undefined,
      css: ".ah{color:red}",
      attrs: {media: "(min-width: 600px)"},
    },
    {
      insertBeforeMedia: undefined,
      css: ".ag{color:green}.ai:hover{color:green}",
      attrs: {media: "(min-width: 800px)"},
    },
  ]);
  injectFixtureFontFace(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css: "@keyframes ae{from{color:purple}50%{color:yellow}to{color:orange}}",
      attrs: {"data-hydrate": "keyframes"},
    },
    {
      css: "@font-face{font-family:ae;src:local('Roboto')}",
      attrs: {"data-hydrate": "font-face"},
    },
    {
      insertBeforeMedia: undefined,
      css:
        ".ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}",
      attrs: {},
    },
    {
      insertBeforeMedia: undefined,
      css: ".ah{color:red}",
      attrs: {media: "(min-width: 600px)"},
    },
    {
      insertBeforeMedia: undefined,
      css: ".ag{color:green}.ai:hover{color:green}",
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
    '<style class="_styletron_hydrate_">.ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(min-width: 600px)">.ah{color:red}</style><style class="_styletron_hydrate_" media="(min-width: 800px)">.ag{color:green}.ai:hover{color:green}</style>',
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-hydrate="keyframes">@keyframes ae{from{color:purple}50%{color:yellow}to{color:orange}}</style><style class="_styletron_hydrate_">.ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(min-width: 600px)">.ah{color:red}</style><style class="_styletron_hydrate_" media="(min-width: 800px)">.ag{color:green}.ai:hover{color:green}</style>',
  );
  injectFixtureFontFace(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-hydrate="keyframes">@keyframes ae{from{color:purple}50%{color:yellow}to{color:orange}}</style><style class="_styletron_hydrate_" data-hydrate="font-face">@font-face{font-family:ae;src:local(\'Roboto\')}</style><style class="_styletron_hydrate_">.ae{color:red}.af{color:green}.aj:hover{display:none}.ak{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.al{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}</style><style class="_styletron_hydrate_" media="(min-width: 600px)">.ah{color:red}</style><style class="_styletron_hydrate_" media="(min-width: 800px)">.ag{color:green}.ai:hover{color:green}</style>',
  );
  t.end();
});

test("StyletronServer prefix option", t => {
  const styletron = new Styletron({prefix: "foo_"});
  t.equal(styletron.renderStyle({color: "red"}), "foo_ae");
  t.equal(injectFixtureFontFace(styletron), "foo_ae");
  t.equal(injectFixtureKeyframes(styletron), "foo_ae");
  t.deepEqual(styletron.getStylesheets(), [
    {
      css:
        "@keyframes foo_ae{from{color:purple}50%{color:yellow}to{color:orange}}",
      attrs: {"data-hydrate": "keyframes"},
    },
    {
      css: "@font-face{font-family:foo_ae;src:local('Roboto')}",
      attrs: {"data-hydrate": "font-face"},
    },
    {
      insertBeforeMedia: undefined,
      css: ".foo_ae{color:red}",
      attrs: {},
    },
  ]);
  t.end();
});
