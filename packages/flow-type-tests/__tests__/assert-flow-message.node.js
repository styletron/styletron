/* global require __dirname */

const fs = require("fs").promises;
const path = require("path");
const {spawn} = require("child_process");
const test = require("tape");

const SOURCES = path.resolve(__dirname, "..");
const FIXTURES = path.resolve(__dirname, "./fixtures");
const SCENARIOS = path.resolve(__dirname, "./scenarios");
const PROJECT_ROOT = path.resolve(__dirname, "../../../");
const FLOW = path.resolve(PROJECT_ROOT, "node_modules/.bin/flow");

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

function flowCheck(src, name) {
  return new Promise(async res => {
    const filepath = path.resolve(FIXTURES, `${name}.js`);
    await fs.writeFile(filepath, src);

    const flow = spawn(FLOW, ["focus-check", filepath], {cwd: PROJECT_ROOT});
    let message = "";
    flow.stdout.on("data", data => {
      message += String(data);
    });

    flow.on("close", async () => {
      await fs.unlink(filepath);
      res(message);
    });
  });
}

async function main() {
  const version = await flowVersion();
  const scenarios = await fs.readdir(SCENARIOS);
  scenarios.forEach(filename => {
    const [name] = filename.split(".");
    test(`${name}.${version}`, async t => {
      const raw = await fs.readFile(path.resolve(SCENARIOS, filename), "utf8");
      const message = await flowCheck(raw, name);
      const fixture = path.resolve(FIXTURES, `scenario-${name}.${version}.txt`);

      try {
        const expected = await fs.readFile(fixture, "utf8");
        t.equal(message, expected);
        t.end();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`Unable to read fixture ${fixture}. Generating fixture.`);
        await fs.writeFile(fixture, message);
        t.fail();
        t.end();
      }
    });
  });

  const sources = await fs.readdir(SOURCES);
  sources.forEach(filename => {
    const [name, extension] = filename.split(".");
    if (extension !== "js") return;

    test(`${name}.${version}`, async t => {
      const raw = await fs.readFile(path.resolve(SOURCES, filename), "utf8");
      const unsuppressed = raw.replace(/\/\/ \$FlowFixMe/gm, "");
      const message = await flowCheck(unsuppressed, name);
      const fixture = path.resolve(FIXTURES, `fixture-${name}.${version}.txt`);

      try {
        const expected = await fs.readFile(fixture, "utf8");
        t.equal(message, expected);
        t.end();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`Unable to read fixture ${fixture}. Generating fixture.`);
        await fs.writeFile(fixture, message);
        t.fail();
        t.end();
      }
    });
  });
}
main();
