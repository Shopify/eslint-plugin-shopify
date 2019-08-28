const merge = require('merge');

module.exports = {
  extends: 'plugin:shopify/esnext',

  plugins: ['@typescript-eslint'],

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },

  overrides: [
    {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
      },
      files: ['*.ts', '*.tsx'],
      rules: merge(require('./rules/typescript'), {
        // TypeScript provides a better mechanism (explicit `this` type)
        // for ensuring proper `this` usage in functions not assigned to
        // object properties.
        'babel/no-invalid-this': 'off',

        // Handled by TypeScript itself
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'no-useless-constructor': 'off',
        'no-shadow': 'off',
        'no-use-before-define': 'off',

        // Does not support TS equivalent
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-empty-function': 'off',

        // Conflicts with @typescript-eslint rules
        'sort-class-members/sort-class-members': 'off',
        camelcase: 'off',

        // Flag overloaded methods in TS
        'no-dupe-class-members': 'off',

        // Flag typedef files with multiple modules with export default
        'import/export': 'off',

        // Breaks @typescript-eslint/parser
        strict: 'off',
        'shopify/prefer-early-return': 'off',
        'array-callback-return': 'off',
        'getter-return': 'off',

        // Prefer TypeScript enums be defined using Pascal case
        'shopify/typescript/prefer-pascal-case-enums': 'error',
        // Prefer TypeScript enums be defined using singular names
        'shopify/typescript/prefer-singular-enums': 'error',
      }),
    },
  ],
};
