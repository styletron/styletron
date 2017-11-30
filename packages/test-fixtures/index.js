const fs = require('fs');
const path = require('path');

module.exports = {
  basic: {
    cache: require('./basic.js'),
    css: fs.readFileSync(path.join(__dirname, 'basic.css'), 'utf8').trim(),
  },
  multipleMedia: {
    cache: require('./multiple-media.js'),
    css: fs
      .readFileSync(path.join(__dirname, 'multiple-media.css'), 'utf8')
      .trim(),
  },
  simple: {
    cache: require('./simple.js'),
  },
};
