// @flow

import type {
  StandardEngine,
  KeyframesObject,
  FontFaceObject,
  StyleObject,
} from "styletron-standard";

import createRender from "../create-render";

export const engine = {
  renderStyle: createRender("style"),
  renderKeyframes: createRender("keyFrames"),
  renderFontFace: createRender("fontFace"),
};

class StyletronSnapshotClient implements StandardEngine {
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

export default StyletronSnapshotClient;
