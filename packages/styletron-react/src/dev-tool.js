/* eslint-env browser */
/* global module */

export function addDebugMetadata(instance, stackIndex) {
  const {stack, stacktrace, message} = new Error("stacktrace source");
  instance.debug = {
    stackInfo: {stack, stacktrace, message},
    stackIndex: stackIndex,
  };
}

// DEVTOOLS SETUP
type StyletronStyles = {
  classes?: any,
  styles?: any,
  extends?: any,
};
export const setupDevtoolsExtension = () => {
  const atomicMap = {};
  const extensionsMap = new Map();
  const stylesMap = new Map();
  const getStyles: StyletronStyles = className => {
    const styles: StyletronStyles = {};
    if (typeof className !== "string") {
      return styles;
    }
    if (stylesMap.has(className)) {
      styles.styles = stylesMap.get(className);
      const classList = className.split(" ");
      if (classList.length) {
        const classes = {};
        classList.forEach(singleClassName => {
          classes[singleClassName] = atomicMap[singleClassName];
        });
        styles.classes = classes;
      }
      if (extensionsMap.has(className)) {
        const extension = extensionsMap.get(className);
        styles.extends = extension;
      }
      return styles;
    }
  };
  window.__STYLETRON_DEVTOOLS__ = {
    atomicMap,
    extensionsMap,
    stylesMap,
    getStyles,
  };
};

class BrowserDebugEngine {
  constructor(worker) {
    if (!worker) {
      const workerBlob = new Blob(
        [
          `importScripts("https://unpkg.com/css-to-js-sourcemap-worker@2.0.5/worker.js")`,
        ],
        {type: "application/javascript"},
      );
      worker = new Worker(URL.createObjectURL(workerBlob));
      worker.postMessage({
        id: "init_wasm",
        url: "https://unpkg.com/css-to-js-sourcemap-worker@2.0.5/mappings.wasm",
      });
      worker.postMessage({
        id: "set_render_interval",
        interval: 120,
      });
      if (module.hot) {
        module.hot.addStatusHandler(status => {
          if (status === "dispose") {
            worker.postMessage({id: "invalidate"});
          }
        });
      }
    }
    this.worker = worker;
    this.counter = 0;
    this.worker.onmessage = msg => {
      const {id, css} = msg.data;
      if (id === "render_css" && css) {
        const style = document.createElement("style");
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
      }
    };
  }

  debug({stackIndex, stackInfo}) {
    const className = `__debug-${this.counter++}`;
    this.worker.postMessage({
      id: "add_mapped_class",
      className,
      stackInfo,
      stackIndex,
    });
    return className;
  }
}

class NoopDebugEngine {
  debug() {}
}

export const DebugEngine = __BROWSER__ ? BrowserDebugEngine : NoopDebugEngine;
