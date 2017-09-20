var merge = require('merge');

module.exports = {
  extends: [
    // react should come before typescript
    'plugin:shopify/react',
    'plugin:shopify/typescript',
  ],

  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },

  rules: merge(
    require('./rules/typescriptReact')
  ),
};
