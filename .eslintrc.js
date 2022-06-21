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
  overrides: [
    {
      "files": [
        "**/*.ts",
        "**/*.tsx",
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "sourceType": "module",
      },
      "plugins": ["@typescript-eslint"],
      "rules": {
        // should be replaced with @typescript-eslint/no-unused-vars,
        // but there is apparently a bug when importing type namespaces
        "no-unused-vars": "off",
        "no-dupe-class-members": "off",
        "@typescript-eslint/no-dupe-class-members": "error",

        // cup does not support typescript
        "cup/no-undef": "off",
        // todo: weird rule… should "void 0" be used instead?
        "no-undefined": "off",
        // does not work correctly for function type annotations
        "no-shadow": "off"
      }
    }
  ],
};
