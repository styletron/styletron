// @flow

import {
  type StyleObject,
  type FontFaceObject,
  type KeyframesObject,
} from "styletron-standard";

import stringify from "json-stable-stringify";

/**
  @see: https://prettier.io/docs/en/browser.html
 */
import prettier from "prettier/standalone";
import babylonParser from "prettier/parser-babylon";

/*
This adds a "deterministic" engine that simply returns a `JSON.stringify`-ed
version of the style object (with aplha-sorted keys).
*/
export default function createRender(kind: string) {
  return function render(
    obj: ?(StyleObject | FontFaceObject | KeyframesObject),
  ): string {
    if (!obj) {
      return "";
    }

    const prettySortedJSON = prettier.format(stringify(obj), {
      /**
        even though we are using the json5 parser, it is actually packaged inside the
        babylon parser in source
        @see: https://github.com/prettier/prettier/blob/a093bb3f7b9f59d8cbaf7e20f97f6fafceaef21b/src/common/internal-plugins.js#L28
       */
      parser: "json5",
      plugins: [babylonParser],

      // don't add a semicolon at the end of the declaration
      semi: false,

      // default/prefer use of `'` for strings when needed
      singleQuote: true,

      // force newline insertions more often
      printWidth: 40,
    });

    return `${kind}=${prettySortedJSON}`;
  };
}
