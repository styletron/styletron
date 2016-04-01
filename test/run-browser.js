var path = require('path');
var spawn = require('electron-spawn');

module.exports = function(fixtureName, cb) {
  var electron = spawn(path.join(__dirname, 'fixtures', fixtureName));

  electron.stderr.on('data', function(data) {
    console.error(data.toString())
  });
  electron.stdout.on('data', function(data) {
    cb(JSON.parse(data.toString()));
  });
}
