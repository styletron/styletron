// @flow

import stringify from "json-stable-stringify";

import {
  type StyleObject,
  type FontFaceObject,
  type KeyframesObject,
} from "styletron-standard";

/*
Problem, default atomic `Styletron` engine is really smart and meant for produciton.

It creates atomic classes and only creates `classNames` as necessary.

Unfortunately, for snapshot tests you end up with 2 issues:

1) non-debuggable classNames in snapshots ("ae af ")
2) className generation is non-deterministic. If you create a new component,
it might break an unrelated snapshot since that component rendering shifts the
generation for the old snapshot.

This adds a "deterministic" engine that simply returns a `JSON.stringify`-ed
version of the style object (with aplha-sorted keys). This makes it so that a
snapshot should not fail **UNLESS** a style applied to the component changes (which you want).
It also makes it easier to detect **what** exactly changed in the css in the snapshot since we
actually now render all of the css values (we are essentially almost rendering the styles inline).
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
