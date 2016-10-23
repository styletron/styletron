const path = require('path');
const fs = require('fs');
const os = require('os');
const series = require('run-series');

const BasePWMetrics = require('pwmetrics');

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

  class PWMetrics extends BasePWMetrics {
    constructor(...args) {
      return super(...args);
    }

    spitJSON(data) {
      const json = super.spitJSON(data);
      const parsed = JSON.parse(json);
      console.log(parsed);
      resultsArr.push({
        res: parsed,
        app: entry.app,
        variant: entry.variant,
        library: path.parse(entry.file).name,
        tti: parsed.timings[3].value,
        fmp: parsed.timings[1].value
      });
      callback(null, 'ok');
      return json;
    }
  }
  const p = new PWMetrics(url, {json: true});
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
        fmp: item.fmp
      };
    });
    console.log(JSON.stringify(summary, null, 2));
    process.exit(0);
  });
}

setTimeout(start, 3000);

function getUrl({app, file, variant}) {
  return `http://localhost:8080/${path.join(variant, app, file)}`;
}
