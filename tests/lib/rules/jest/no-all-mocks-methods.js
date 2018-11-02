const {RuleTester} = require('eslint');
const rule = require('../../../../lib/rules/jest/no-all-mocks-methods');

const ruleTester = new RuleTester();
function errorWithMethodName(name) {
  return [
    {
      type: 'Identifier',
      message: `Do not use ${name} or related methods that are not explicit to your test. Instead, target individual mocks.`,
    },
  ];
}

ruleTester.run('no-all-mocks-methods', rule, {
  valid: [
    {
      code: `jest.mock()`,
    },
    {
      code: `jest.fn()`,
    },
  ],
  invalid: [
    {
      code: 'jest.resetAllMocks()',
      errors: errorWithMethodName('resetAllMocks'),
    },
    {
      code: 'jest.clearAllMocks()',
      errors: errorWithMethodName('clearAllMocks'),
    },
    {
      code: 'jest.restoreAllMocks()',
      errors: errorWithMethodName('restoreAllMocks'),
    },
    {
      code: 'jest.resetModules()',
      errors: errorWithMethodName('resetModules'),
    },
  ],
});
