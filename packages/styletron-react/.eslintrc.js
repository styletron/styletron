module.exports = {
  extends: [
    require.resolve('eslint-config-cup'),
    require.resolve('eslint-config-cup-recommended')
  ],

  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }

};
