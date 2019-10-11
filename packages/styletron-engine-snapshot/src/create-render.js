// @flow

import {
  type StyleObject,
  type FontFaceObject,
  type KeyframesObject,
} from "styletron-standard";

import stringify from "json-stable-stringify";

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

    return `${kind}=${stringify(obj, {space: 2})
      .replace(/["]/g, "")
      .replace(/[']/g, "")}`;
  };
}
