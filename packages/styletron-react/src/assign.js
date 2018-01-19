export default function assign(target, source) {
  for (const key in source) {
    const val = source[key];
    if (typeof val === 'object') {
      target[key] = target[key] || {};
      target[key] = Object.assign(target[key], val);
    } else {
      target[key] = val;
    }
  }
  return target;
}
