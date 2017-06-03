export default baseHandler;

function baseHandler(key, objOrClassName) {
  return key === 'pseudo'
    ? pseudoObjToCss(objOrClassName)
    : declToCss(key, objOrClassName);
}

function pseudoObjToCss(pseudoObj) {
  let css = '';
  for (const pseudoClass in pseudoObj) {
    const propsObj = pseudoObj[pseudoClass];
    for (const block in propsObj) {
      css += declToCss(block, propsObj[block], pseudoClass);
    }
  }
  return css;
}

function declToCss(block, className, pseudo) {
  const selector = pseudo ? `${className}${pseudo}` : className;
  return `.${selector}{${block}}`;
}
