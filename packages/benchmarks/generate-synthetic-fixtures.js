const fs = require('fs');
const path = require('path');
const randColor = require('randomcolor');

function generateFixture(ruleCount, declGetters, pctUnique = 1) {
  let result = [];
  let modulus = ruleCount * pctUnique;
  for (let i = 0; i < ruleCount; i++) {
    let rule = {};
    let j = i % modulus;
    declGetters.forEach(getDecl => {
      Object.assign(rule, getDecl(j));
    });
    result.push(rule);
  }
  return result;
}

const getters = {
  fontSize: i => ({ fontSize: `${i + 10}px` }),
  color: i => ({ color: randColor({ seed: i + 1 }) }),
};

const allUnique = generateFixture(3000, [getters.color, getters.fontSize]);
const halfUnique = generateFixture(
  3000,
  [getters.color, getters.fontSize],
  0.5
);

fs.writeFileSync(
  path.join(__dirname, 'fixtures', 'json', 'all-unique.json'),
  JSON.stringify(allUnique),
  'utf8'
);
fs.writeFileSync(
  path.join(__dirname, 'fixtures', 'json', 'half-unique.json'),
  JSON.stringify(halfUnique),
  'utf8'
);
