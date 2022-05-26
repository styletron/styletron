import test from "tape";

import {Client, Server, StyletronSnapshotEngine} from "../index";

test("index", t => {
  t.true(
    Client === Server && Client === StyletronSnapshotEngine,
    "Client === Server === StyletronSnapshotEngine",
  );
  t.end();
});

test("StyletronSnapshotEngine rendering", t => {
  const instance = new StyletronSnapshotEngine();

  t.equal(
    instance.renderStyle({color: "purple"}),
    "style={ color: 'purple' }\n",
    "render regular style",
  );

  // @see: https://github.com/styletron/styletron/pull/342/files#r335055216
  t.equal(
    instance.renderStyle({
      ":after": {
        content: `"Hello World"`,
      },
    }),
    "style={\n  ':after': {\n    content: '\"Hello World\"',\n  },\n}\n",
    "render style and preserve '\"' in content",
  );

  t.equal(
    instance.renderStyle({
      "@media (min-width: 800px)": {color: "purple"},
    }),
    "style={\n  '@media (min-width: 800px)': {\n    color: 'purple',\n  },\n}\n",
    "render media query style",
  );

  t.equal(
    instance.renderFontFace({
      src: "local('Roboto')",
    }),
    "fontFace={ src: \"local('Roboto')\" }\n",
    "render font face",
  );

  t.equal(
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
    "keyFrames={\n  '50%': { color: 'yellow' },\n  from: { color: 'purple' },\n  to: { color: 'orange' },\n}\n",
    "render keyframes",
  );

  t.end();
});
