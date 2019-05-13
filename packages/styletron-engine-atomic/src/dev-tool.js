/* eslint-env browser */
export const insertRuleIntoDevtools = (selector, block) => {
  // start after the . combinator and cut at the first : if there is one to cut out the pseudo classes
  const key = selector.substring(
    1,
    selector.indexOf(":") !== -1 ? selector.indexOf(":") : selector.length,
  );
  const styles = {};
  // split the declaration to catch vendor prefixing
  for (const decl of block.split(";")) {
    if (decl.trim() !== "" && !window.__STYLETRON_DEVTOOLS__.atomicMap[key])
      styles[decl.substring(0, decl.indexOf(":"))] = decl.substring(
        decl.indexOf(":") + 1,
        decl.length,
      );
  }

  window.__STYLETRON_DEVTOOLS__.atomicMap[key] = styles;
};

export const hydrateDevtoolsRule = cssString => {
  const id = cssString.substring(0, 3);
  const block = cssString.substring(4, cssString.length - 1);
  insertRuleIntoDevtools(id, block);
};
