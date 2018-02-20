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
    "container defaults to document.head"
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
    "a",
    "new unique class returned"
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
    "a",
    "new unique class returned"
  );
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {media: "", rules: [".a { color: purple; }"]}
  ]);
  t.equal(
    instance.renderStyle({
      "@media (max-width: 800px)": {color: "purple"}
    }),
    "b",
    "new unique class returned"
  );
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {media: "", rules: [".a { color: purple; }"]},
    {media: "(max-width: 800px)", rules: [".b { color: purple; }"]}
  ]);
  instance.renderStyle({
    userSelect: "none"
  });
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {media: "", rules: [".a { color: purple; }", ".c { user-select: none; }"]},
    {media: "(max-width: 800px)", rules: [".b { color: purple; }"]}
  ]);
  instance.renderStyle({
    display: "flex"
  });
  t.deepEqual(sheetsToRules(document.styleSheets), [
    {
      media: "",
      rules: [
        ".a { color: purple; }",
        ".c { user-select: none; }",
        ".d { display: flex; }"
      ]
    },
    {media: "(max-width: 800px)", rules: [".b { color: purple; }"]}
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
  const instance = new StyletronClient(getSheets());

  const before = elementsToRules(getSheets());
  injectFixtureStyles(instance);
  const after = elementsToRules(getSheets());
  t.deepEqual(
    before,
    after,
    "CSSStylesheet rules not changed after rendering hydrated styles"
  );
  cleanup();
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
    }
  };
}

function sheetToRules(sheet) {
  return reduce.call(
    sheet.cssRules,
    (acc, rule) => {
      return [...acc, rule.cssText];
    },
    []
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
        {media: sheet.media.mediaText, rules: sheetToRules(sheet)}
      ];
    },
    []
  );
}
