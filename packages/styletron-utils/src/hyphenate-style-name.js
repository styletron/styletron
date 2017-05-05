const uppercasePattern = /[A-Z]/g;
const msPattern = /^ms-/;
const cache = {};

export default function hyphenateStyleName(prop) {
  return prop in cache
    ? cache[prop]
    : (cache[prop] = prop
        .replace(uppercasePattern, '-$&')
        .toLowerCase()
        .replace(msPattern, '-ms-'));
}
