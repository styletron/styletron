import shorthandMap from './shorthand-map';
import hyphenate from './hyphenate-style-name';

export default function warnMixedProperties(stylesObject) {
  const hyphenated = {};
  Object.keys(stylesObject).forEach(prop => {
    if (typeof stylesObject[prop] === 'string') {
      hyphenated[hyphenate(prop)] = prop;
    }
    // TODO: handle nested
  });
  Object.keys(hyphenated).forEach(prop => {
    const match = shorthandMap[prop];
    if (match) {
      // TODO: maybe change this to an array?
      for (const key in match) {
        if (hyphenated[key]) {
          const original = hyphenated[prop];
          const problem = hyphenated[key];
          /* eslint-disable no-console */
          console.error(
            `Warning: both "${original}" and "${problem}" are used in style object: ${JSON.stringify(
              stylesObject
            )}. Mixing of shorthand and longform properties is unsupported and may result in unexpected style behavior. You may want to use the https://lostyle.js.org/global.html#${prop} helper function to convert from shorthand to longform properties.`
          );
          /* eslint-enable no-console */
        }
      }
    }
  });
}
