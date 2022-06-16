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
      {media: "", rules: [".css-hZftBk {color: purple;}"]},
    ]);
    expect(
      instance.renderStyle({
        "@media (min-width: 800px)": {color: "purple"},
      }),
    ).toEqual("css-hrykRm");

    expect(sheetsToRules(document.styleSheets)).toEqual([
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

    instance.renderStyle({userSelect: "none"});
    expect(sheetsToRules(document.styleSheets)).toEqual([
      {media: "", rules: [".css-hZftBk {color: purple;}"]},
      {
        media: "",
        rules: ["@media (min-width: 800px) {.css-hrykRm {color: purple;}}"],
      },
      {
        media: "",
        rules: [
          "@media (min-width: 800px) {\n  .css-hrykRm { color: purple; }\n}",
        ],
      },
      {media: "", rules: [".css-eaGfYw { user-select: none; }"]},
    ]);

    instance.renderStyle({display: "flex"});
    expect(sheetsToRules(document.styleSheets)).toEqual([
      {media: "", rules: [".css-hZftBk {color: purple;}"]},
      {
        media: "",
        rules: ["@media (min-width: 800px) {.css-hrykRm {color: purple;}}"],
      },
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
    expect(sheetsToRules(document.styleSheets)).toEqual([
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
      {media: "", rules: [".foo_css-hZftBk { color: purple; }"]},
      {
        media: "",
        rules: [
          '@font-face { font-family: foo_font-lfxDGs; src: url("blah"); }',
        ],
      },
      {
        media: "",
        rules: [
          "@keyframes foo_animation-cmOXrn { \n  0% { color: red; }\n  100% { color: blue; }\n}",
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
      {media: "", rules: [".css-iMIAew { margin: 10px; }"]},
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
            color: "green",
            ":hover": {
              color: "blue",
            },
          },
        },
      }),
    ).toBe("css-jrXsOI");
    expect(sheetsToRules(document.styleSheets)).toEqual([
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
    expect(sheetsToRules(document.styleSheets)).toEqual([
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
  });

  it("reference another class name", () => {
    const container = document.createElement("div");
    document.body && document.body.appendChild(container);
    const instance = new StyletronClient({container});

    expect(
      instance.renderStyle({
        color: "blue",
      }),
    ).toBe("css-yrgMo");
    expect(sheetsToRules(document.styleSheets)).toEqual([
      {media: "", rules: [".css-yrgMo { color: blue; }"]},
    ]);

    instance.renderStyle({
      ".css-yrgMo:hover": {
        color: "green",
      },
    });
    expect(sheetsToRules(document.styleSheets)).toEqual([
      {media: "", rules: [".css-yrgMo { color: blue; }"]},
      {media: "", rules: [".css-yrgMo:hover { color: green; }"]},
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
      return [
        ...acc,
        {media: sheet.media.mediaText, rules: sheetToRules(sheet)},
      ];
    },
    [],
  );
}
