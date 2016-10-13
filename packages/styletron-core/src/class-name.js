// numbers are NOT allowed as first characters of CSS class names
const firstChars = Array.from(Array(26), (a, i) => (i + 10).toString(36));

/**
 * Generates a short, valid CSS class name
 * @param int {int}  A number
 * @returns {string} CSS class name
 */
function className(int) {
  if (int < 26) {
    return firstChars[int];
  } else {
    const i = int - 26; //
    const namespaceN = Math.floor(i / 36);
    const namespaceIndex = namespaceN % 26;
    const namespace = firstChars[namespaceIndex];
    const namespaceCycle = Math.floor(namespaceN / 26);
    const remain = i - (namespaceCycle + namespaceIndex) * 36;
    const char = remain.toString(36);
    return `${namespace}${char}`;
  }
}

module.exports = className;
