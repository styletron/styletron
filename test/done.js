var through2 = require('through2');
var asap = require('asap');

var stream = through2.obj(function(chunk, encoding, callback) {  
  this.push(JSON.stringify(chunk) + '\n')
  callback();
});

stream.pipe(process.stdout);

module.exports = function done(obj) {
  stream.write(obj);
  asap(process.exit);
}
