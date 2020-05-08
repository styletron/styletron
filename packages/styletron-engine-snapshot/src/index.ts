import type {
  StandardEngine,
  KeyframesObject,
  FontFaceObject,
  StyleObject,
} from "styletron-standard";

import createRender from "./create-render";

const engine = {
  renderStyle: createRender("style"),
  renderKeyframes: createRender("keyFrames"),
  renderFontFace: createRender("fontFace"),
};

export class StyletronSnapshotEngine implements StandardEngine {
  renderStyle(styles: StyleObject) {
    return engine.renderStyle(styles);
  }

  renderKeyframes(keyframes: KeyframesObject) {
    return engine.renderKeyframes(keyframes);
  }

  renderFontFace(fontFace: FontFaceObject) {
    return engine.renderFontFace(fontFace);
  }
}

export const Client = StyletronSnapshotEngine;
export const Server = StyletronSnapshotEngine;

export default StyletronSnapshotEngine;
