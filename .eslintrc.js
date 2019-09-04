module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    jsx: true,
  },

  extends: [
    require.resolve("eslint-config-cup"),
    require.resolve("eslint-config-cup-recommended"),
  ],

  plugins: [
    "eslint-plugin-flowtype",
    "eslint-plugin-react",
    "eslint-plugin-prettier",
  ],

  rules: {
    "flowtype/define-flow-type": 1,
    "prettier/prettier": [
      "error",
      {},
      {
        usePrettierrc: true,
      },
    ],
    "no-unused-vars": ["error", {argsIgnorePattern: "^_"}],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
};
