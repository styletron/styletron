import {Client, Server, StyletronSnapshotEngine} from "../index";

test("index", () => {
  expect(Client === Server && Client === StyletronSnapshotEngine).toBe(true);
});

test("StyletronSnapshotEngine rendering", () => {
  const instance = new StyletronSnapshotEngine();

  expect(instance.renderStyle({color: "purple"})).toBe(
    "style={ color: 'purple' }\n",
  );

  // @see: https://github.com/styletron/styletron/pull/342/files#r335055216
  expect(
    instance.renderStyle({
      ":after": {
        content: `"Hello World"`,
      },
    }),
  ).toBe("style={\n  ':after': {\n    content: '\"Hello World\"',\n  },\n}\n");

  expect(
    instance.renderStyle({
      "@media (min-width: 800px)": {color: "purple"},
    }),
  ).toBe(
    "style={\n  '@media (min-width: 800px)': {\n    color: 'purple',\n  },\n}\n",
  );

  expect(
    instance.renderStyle({
      "@container (min-width: 600px)": {color: "purple"},
    }),
  ).toBe(
    "style={\n  '@container (min-width: 600px)': {\n    color: 'purple',\n  },\n}\n",
  );

  expect(
    instance.renderFontFace({
      src: "local('Roboto')",
    }),
  ).toBe("fontFace={ src: \"local('Roboto')\" }\n");

  expect(
    instance.renderKeyframes({
      from: {
        color: "purple",
      },
      "50%": {
        color: "yellow",
      },
      to: {
        color: "orange",
      },
    }),
  ).toBe(
    "keyFrames={\n  '50%': { color: 'yellow' },\n  from: { color: 'purple' },\n  to: { color: 'orange' },\n}\n",
  );
});
