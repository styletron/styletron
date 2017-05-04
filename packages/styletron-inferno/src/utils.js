export function isType(value, type) {
  return typeof value === type;
}

export function isFunction(value) {
  return isType(value, 'function');
}

export function isObject(value) {
  return isType(value, 'object');
}

export function isString(value) {
  return isType(value, 'string');
}

export function isNil(value) {
  return value === null || value === undefined; // eslint-disable-line no-undefined
}

export function assign(target, source) {
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}
