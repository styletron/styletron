/* global require __dirname */

const fs = require("fs").promises;
const path = require("path");
const {spawn} = require("child_process");
const test = require("tape");

const FIXTURES_DIR = path.resolve(__dirname, "./fixtures");
const PROJECT_ROOT = path.resolve(__dirname, "../../../");
const FLOW = path.resolve(PROJECT_ROOT, "node_modules/.bin/flow");

function buildFixturePath(fixture, name) {
  return path.resolve(FIXTURES_DIR, fixture, name);
}

function flowVersion() {
  return new Promise(res => {
    const flow = spawn(FLOW, ["version"], {cwd: PROJECT_ROOT});
    flow.stdout.on("data", data => {
      const v = String(data)
        .split(" ")
        .pop()
        .trim();
      res(v);
    });
  });
}

async function flowError(fixture) {
  return new Promise(async res => {
    const root = buildFixturePath(fixture, "input");
    const src = await fs.readFile(`${root}.txt`, "utf8");
    const jsFilepath = `${root}.js`;
    await fs.writeFile(jsFilepath, src);

    const flow = spawn(FLOW, ["focus-check", jsFilepath], {cwd: PROJECT_ROOT});
    let message = "";
    flow.stdout.on("data", data => {
      message += String(data);
    });

    flow.on("close", async () => {
      await fs.unlink(jsFilepath);
      res(message);
    });
  });
}

function compare(fixture) {
  test(fixture, async t => {
    const version = await flowVersion();
    const actual = await flowError(fixture);

    const outputFilepath = buildFixturePath(fixture, `output.${version}.txt`);
    if (process.env.WRITE_FLOW_OUTPUT === "true") {
      console.log(`Writing error to ${outputFilepath}. No assertion was made.`);
      await fs.writeFile(outputFilepath, actual);
    } else {
      try {
        const expected = await fs.readFile(outputFilepath, "utf8");
        t.equal(actual, expected);
      } catch (e) {
        console.error(e);
        t.fail(`
          Failed to read from ${outputFilepath}.
          Either create that file with expected flow error message or run tests with WRITE_FLOW_OUTPUT=true.
        `);
      }
    }

    t.end();
  });
}

async function main() {
  const fixtures = await fs.readdir(FIXTURES_DIR);
  fixtures.forEach(compare);
}
main();
