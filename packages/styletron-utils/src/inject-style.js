import hyphenate from './hyphenate-style-name';

export default function injectStyle(styletron, styles, media, pseudo) {
  let classString = '';
  for (const key in styles) {
    const val = styles[key];
    const valType = typeof val;
    if (valType === 'string' || valType === 'number') {
      classString +=
        ' ' +
        styletron.injectRawDeclaration({
          block: `${hyphenate(key)}:${val}`,
          media,
          pseudo,
        });
      continue;
    }
    if (Array.isArray(val)) {
      if (val.length === 0) {
        continue;
      }
      const hyphenated = hyphenate(key);
      let block = `${hyphenated}:${val[0]}`;
      for (let i = 1; i < val.length; i++) {
        block += `;${hyphenated}:${val[i]}`;
      }
      classString +=
        ' ' +
        styletron.injectRawDeclaration({
          block,
          media,
          pseudo,
        });
      continue;
    }
    if (valType === 'object') {
      if (key[0] === ':') {
        classString += ' ' + injectStyle(styletron, val, media, key);
        continue;
      }
      if (key.substring(0, 6) === '@media') {
        classString += ' ' + injectStyle(styletron, val, key.substr(7), pseudo);
        continue;
      }
    }
  }
  // remove leading space on way out
  return classString.slice(1);
}
