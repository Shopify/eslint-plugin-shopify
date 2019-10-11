const merge = require('merge');

module.exports = {
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

        // @typescript-eslint has equivalent
        semi: 'off',
        quotes: 'off',
        indent: 'off',
        'brace-style': 'off',
        'require-await': 'off',
        'no-magic-numbers': 'off',
        'no-extra-parens': 'off',
        'no-empty-function': 'off',
        'func-call-spacing': 'off',
        'shopify/no-fully-static-classes': 'off',
        'babel/camelcase': 'off',

        // TS will take care of prop types
        'react/prop-types': 'off',

        // Does not support TS equivalent
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-array-constructor': 'off',

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

        // Checked by Typescript - ts(2300)
        'no-dupe-args': 'off',
        // Checked by Typescript - ts(1117)
        'no-dupe-keys': 'off',
        // Checked by Typescript - ts(7027)
        'no-unreachable': 'off',
        // Checked by Typescript - ts(2367)
        'valid-typeof': 'off',
        // Checked by Typescript - ts(2588)
        'no-const-assign': 'off',
        // Checked by Typescript - ts(2588)
        'no-new-symbol': 'off',
        // Checked by Typescript - ts(2376)
        'no-this-before-super': 'off',
        // This is already checked by Typescript.
        'no-redeclare': 'off',

        // Disallows awaiting a value that is not a Thenable
        '@typescript-eslint/await-thenable': 'off',
        // Disallow iterating over an array with a for-in loop
        '@typescript-eslint/no-for-in-array': 'off',
        // Avoid using promises in places not designed to handle them
        '@typescript-eslint/no-misused-promises': 'off',
        // Warns if a type assertion does not change the type of an expression
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        // Enforce includes method over indexOf method
        '@typescript-eslint/prefer-includes': 'off',
        // Prefer RegExp#exec() over String#match() if no global flag is provided
        '@typescript-eslint/prefer-regexp-exec': 'off',
        // Enforce the use of String#startsWith and String#endsWith instead of other equivalent methods of checking substrings
        '@typescript-eslint/prefer-string-starts-ends-with': 'off',
        // Disallow async functions which have no await expression
        '@typescript-eslint/require-await': 'off',
        // Enforces unbound methods are called with their expected scope
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unnecessary-qualifier': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unnecessary-type-arguments': 'off',
        '@typescript-eslint/prefer-readonly': 'off',
        '@typescript-eslint/require-array-sort-compare': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/quotes': 0,

        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/func-call-spacing': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/no-extra-parens': 'off',
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/type-annotation-spacing': 'off',
      }),
    },
    {
      files: '*.test.ts, *.test.tsx',
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
  ],
};
