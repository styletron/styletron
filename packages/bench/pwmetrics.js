const path = require('path');
const fs = require('fs');
const os = require('os');
const {spawn, exec} = require('child_process');

const chromepath = require('chrome-location');
spawn(chromepath, ['--remote-debugging-port=9222', '--no-first-run', `--user-data-dir=${path.join(os.tmpdir(), 'temp-profile')}`]);

const PWMetrics = require('pwmetrics');

const staticDir = path.join(__dirname, 'static');

const apps = fs
  .readdirSync(staticDir)
  .filter(filename => path.parse(filename).ext === '');

const appEntries = apps.map(app => {
  return fs
    .readdirSync(path.join(staticDir, app))
    .filter(filename => path.parse(filename).ext === '.html')
    .map(filename => ({
      app: app,
      file: filename
    }));
});

const entries = appEntries.reduce((acc, arr) => {
  return acc.concat(arr);
}, [])

const urls = entries.map(url);

function test(remaining) {
  if (remaining >= 0) {
    const p = new PWMetrics(urls[remaining], {json: true});
    p.then((results) => {
      console.log(urls[remaining]);
      console.log(results);
      test(remaining - 1);
    });
  } else {
    process.exit(0);
  }
}

setTimeout(_ => test(urls.length - 1), 3000);

function url({app, file}) {
  return path.join('http://localhost:8080', app, file);
}
