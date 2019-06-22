const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/react-import-first');

const ruleTester = new RuleTester();

require('babel-eslint');

const parser = 'babel-eslint';
const errors = [
  {
    messageId: 'reactImportFirst',
  },
];

ruleTester.run('react-import-first', rule, {
  valid: [
    {
      code: `
        import React from 'react';
      `,
      parser,
    },
    {
      code: `
        import React from 'react';
        import Foo from 'bar';
      `,
      parser,
    },
  ],
  invalid: [
    {
      code: `
        import Foo from 'bar';
        import React from 'react';
      `,
      parser,
      errors,
      output: `
        import React from 'react';
        import Foo from 'bar';
      `,
    },
  ],
});
