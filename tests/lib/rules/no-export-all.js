const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/no-export-all');

const ruleTester = new RuleTester();
require('babel-eslint');

const parser = 'babel-eslint';
const errors = [
  {
    type: 'ExportAllDeclaration',
    message: 'Do not use the asterisk (*) to export everything from a module.',
  },
];

ruleTester.run('no-export-all', rule, {
  valid: [
    {
      code: `export something from './something';`,
      parser,
    },
    {
      code: `export {something} from './something';`,
      parser,
    },
    {
      code: `export {something as somethingElse} from './something';`,
      parser,
    },
    {
      code: `export {default as somethingElse} from './something';`,
      parser,
    },
    {
      code: `export {
          default as something,
          somethingElse as anotherSomething,
          anotherSomething as anotherSomethingElse,
        } from './something';`,
      parser,
    },
    {
      code: `export {something, somethingElse, anotherSomething} from './something';`,
      parser,
    },
  ],
  invalid: [
    {
      code: `export * from './something';`,
      parser,
      errors,
    },
  ],
});
