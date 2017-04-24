export default baseHandler;

function baseHandler(key, valueObj) {
  return key === 'pseudo'
    ? pseudoObjToCss(valueObj)
    : valsObjToCss(key, valueObj);
}

function pseudoObjToCss(pseudoObj) {
  let css = '';
  for (let pseudoClass in pseudoObj) {
    const propsObj = pseudoObj[pseudoClass];
    for (let prop in propsObj) {
      css += valsObjToCss(prop, propsObj[prop], pseudoClass);
    }
  }
  return css;
}

function valsObjToCss(prop, valsObj, pseudo) {
  let css = '';
  for (let val in valsObj) {
    const className = valsObj[val];
    css += declToCss(prop, val, className, pseudo);
  }
  return css;
}

function declToCss(prop, val, className, pseudo) {
  const classString = pseudo ? `${className}${pseudo}` : className;
  return `.${classString}{${prop}:${val}}`;
}
