module.exports = {
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
      },
      files: ['*.ts', '*.tsx'],
      rules: {
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
      },
    },
  ],
};
