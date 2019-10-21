# Contributing to Styletron

## Getting started

1. Fork & clone the repo, then run `yarn` to install dependencies from npm.

```bash
git clone git@github.com:styletron/styletron.git
cd styletron
yarn
```

Styletron is using a monorepo setup, and picked [Lerna](https://lerna.js.org) to manage it. If you are not familiar with it, you can learn more about the [basic Lerna commands here](https://lerna.js.org/#commands).

2. To install all the dependencies of all the Styletron packages, run the following command:

```bash
# it will invoke `lerna bootstrap`, but without having lerna in the global scope
yarn bootstrap
```

3. To run tests in all the packages, run the following command:

```bash
# it will invoke `lerna run test`, that will run the test script in all the packeges
yarn test
```

4. Optionally, if you want to test out your changes in a React app, you can use the playground:

```bash
yarn playground
```

Once your changes are ready, send a PR against the main repository.
