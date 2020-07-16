/* eslint-env browser */

import StyletronServer from "../../server/server";
import StyletronClient from "../client";
const reduce = Array.prototype.reduce;
const map = Array.prototype.map;

describe("client", () => {
  it("container config", () => {
    const instance = new StyletronClient();
    expect(instance.container).toBe(document.head);
  });

  it("automatic stylesheet insertion", () => {
    const container = document.createElement("div");
    document.body && document.body.appendChild(container);
    const instance = new StyletronClient({container});
    expect(instance.container).toStrictEqual(container);
    // lazy instantiation
    expect(document.styleSheets.length).toBe(0);
    expect(instance.renderStyle({color: "purple"})).toBe("css-hZftBk");
    expect(document.styleSheets.length).toBe(1);
    instance.container.remove();
    expect(document.styleSheets.length).toBe(0);
  });

  it("rendering", () => {
    const container = document.createElement("div");
    document.body && document.body.appendChild(container);
    const instance = new StyletronClient({container});
    expect(instance.renderStyle({color: "purple"})).toEqual("css-hZftBk");
    expect(sheetsToRules(document.styleSheets)).toEqual([
      {rules: [".css-hZftBk {color: purple;}"]},
    ]);
    expect(
      instance.renderStyle({
        "@media (min-width: 800px)": {color: "purple"},
      }),
    ).toEqual("css-hrykRm");

    expect(sheetsToRules(document.styleSheets)).toEqual([
      {
        rules: [".css-hZftBk {color: purple;}"],
      },
      {
        rules: ["@media (min-width: 800px) {.css-hrykRm {color: purple;}}"],
      },
    ]);

    instance.renderStyle({userSelect: "none"});
    expect(sheetsToRules(document.styleSheets)).toEqual([
      {rules: [".css-hZftBk {color: purple;}"]},
      {
        rules: ["@media (min-width: 800px) {.css-hrykRm {color: purple;}}"],
      },
      {
        rules: [
          ".css-eaGfYw {-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}",
        ],
      },
    ]);

    instance.renderStyle({display: "flex"});
    expect(sheetsToRules(document.styleSheets)).toEqual([
      {rules: [".css-hZftBk {color: purple;}"]},
      {
        rules: ["@media (min-width: 800px) {.css-hrykRm {color: purple;}}"],
      },
      {
        rules: [
          ".css-eaGfYw {-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}",
        ],
      },
      {rules: [".css-haOmqK {display: flex;}"]},
    ]);

    instance.renderStyle({
      "@media (min-width: 600px)": {
        color: "red",
      },
    });
    expect(sheetsToRules(document.styleSheets)).toEqual([
      {rules: [".css-hZftBk {color: purple;}"]},
      {
        rules: ["@media (min-width: 800px) {.css-hrykRm {color: purple;}}"],
      },
      {
        rules: [
          ".css-eaGfYw {-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}",
        ],
      },
      {rules: [".css-haOmqK {display: flex;}"]},
      {
        rules: ["@media (min-width: 600px) {.css-bWjoTf {color: red;}}"],
      },
    ]);

    instance.container.remove();
  });

  it("prefix", () => {
    const container = document.createElement("div");
    document.body && document.body.appendChild(container);
    const instance = new StyletronClient({container, prefix: "foo_"});
    expect(instance.renderStyle({color: "purple"})).toBe("foo_css-hZftBk");
    expect(instance.renderFontFace({src: "url(blah)"})).toBe("foo_font-lfxDGs");
    expect(
      instance.renderKeyframes({from: {color: "red"}, to: {color: "blue"}}),
    ).toBe("foo_animation-cmOXrn");

    expect(sheetsToRules(document.styleSheets)).toEqual([
      {rules: [".foo_css-hZftBk {color: purple;}"]},
      {
        rules: ["@font-face {font-family: foo_font-lfxDGs; src: url(blah);}"],
      },
      {
        rules: [
          "@keyframes foo_animation-cmOXrn { \n  from {color: red;} \n  to {color: blue;} \n}",
        ],
      },
    ]);

    instance.container.remove();
  });

  it("hydration", () => {
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

    expect(beforeSheetLength).toBe(afterSheetLength);
    expect(afterRules).toEqual(beforeRules);
    instance.renderStyle({margin: "10px"});

    const afterMarginRules = elementsToRules(getSheets());
    expect(afterMarginRules).toEqual([
      ...afterRules,
      {rules: [".css-iMIAew {margin: 10px;}"]},
    ]);

    cleanup();
  });

  it("StyletronClient deeply nested rules", () => {
    const container = document.createElement("div");
    document.body && document.body.appendChild(container);
    const instance = new StyletronClient({container});

    expect(
      instance.renderStyle({
        "@supports (flex-wrap: wrap)": {
          "@media (min-width: 50em)": {
            ":hover": {
              background: "blue",
            },
          },
        },
      }),
    ).toBe("css-gPyDTX");

    expect(sheetsToRules(document.styleSheets)).toEqual([
      {
        rules: [
          "@supports (flex-wrap: wrap) {@media (min-width: 50em) {.css-gPyDTX:hover {background: blue;}}}",
        ],
      },
    ]);

    instance.container.remove();
  });
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
      return container.children;
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
      return [...acc, {rules: sheetToRules(sheet)}];
    },
    [],
  );
}
