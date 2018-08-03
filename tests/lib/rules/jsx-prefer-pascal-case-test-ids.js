const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/jsx-prefer-pascal-case-test-ids');

require('babel-eslint');

const parser = 'babel-eslint';
const ruleTester = new RuleTester();
function errorWithTestID(testID) {
  return [
    {
      type: 'JSXElement',
      message: `test ID '${testID}' should use pascal case`,
    },
  ];
}

ruleTester.run('jsx-prefer-pascal-case-test-ids', rule, {
  valid: [
    {
      code: '<div testID="GreetingsHeading" />',
      parser,
    },
  ],
  invalid: [
    {
      code: '<div testID="Greetings_Heading" />',
      parser,
      errors: errorWithTestID('Greetings_Heading'),
    },
    {
      code: '<div testID="greetings-heading" />',
      parser,
      errors: errorWithTestID('greetings-heading'),
    },
    {
      code: '<div testID="greetingsheading" />',
      parser,
      errors: errorWithTestID('greetingsheading'),
    },
  ],
});
