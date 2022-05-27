// @flow

/* eslint-env browser */

import StyletronServer from "../../server/server.js";
import StyletronClient from "../client.js";
import test from "tape";
const reduce = Array.prototype.reduce;
const map = Array.prototype.map;

test("container config", t => {
  const instance = new StyletronClient();
  t.strictEqual(
    instance.container,
    document.head,
    "container defaults to document.head",
  );
  t.end();
});

test("automatic stylesheet insertion", t => {
  const container = document.createElement("div");
  document.body && document.body.appendChild(container);
  const instance = new StyletronClient({container});
  t.strictEqual(instance.container, container, "uses container config");
  // lazy instantiation
  t.equal(document.styleSheets.length, 0, "sheet not yet instantiated");
  t.equal(
    instance.renderStyle({color: "purple"}),
    "css-hZftBk",
    "new unique class returned",
  );
  t.equal(document.styleSheets.length, 1, "sheet added");
  instance.container.remove();
  t.equal(document.styleSheets.length, 0, "no sheets after container removed");
  t.end();
});

test("rendering", t => {
  const container = document.createElement("div");
  document.body && document.body.appendChild(container);
  const instance = new StyletronClient({container});

  t.equal(
    instance.renderStyle({color: "purple"}),
    "css-hZftBk",
    "new unique class returned",
  );
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {media: "", rules: [".css-hZftBk { color: purple; }"]},
  ]);

  t.equal(
    instance.renderStyle({
      "@media (min-width: 800px)": {color: "purple"},
    }),
    "css-hrykRm",
    "new unique class returned",
  );
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {
      media: "",
      rules: [".css-hZftBk { color: purple; }"],
    },
    {
      media: "",
      rules: [
        "@media (min-width: 800px) {\n  .css-hrykRm { color: purple; }\n}",
      ],
    },
  ]);

  instance.renderStyle({
    userSelect: "none",
  });
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {media: "", rules: [".css-hZftBk { color: purple; }"]},
    {
      media: "",
      rules: [
        "@media (min-width: 800px) {\n  .css-hrykRm { color: purple; }\n}",
      ],
    },
    {media: "", rules: [".css-eaGfYw { user-select: none; }"]},
  ]);

  instance.renderStyle({
    display: "flex",
  });
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {media: "", rules: [".css-hZftBk { color: purple; }"]},
    {
      media: "",
      rules: [
        "@media (min-width: 800px) {\n  .css-hrykRm { color: purple; }\n}",
      ],
    },
    {media: "", rules: [".css-eaGfYw { user-select: none; }"]},
    {media: "", rules: [".css-haOmqK { display: flex; }"]},
  ]);

  instance.renderStyle({
    "@media (min-width: 600px)": {
      color: "red",
    },
  });
  t.deepEqual(
    sheetsToRules(document.styleSheets),
    [
      {media: "", rules: [".css-hZftBk { color: purple; }"]},
      {
        media: "",
        rules: [
          "@media (min-width: 800px) {\n  .css-hrykRm { color: purple; }\n}",
        ],
      },
      {media: "", rules: [".css-eaGfYw { user-select: none; }"]},
      {media: "", rules: [".css-haOmqK { display: flex; }"]},
      {
        media: "",
        rules: [
          "@media (min-width: 600px) {\n  .css-bWjoTf { color: red; }\n}",
        ],
      },
    ],
    "order of rules is preserved",
  );

  instance.container.remove();
  t.end();
});

test("prefix", t => {
  const container = document.createElement("div");
  document.body && document.body.appendChild(container);
  const instance = new StyletronClient({container, prefix: "foo_"});
  t.equal(
    instance.renderStyle({color: "purple"}),
    "foo_css-hZftBk",
    "new unique class returned",
  );
  t.equal(
    instance.renderFontFace({src: "url(blah)"}),
    "foo_font-lfxDGs",
    "new unique font family returned",
  );
  t.equal(
    instance.renderKeyframes({from: {color: "red"}, to: {color: "blue"}}),
    "foo_animation-cmOXrn",
    "new unique animation name returned",
  );
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {media: "", rules: [".foo_css-hZftBk { color: purple; }"]},
    {
      media: "",
      rules: ['@font-face { font-family: foo_font-lfxDGs; src: url("blah"); }'],
    },
    {
      media: "",
      rules: [
        "@keyframes foo_animation-cmOXrn { \n  0% { color: red; }\n  100% { color: blue; }\n}",
      ],
    },
  ]);
  instance.container.remove();
  t.end();
});

