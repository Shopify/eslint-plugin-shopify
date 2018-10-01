const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/consistent-export-style');
const {fixtureFile} = require('../../utilities');

const ruleTester = new RuleTester();

require('babel-eslint');

const parser = 'babel-eslint';

const invalidShapeError = {
  message: [
    'Export does not match a valid format.',
    'Expecting a default component export',
    'matching the name of the source,',
    `followed by the component's Props.`,
  ].join(' '),
  type: 'ExportNamedDeclaration',
};

const invalidGroupError = {
  message: 'Group multiple export from the same file into a single export.',
  type: 'ExportNamedDeclaration',
};

ruleTester.run('consistent-export-style', rule, {
  valid: [
    {
      code: `
        export {
          default as Component,
          Props as ComponentProps,
          SomeRandomThing,
        } from './Component';
    `,
      parser,
      filename: fixtureFile('basic-app/app/components/index.js'),
    },
  ],
  invalid: [
    {
      code: `
        export {
          default as Button,
          Props as ButtonProps,
        } from './NotAButton';
    `,
      parser,
      errors: [invalidShapeError],
      filename: fixtureFile('basic-app/app/components/index.js'),
    },
    {
      code: `
        export {default as Component} from './Component';
        export {Props as ComponentProps} from './Component';
        export {AnythingElse} from './Component';
    `,
      parser,
      errors: [invalidGroupError, invalidGroupError, invalidGroupError],
      filename: fixtureFile('basic-app/app/components/index.js'),
    },
  ],
});
