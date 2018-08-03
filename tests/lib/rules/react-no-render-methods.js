const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/react-no-render-methods');

const ruleTester = new RuleTester();

require('babel-eslint');

const babelParser = 'babel-eslint';

function error(memberName) {
  return {
    type: 'MethodDefinition',
    message: `No renderX methods. '${memberName}' should be a seperate component.`,
  };
}

ruleTester.run('react-no-render-methods', rule, {
  valid: [
    {
      code: `class Button extends React.Component {
        render() {}
      }`,
      parser: babelParser,
    },
  ],
  invalid: [
    {
      code: `class Button extends React.Component {
        renderFoo() {}
      }`,
      parser: babelParser,
      errors: [error('renderFoo')],
    },
  ],
});
