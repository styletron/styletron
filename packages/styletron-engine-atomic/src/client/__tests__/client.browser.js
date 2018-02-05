// @flow
/* eslint-env browser */

import StyletronServer from "../../server/server.js";
import StyletronClient from "../client.js";
import test from "tape";
const reduce = Array.prototype.reduce;
const some = Array.prototype.some;
const map = Array.prototype.map;

test("automatically inserts a stylesheet given an empty element collection", t => {
  t.equal(document.styleSheets.length, 0);
  const instance = new StyletronClient([]);
  t.equal(document.styleSheets.length, 1);
  t.ok(
    instance.mainSheet instanceof HTMLStyleElement,
    "main stylesheet automatically created"
  );
  t.ok(
    some.call(
      document.styleSheets,
      sheet => sheet === instance.mainSheet.sheet
    ),
    "new sheet is appended to DOM"
  );
  instance.mainSheet.remove();
  t.equal(document.styleSheets.length, 0);
  t.end();
});

test("rendering", t => {
  const instance = new StyletronClient([]);
  // const newClass = ;
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

  instance.mainSheet.remove();
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
    "sheet CSS not changed after rendering hyrdated style"
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
