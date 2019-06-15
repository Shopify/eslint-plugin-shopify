const {docsUrl} = require('../../utilities');
const {isTestDefinition} = require('../../utilities/jest');

module.exports = {
  meta: {
    docs: {
      description: 'Prevent if statements in tests.',
      category: 'Best Practices',
      recommended: false,
      uri: docsUrl('jest/no-if'),
    },
    messages: {
      noIf: [
        'Tests should not contain if statements.',
        'This is usually an indication that you',
        'are attempting to test too much at once',
        'or not testing what you intend to.',
        'Consider breaking the if statement out',
        'into a separate test to resolve this error.',
      ].join(' '),
      noConditional: [
        'Tests should not contain conditional statements.',
        'This is usually an indication that you',
        'are attempting to test too much at once',
        'or not testing what you intend to.',
        'Consider writing a separate test for',
        'each fork in the conditional statement.',
      ].join(' '),
    },
  },

  create(context) {
    const stack = [];

    function validate(node) {
      const lastCallExpression = stack[stack.length - 1];

      if (!lastCallExpression) {
        return;
      }

      if (isTestDefinition(lastCallExpression)) {
        const messageId =
          node.type === 'ConditionalExpression' ? 'noConditional' : 'noIf';

        context.report({
          messageId,
          node,
        });
      }
    }

    return {
      CallExpression(node) {
        stack.push(node);
      },
      IfStatement: validate,
      ConditionalExpression: validate,
      'CallExpression:exit': function() {
        stack.pop();
      },
    };
  },
};
