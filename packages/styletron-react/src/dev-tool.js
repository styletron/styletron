/* eslint-env browser */
/* global module */

export function addDebugMetadata(instance, stackIndex) {
  const {stack, stacktrace, message} = new Error("stacktrace source");
  instance.debug = {
    stackInfo: {stack, stacktrace, message},
    stackIndex: stackIndex,
  };
}

export const createDevtoolsRef = (extension, style, props, ref) => element => {
  if (element) {
    window.__STYLETRON_DEVTOOLS__.stylesMap.set(element, style);
    if (extension) {
      window.__STYLETRON_DEVTOOLS__.extensionsMap.set(element, {
        base: extension.component.base,
        displayName: extension.component.name,
        initialStyles: extension.component.getInitialStyle({}, props),
        styleOverrides:
          typeof extension.style === "function"
            ? extension.style(props)
            : extension.style,
      });
    }
  }
  if (ref) {
    return ref(element);
  }
};
// DEVTOOLS SETUP
type StyletronStyles = {
  classes?: any,
  styles?: any,
  extends?: any,
};
export const setupDevtoolsExtension = () => {
  const atomicMap = {};
  const extensionsMap = new WeakMap();
  const stylesMap = new WeakMap();
  const getStyles: StyletronStyles = element => {
    const styles: StyletronStyles = {};
    if (stylesMap.has(element)) {
      styles.styles = stylesMap.get(element);
      if (element.classList.length) {
        const classes = {};
        for (const className of element.classList) {
          classes[className] = atomicMap[className];
        }
        styles.classes = classes;
      }
      if (extensionsMap.has(element)) {
        const extension = extensionsMap.get(element);
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
