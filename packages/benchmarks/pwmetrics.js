const path = require('path');
const fs = require('fs');
const os = require('os');
const series = require('run-series');
const {spawn, exec} = require('child_process');

const chromepath = require('chrome-location');
spawn(chromepath, ['--remote-debugging-port=9222', '--no-first-run', `--user-data-dir=${path.join(os.tmpdir(), 'temp-profile')}`]);

const PWMetrics = require('pwmetrics');

const staticDir = path.join(__dirname, 'static');

const variants = fs
  .readdirSync(staticDir)
  .filter(filename => path.parse(filename).ext === '' && filename[0] !== '.');

let entries = [];

let resultsArr = [];

variants.forEach(variant => {
  const variantDir = path.join(staticDir, variant);

  const apps = fs
    .readdirSync(variantDir)
    .filter(filename => path.parse(filename).ext === '' && filename[0] !== '.');

  const appEntries = apps.map(app => {
    return fs
      .readdirSync(path.join(variantDir, app))
      .filter(filename => path.parse(filename).ext === '.html')
      .map(filename => ({
        app: app,
        variant: variant,
        file: filename
      }));
  });

  let partial = appEntries.reduce((acc, arr) => {
    return acc.concat(arr);
  }, []);
  entries = entries.concat(partial);
});

const tests = entries.map(entry => callback => {
  const url = getUrl(entry);
  console.log(url);
  const p = new PWMetrics(url, {json: true});
  p.then((results) => {
    console.log(results);
    const parsed = JSON.parse(results);
    resultsArr.push({
      res: parsed,
      app: entry.app,
      variant: entry.variant,
      library: path.parse(entry.file).name,
      tti: parsed.timings[5].value,
      fmp: parsed.timings[1].value,
      v100: parsed.timings[4].value 
    });
    callback(null, 'ok');
  });
});

function start() {
  series(tests, function() {
    console.log('SUMMARY');
    console.log('===========');
    let summary = {};

    resultsArr.forEach((item) => {
      summary[item.variant] = summary[item.variant] || {};
      summary[item.variant][item.library] = summary[item.variant][item.library] || {};
      summary[item.variant][item.library][item.app] = {
        tti: item.tti,
        fmp: item.fmp,
        v100: item.v100
      };
    });
    console.log(JSON.stringify(summary, null, 2));
    process.exit(0);
  });
}

setTimeout(start, 3000);

function getUrl({app, file, variant}) {
  return path.join('http://localhost:8080', variant, app, file);
}
