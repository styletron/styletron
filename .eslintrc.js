module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    jsx: true
  },

  extends: [
    require.resolve("eslint-config-cup"),
    require.resolve("eslint-config-cup-recommended")
  ],

  plugins: ["eslint-plugin-prettier", "eslint-plugin-flowtype"],

  rules: {
    "flowtype/define-flow-type": 1,

    "prettier/prettier": [
      "error",
      {
        useTabs: false,
        printWidth: 80,
        tabWidth: 2,
        singleQuote: false,
        trailingComma: "both",
        bracketSpacing: false,
        jsxBracketSameLine: false,
        parser: "babylon",
        semi: true
      }
    ]
  }
};