test("hydration", t => {
  const {getSheets, cleanup, container} = setup();

  // SSR
  const server = new StyletronServer();
  injectFixtureStyles(server);
  container.innerHTML = server.getStylesheetsHtml();

  // Hydration
  const instance = new StyletronClient({
    hydrate: getSheets(),
  });

  const beforeSheetLength = document.styleSheets.length;
  const beforeRules = elementsToRules(getSheets());
  injectFixtureStyles(instance);
  const afterSheetLength = document.styleSheets.length;
  const afterRules = elementsToRules(getSheets());
  t.equal(
    beforeSheetLength,
    afterSheetLength,
    "number of stylesheets should not have changed",
  );
  t.deepEqual(
    afterRules,
    beforeRules,
    "CSSStylesheet rules not changed after rendering hydrated styles",
  );
  instance.renderStyle({
    margin: "10px",
  });
  const afterMarginRules = elementsToRules(getSheets());
  t.deepEqual(
    [...afterRules, {media: "", rules: [".css-iMIAew { margin: 10px; }"]}],
    afterMarginRules,
    "CSSStylesheet rules should get a new rule",
  );
  cleanup();
  t.end();
});

test("StyletronClient deeply nested rules", t => {
  const container = document.createElement("div");
  document.body && document.body.appendChild(container);
  const instance = new StyletronClient({container});

  t.equal(
    instance.renderStyle({
      "@supports (flex-wrap: wrap)": {
        "@media (min-width: 50em)": {
          color: "green",
          ":hover": {
            color: "blue",
          },
        },
      },
    }),
    "css-jrXsOI",
  );
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {
      media: "",
      rules: [
        "@supports (flex-wrap: wrap) {\n  @media (min-width: 50em) {\n  .css-jrXsOI { color: green; }\n  .css-jrXsOI:hover { color: blue; }\n}\n}",
      ],
    },
  ]);

  instance.renderStyle({
    ":hover": {
      color: "blue",
      "::after": {
        content: '"abc"',
      },
    },
  });
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {
      media: "",
      rules: [
        "@supports (flex-wrap: wrap) {\n  @media (min-width: 50em) {\n  .css-jrXsOI { color: green; }\n  .css-jrXsOI:hover { color: blue; }\n}\n}",
      ],
    },
    {
      media: "",
      rules: [
        ".css-hFfBmH:hover { color: blue; }",
        '.css-hFfBmH:hover::after { content: "abc"; }',
      ],
    },
  ]);

  instance.container.remove();
  t.end();
});

test("reference another class name", t => {
  const container = document.createElement("div");
  document.body && document.body.appendChild(container);
  const instance = new StyletronClient({container});

  t.equal(
    instance.renderStyle({
      color: "blue",
    }),
    "css-yrgMo",
  );
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {media: "", rules: [".css-yrgMo { color: blue; }"]},
  ]);

  instance.renderStyle({
    ".css-yrgMo:hover": {
      color: "green",
    },
  });
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {media: "", rules: [".css-yrgMo { color: blue; }"]},
    {media: "", rules: [".css-yrgMo:hover { color: green; }"]},
  ]);

  instance.container.remove();
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
  styletron.renderFontFace({src: "url(blah)"});
  styletron.renderKeyframes({from: {color: "red"}, to: {color: "blue"}});
}

function setup() {
  const container = document.createElement("div");
  if (document.body === void 0) {
    throw new Error("no body");
  }

  if (document.body === null) {
    throw new Error("body is null");
  }
  document.body.appendChild(container);

  return {
    container,
    getSheets() {
      return ((container.children: any): HTMLCollection<HTMLStyleElement>);
    },
    cleanup() {
      container.remove();
    },
  };
}

function sheetToRules(sheet) {
  return reduce.call(
    sheet.cssRules,
    (acc, rule) => {
      return [...acc, rule.cssText];
    },
    [],
  );
}

function elementsToRules(elements) {
  return sheetsToRules(map.call(elements, el => el.sheet));
}

function sheetsToRules(sheets) {
  return reduce.call(
    sheets,
    (acc, sheet) => {
      return [
        ...acc,
        {media: sheet.media.mediaText, rules: sheetToRules(sheet)},
      ];
    },
    [],
  );
}
