// @flow
/* eslint-env node */

module.exports = {
  projects: [
    {
      displayName: "node",
      testEnvironment: "node",
      testPathIgnorePatterns: ["/node_modules/", ".browser.js", "dist"],
      globals: {
        __NODE__: true,
        __BROWSER__: false,
        __DEV__: true,
      },
    },
    {
      displayName: "browser",
      testEnvironment: "jsdom",
      testPathIgnorePatterns: ["/node_modules/", ".node.js", "dist"],
      globals: {
        __NODE__: false,
        __BROWSER__: true,
        __DEV__: true,
      },
    },
  ],
};
