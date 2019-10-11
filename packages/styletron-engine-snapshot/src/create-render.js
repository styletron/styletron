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

    return prettier
      .format(`${kind} = ${stringify(obj)}`, {
        // babylon is treated as 'babel'
        parser: "babel",
        plugins: [babylonParser],

        // don't add a semicolon at the end of the declaration
        semi: false,

        // default/prefer use of `'` for strings when needed
        singleQuote: true,

        // force newline insertions more often
        printWidth: 40,
      })
      .replace(`${kind} = `, `${kind}=`);
  };
}
