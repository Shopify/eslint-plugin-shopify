const {RuleTester} = require('eslint');

const rule = require('../../../lib/rules/prefer-name-spaced-react');

const ruleTester = new RuleTester();

require('typescript-eslint-parser');

const parserOptions = {ecmaVersion: 6, sourceType: 'module'};

const error = {
  type: 'ImportDeclaration',
  message: `Prefer name-spaced React import. (import * as React from 'react';).`,
};

ruleTester.run('prefer-name-spaced-react', rule, {
  valid: [
    {
      code: `import * as React from 'react';`,
      parserOptions,
    },
  ],
  invalid: [
    {
      code: `import React from 'react';`,
      parserOptions,
      errors: [error],
    },
  ],
});
