/* eslint-env browser */
/* global module */

export function addDebugMetadata(instance, stackIndex) {
  const {stack, stacktrace, message} = new Error("stacktrace source");
  instance.debugStackInfo = {stack, stacktrace, message};
  instance.debugStackIndex = stackIndex;
}

export class DebugEngine {
  constructor(worker) {
    if (!worker) {
      worker = new Worker(
        "https://unpkg.com/css-to-js-sourcemap-worker@2.0.1/worker.js",
      );
      worker.postMessage({
        id: "init_wasm",
        url: "https://unpkg.com/css-to-js-sourcemap-worker@2.0.1/mappings.wasm",
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
