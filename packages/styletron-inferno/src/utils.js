function isType(value, type) {
  return typeof value === type;
}

function isFunction(value) {
  return isType(value, 'function');
}

function isObject(value) {
  return isType(value, 'object');
}

function isString(value) {
  return isType(value, 'string');
}

function isNil(value) {
  return value === null || value === undefined;
}

function assign(target, source) {
  for (let key in source) {
    target[key] = source[key];
  }
  return target;
}

module.exports = {
  isFunction,
  isObject,
  isString,
  isNil,
  assign,
};
