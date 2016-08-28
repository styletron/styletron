const browserify = require('browserify');

const path = require('path');
const fs = require('fs');

const bundlesDir = path.join(__dirname, 'bundles');

const sources = fs
  .readdirSync(bundlesDir)
  .filter(filename => path.parse(filename).ext === '.js');

sources.forEach(filename => {
  const [name, type] = filename.split('.');
  const dest = path.join(__dirname, 'static', name, `${type}-bundle.js`);

  browserify(path.join(bundlesDir, filename))
    .bundle()
    .pipe(fs.createWriteStream(dest));
});
