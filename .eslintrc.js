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
    "eslint-plugin-prettier",
    "eslint-plugin-flowtype",
    "eslint-plugin-react",
  ],

  rules: {
    "flowtype/define-flow-type": 1,

    "no-unused-vars": ["error", {argsIgnorePattern: "^_"}],

    "prettier/prettier": [
      "error",
      {
        useTabs: false,
        printWidth: 80,
        tabWidth: 2,
        singleQuote: false,
        trailingComma: "all",
        bracketSpacing: false,
        jsxBracketSameLine: false,
        parser: "babylon",
        semi: true,
      },
    ],

    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
};
