import hyphenate from './hyphenate-style-name';
import prefixAll from 'inline-style-prefixer/static';

export default function injectStylePrefixed(styletron, styles, media, pseudo) {
  let classString = '';
  for (const originalKey in styles) {
    const originalVal = styles[originalKey];
    const originalValType = typeof originalVal;
    if (
      originalValType === 'string' ||
      originalValType === 'number' ||
      Array.isArray(originalVal)
    ) {
      const prefixed = prefixAll({[originalKey]: originalVal});
      let block = '';
      for (const prefixedKey in prefixed) {
        const prefixedVal = prefixed[prefixedKey];
        const prefixedValType = typeof prefixedVal;
        if (prefixedValType === 'string' || prefixedValType === 'number') {
          block += `${hyphenate(prefixedKey)}:${prefixedVal};`;
          continue;
        }
        if (Array.isArray(prefixedVal)) {
          const hyphenated = hyphenate(prefixedKey);
          for (let i = 0; i < prefixedVal.length; i++) {
            block += `${hyphenated}:${prefixedVal[i]};`;
          }
          continue;
        }
      }
      classString +=
        ' ' +
        styletron.injectRawDeclaration({
          block: block.slice(0, -1), // Remove trailing semicolon
          media,
          pseudo,
        });
    }
    if (originalValType === 'object') {
      if (originalKey[0] === ':') {
        classString +=
          ' ' + injectStylePrefixed(styletron, originalVal, media, originalKey);
        continue;
      }
      if (originalKey.substring(0, 6) === '@media') {
        classString +=
          ' ' +
          injectStylePrefixed(
            styletron,
            originalVal,
            originalKey.substr(7),
            pseudo
          );
        continue;
      }
    }
  }
  // remove leading space on way out
  return classString.slice(1);
}
