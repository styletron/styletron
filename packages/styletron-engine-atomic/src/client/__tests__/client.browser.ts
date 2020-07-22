/* eslint-env browser */

import StyletronServer from "../../server/server";
import StyletronClient from "../client";
const reduce = Array.prototype.reduce;
const map = Array.prototype.map;

test("container config", () => {
  const instance = new StyletronClient();
  expect(instance.container).toBe(document.head);
});

test("automatic stylesheet insertion", () => {
  const container = document.createElement("div");
  document.body && document.body.appendChild(container);
  const instance = new StyletronClient({container});
  expect(instance.container).toStrictEqual(container);
  // lazy instantiation
  expect(document.styleSheets.length).toBe(0);
  expect(instance.renderStyle({color: "purple"})).toBe("ae");
  expect(document.styleSheets.length).toBe(1);
  instance.container.remove();
  expect(document.styleSheets.length).toBe(0);
});

test("rendering", () => {
  const container = document.createElement("div");
  document.body && document.body.appendChild(container);
  const instance = new StyletronClient({container});

  expect(instance.renderStyle({color: "purple"})).toBe("ae");
  expect(sheetsToRules(document.styleSheets)).toEqual([
    {media: "", rules: [".ae {color: purple;}"]},
  ]);

  // expect(
  //   instance.renderStyle({
  //     "@media (min-width: 800px)": {color: "purple"},
  //   }),
  // ).toBe("af");
  // expect(sheetsToRules(document.styleSheets)).toEqual([
  //   {media: "", rules: [".ae {color: purple;}"]},
  //   {media: "(min-width: 800px)", rules: [".af {color: purple;}"]},
  // ]);

  instance.renderStyle({userSelect: "none"});
  expect(sheetsToRules(document.styleSheets)).toEqual([
    {
      media: "",
      rules: [
        ".ae {color: purple;}",
        ".af {-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}",
      ],
    },
    // {media: "(min-width: 800px)", rules: [".af {color: purple;}"]},
  ]);

  instance.renderStyle({display: "flex"});
  expect(sheetsToRules(document.styleSheets)).toEqual([
    {
      media: "",
      rules: [
        ".ae {color: purple;}",
        ".af {-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}",
        ".ag {display: flex;}",
      ],
    },
    // {media: "(min-width: 800px)", rules: [".af {color: purple;}"]},
  ]);

  // instance.renderStyle({
  //   "@media (min-width: 600px)": {
  //     color: "red",
  //   },
  // });
  // expect(sheetsToRules(document.styleSheets)).toEqual([
  //   {
  //     media: "",
  //     rules: [
  //       ".ae {color: purple;}",
  //       ".ag {user-select: none;}",
  //       ".ah {display: flex;}",
  //     ],
  //   },
  // {media: "(min-width: 600px)", rules: [".ai { color: red; }"]},
  // {media: "(min-width: 800px)", rules: [".af { color: purple; }"]},
  // ]);
  instance.container.remove();
});

test("prefix", () => {
  const container = document.createElement("div");
  document.body && document.body.appendChild(container);
  const instance = new StyletronClient({container, prefix: "foo_"});

  expect(instance.renderStyle({color: "purple"})).toBe("foo_ae");
  expect(instance.renderFontFace({src: "url(blah)"})).toBe("foo_ae");
  expect(
    instance.renderKeyframes({from: {color: "red"}, to: {color: "blue"}}),
  ).toBe("foo_ae");
  expect(sheetsToRules(document.styleSheets)).toEqual([
    {
      media: "",
      rules: [
        ".foo_ae {color: purple;}",
        `@font-face {font-family: foo_ae; src: url(blah);}`,
        "@keyframes foo_ae { \n  from {color: red;} \n  to {color: blue;} \n}",
      ],
    },
  ]);

  instance.container.remove();
});

test("hydration", () => {
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
  cleanup();
});

// test("sort client media queries", t => {
//   const {cleanup, container} = setup();

//   const styletron = new StyletronClient({container});

//   styletron.renderStyle({
//     "@media (min-width: 700px)": {
//       color: "pink",
//     },
//   });

//   expect(sheetsToRules(document.styleSheets)).toEqual([
//     {media: "", rules: []},
//     {media: "(min-width: 700px)", rules: [".ae { color: pink; }"]},
//   ]);

//   cleanup();
// });

// test("sort a new media query after hydration", () => {
//   const {getSheets, cleanup, container} = setup();

//   // SSR
//   const server = new StyletronServer();
//   injectFixtureStyles(server);
//   container.innerHTML = server.getStylesheetsHtml();

//   //Hydration
//   const instance = new StyletronClient({
//     hydrate: getSheets(),
//     container,
//   });

//   //render a client-only and unique media query (mid position)
//   instance.renderStyle({
//     "@media (min-width: 700px)": {
//       color: "pink",
//     },
//   });

//   //render a client-only and unique media query (end position)
//   instance.renderStyle({
//     "@media (min-width: 1000px)": {
//       color: "black",
//     },
//   });

//   expect(sheetsToRules(document.styleSheets)).toEqual([
//     {
//       media: "",
//       rules: [
//         "@keyframes ae { \n  0% { color: red; }\n  100% { color: blue; }\n}",
//       ],
//     },
//     {media: "", rules: ['@font-face { font-family: ae; src: url("blah"); }']},
//     {
//       media: "",
//       rules: [
//         ".ae { color: red; }",
//         ".af { color: green; }",
//         ".aj:hover { display: none; }",
//         ".ak { user-select: none; }",
//         ".al { display: flex; }",
//       ],
//     },
//     {media: "(min-width: 600px)", rules: [".ah { color: red; }"]},
//     {media: "(min-width: 700px)", rules: [".am { color: pink; }"]},
//     {
//       media: "(min-width: 800px)",
//       rules: [".ag { color: green; }", ".ai:hover { color: green; }"],
//     },
//     {media: "(min-width: 1000px)", rules: [".an { color: black; }"]},
//   ]);

//   cleanup();
// });

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
      return container.children as HTMLCollectionOf<HTMLStyleElement>;
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
        // JSDOM does not support reading the media property... will likely need to
        // figure out another way to unit test this feature. Commented out instances
        // where we assert against this field. Will need to follow up after migration.
        // {media: sheet.media.mediaText, rules: sheetToRules(sheet)},
        {media: "", rules: sheetToRules(sheet)},
      ];
    },
    [],
  );
}
