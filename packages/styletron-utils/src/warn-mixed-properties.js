const shorthandMap = require('./shorthand-map');
const hyphenate = require('./hyphenate-style-name');

module.exports = function warnMixedProperties(stylesObject) {
  let hyphenated = {};
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
      for (key in match) {
        if (hyphenated[key]) {
          const original = hyphenated[prop];
          const problem = hyphenated[key];
          console.error(`Warning: both "${original}" and "${problem}" are used in style object: ${JSON.stringify(stylesObject)}. Mixing of shorthand and longform properties is unsupported and may result in unexpected style behavior. You may want to use the https://lostyle.js.org/global.html#${prop} helper function to convert from shorthand to longform properties.`);
        }
      }
    }
  });
}
