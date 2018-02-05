// @flow

import test from "tape";
import Styletron from "../server.js";

test("StyletronServer toCss", t => {
  const styletron = new Styletron();
  t.equal(styletron.getCss(), "", "returns empty string when no styles");
  injectFixtureStyles(styletron);
  t.equal(
    styletron.getCss(),
    ".e:hover{display:none}.a{color:red}.b{color:green}@media (max-width: 800px){.d:hover{color:green}.c{color:green}}"
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getCss(),
    ".e:hover{display:none}.a{color:red}.b{color:green}@media (max-width: 800px){.d:hover{color:green}.c{color:green}}"
  );
  t.end();
});

test("StyletronServer getStylesheets", t => {
  const styletron = new Styletron();
  t.deepEqual(
    styletron.getStylesheets(),
    [{css: "", media: ""}],
    "no styles yields array with single empty stylesheet"
  );
  injectFixtureStyles(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css: ".e:hover{display:none}.a{color:red}.b{color:green}",
      media: ""
    },
    {
      media: "(max-width: 800px)",
      css: ".d:hover{color:green}.c{color:green}"
    }
  ]);
  injectFixtureKeyframes(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css: ".e:hover{display:none}.a{color:red}.b{color:green}",
      media: ""
    },
    {
      media: "(max-width: 800px)",
      css: ".d:hover{color:green}.c{color:green}"
    },
    {
      css:
        "@keyframes _7dq3db{from:{color:purple}50%:{color:yellow}to:{color:orange}}",
      keyframesIds: ["_7dq3db"]
    }
  ]);
  injectFixtureFontFace(styletron);
  t.deepEqual(styletron.getStylesheets(), [
    {
      css: "@font-face{font-family:\"_1ja65lo\";src:local('Roboto')}",
      fontFaceIds: ["_1ja65lo"]
    },
    {
      css: ".e:hover{display:none}.a{color:red}.b{color:green}",
      media: ""
    },
    {
      media: "(max-width: 800px)",
      css: ".d:hover{color:green}.c{color:green}"
    },
    {
      css:
        "@keyframes _7dq3db{from:{color:purple}50%:{color:yellow}to:{color:orange}}",
      keyframesIds: ["_7dq3db"]
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
    '<style class="_styletron_hydrate_">.e:hover{display:none}.a{color:red}.b{color:green}</style><style class="_styletron_hydrate_" media="(max-width: 800px)">.d:hover{color:green}.c{color:green}</style>'
  );
  injectFixtureKeyframes(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_">.e:hover{display:none}.a{color:red}.b{color:green}</style><style class="_styletron_hydrate_" media="(max-width: 800px)">.d:hover{color:green}.c{color:green}</style><style class="_styletron_hydrate_" data-keyframes="_7dq3db">@keyframes _7dq3db{from:{color:purple}50%:{color:yellow}to:{color:orange}}</style>'
  );
  injectFixtureFontFace(styletron);
  t.equal(
    styletron.getStylesheetsHtml(),
    '<style class="_styletron_hydrate_" data-font-face="_1ja65lo">@font-face{font-family:"_1ja65lo";src:local(\'Roboto\')}</style><style class="_styletron_hydrate_">.e:hover{display:none}.a{color:red}.b{color:green}</style><style class="_styletron_hydrate_" media="(max-width: 800px)">.d:hover{color:green}.c{color:green}</style><style class="_styletron_hydrate_" data-keyframes="_7dq3db">@keyframes _7dq3db{from:{color:purple}50%:{color:yellow}to:{color:orange}}</style>'
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
