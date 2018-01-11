module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
  },

  extends: [
    require.resolve('eslint-config-cup'),
    require.resolve('eslint-config-cup-recommended')
  ],

  plugins: ['eslint-plugin-prettier'],

  rules: {
    'prettier/prettier': [
      'error',
      {
        useTabs: false,
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: false,
        jsxBracketSameLine: false,
        parser: 'babylon',
        semi: true,
      },
    ],
  },
};
