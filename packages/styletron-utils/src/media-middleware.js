module.exports = mediaMiddleware;

function mediaMiddleware(prop, val, x, psuedo, resolve) {
  let classNames = '';
  if (typeof val === 'object' && prop.substring(0, 6) === '@media') {
    const media = prop.substr(7);
    for (let key in val) {
      classNames += resolve(key, val[key], media, psuedo);
    }
  }
  return classNames;
}
