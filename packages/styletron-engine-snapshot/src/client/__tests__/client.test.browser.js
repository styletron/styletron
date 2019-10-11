// @flow

/* eslint-env browser */

import test from "tape";

import StyletronClient from "../client";

test("rendering", t => {
  const instance = new StyletronClient();

  t.equal(
    instance.renderStyle({color: "purple"}),
    "style={\n  color: purple\n}",
  );

  t.equal(
    instance.renderStyle({
      "@media (min-width: 800px)": {color: "purple"},
    }),
    "style={\n  @media (min-width: 800px): {\n    color: purple\n  }\n}",
  );

  t.equal(
    instance.renderFontFace({
      src: "local('Roboto')",
    }),
    "fontFace={\n  src: local(Roboto)\n}",
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
    "keyFrames={\n  50%: {\n    color: yellow\n  },\n  from: {\n    color: purple\n  },\n  to: {\n    color: orange\n  }\n}",
  );

  t.end();
});
