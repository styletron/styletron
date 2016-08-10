const fs = require('fs');
const path = require('path');

module.exports = {
  basic: {
    cache: require('./basic.js'),
    css: fs.readFileSync(path.join(__dirname, 'basic.css'), 'utf8').trim()
  }
}
