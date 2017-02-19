module.exports = fallbackValueMiddleware;

function fallbackValueMiddleware(prop, val, media, pseudo, resolve) {
  let classNames = '';
  if (Array.isArray(val)) {
    for (let i = 0; i < val.length; i++) {
      classNames += resolve(prop, val[i], media, pseudo);
    }
  }
  return classNames;
}
