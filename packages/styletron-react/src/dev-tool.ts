/* eslint-env browser */
/* global module */

export function addDebugMetadata(instance, stackIndex) {
  // @ts-expect-error todo: stacktrace does not exist on error (non standard browser?)
  const {stack, stacktrace, message} = new Error("stacktrace source");
  instance.debug = {
    stackInfo: {stack, stacktrace, message},
    stackIndex: stackIndex,
  };
}

// DEVTOOLS SETUP
type StyletronStyles = {
  classes?: any;
  styles?: any;
  extends?: any;
};

export const setupDevtoolsExtension = () => {
  const atomicMap = {};
  const extensionsMap = new Map();
  const stylesMap = new Map();
  const getStyles: (className: string) => StyletronStyles = className => {
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

// todo: export debug engine interface
export class NoopDebugEngine {
  debug(): undefined {
    return;
  }
}

declare var __BROWSER__: boolean;
export const DebugEngine = NoopDebugEngine;
