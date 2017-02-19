module.exports = psuedoMiddleware;

function psuedoMiddleware(prop, val, media, x, resolve) {
  let classNames = '';
  if (typeof val === 'object' && prop[0] === ':') {
    for (let key in val) {
      classNames += resolve(key, val[key], media, prop);
    }
  }
  return classNames;
}
