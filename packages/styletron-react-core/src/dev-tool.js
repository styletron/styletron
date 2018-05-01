/* eslint-env browser */

import StackTrace from "stacktrace-js";
import {encode} from "sourcemap-codec";

const cache = {};

const schedule = window.requestIdleCallback
  ? task => window.requestIdleCallback(task, {timeout: 180})
  : window.requestAnimationFrame;

let counter = 0;
let queue = [];

function flush() {
  const {rules, segments, sources} = queue.reduce(
    (acc, {selector, lineNumber, fileName}) => {
      let sourceIndex = acc.sources.indexOf(fileName);
      if (sourceIndex === -1) {
        sourceIndex = acc.sources.push(fileName) - 1;
      }
      acc.rules.push(`${selector} {}`);
      acc.segments.push([[0, sourceIndex, lineNumber - 1, 0]]);
      return acc;
    },
    {rules: [], segments: [], sources: []},
  );
  queue = [];

  const mappings = encode(segments);
  const map = {
    version: 3,
    sources,
    mappings,
    sourcesContent: sources.map(source => cache[source]),
  };

  const json = JSON.stringify(map);
  const base64 = window.btoa(json);

  const css =
    rules.join("\n") +
    `\n\/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${base64} */`;
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

function addToQueue(item) {
  const prevCount = queue.length;
  queue.push(item);
  if (prevCount === 0) {
    schedule(flush);
  }
}

export function addDebugClass(baseStyletron, stackIndex) {
  const {className, selector} = getUniqueId();
  baseStyletron.debugClass = className;

  const trace = getTrace();

  trace
    .then(stackframes => {
      const {fileName, lineNumber} = stackframes[stackIndex];
      addToQueue({selector, lineNumber, fileName});
    })
    .catch(err => console.log(err)); // eslint-disable-line no-console
}

function getTrace() {
  return StackTrace.get({sourceCache: cache});
}

function getUniqueId() {
  const id = counter++;
  const className = `__debug_${id}`;
  return {
    selector: `.${className}`,
    className,
  };
}
