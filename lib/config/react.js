const merge = require('merge');

module.exports = {
  extends: 'plugin:shopify/esnext',

  env: {
    browser: true,
  },

  parserOptions: {
    ecmaFeatures: {jsx: true},
  },

  plugins: ['react', 'jsx-a11y', 'react-hooks'],

  rules: merge(
    require('./rules/react'),
    require('./rules/react-hooks'),
    require('./rules/jsx-a11y'),
    {
      'shopify/react-initialize-state': 'error',
      'shopify/jsx-no-complex-expressions': 'error',
    },
  ),

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: require('./rules/react-typescript'),
    },
  ],
};
