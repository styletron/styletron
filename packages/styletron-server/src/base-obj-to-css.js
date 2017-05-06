export default baseHandler;

function baseHandler(key, valueObj) {
  switch (key) {
    case 'keyframes':
      return keyframeObjToCss(valueObj);
    case 'pseudo':
      return pseudoObjToCss(valueObj);
    default:
      return valsObjToCss(key, valueObj);
  }
}

function pseudoObjToCss(pseudoObj) {
  let css = '';
  for (const pseudoClass in pseudoObj) {
    if (pseudoObj.hasOwnProperty(pseudoClass)) {
      const propsObj = pseudoObj[pseudoClass];
      for (const prop in propsObj) {
        if (propsObj.hasOwnProperty(prop)) {
          css += valsObjToCss(prop, propsObj[prop], pseudoClass);
        }
      }
    }
  }
  return css;
}

function valsObjToCss(prop, valsObj, pseudo) {
  let css = '';
  for (const val in valsObj) {
    if (valsObj.hasOwnProperty(val)) {
      const className = valsObj[val];
      css += declToCss(prop, val, className, pseudo);
    }
  }
  return css;
}

function declToCss(prop, val, className, pseudo) {
  const classString = pseudo ? `${className}${pseudo}` : className;
  return `.${classString}{${prop}:${val}}`;
}

function keyframeObjToCss(keyframeObj) {
  let css = '';
  for (let keyframes in keyframeObj) {
    if (keyframeObj.hasOwnProperty(keyframes)) {
      css += `@keyframes ${keyframeObj[keyframes]}{`;

      keyframes = JSON.parse(keyframes);
      for (const key in keyframes) {
        if (keyframes.hasOwnProperty(key)) {
          css += `${key}{`;
          for (const prop in keyframes[key]) {
            if (keyframes[key].hasOwnProperty(prop)) {
              css += `${prop}:${keyframes[key][prop]};`;
            }
          }
          css = css.slice(0, -1);
          css += '}';
        }
      }

      css += '}';
    }
  }

  return css;
}
