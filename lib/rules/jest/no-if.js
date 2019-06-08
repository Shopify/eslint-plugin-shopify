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
        'Consider breaking the conditional statement out',
        'into a separate test to resolve this error.',
      ].join(' '),
    },
  },

  create(context) {
    const state = {
      callExpressionDepth: 0,
      blockStatementDepth: 0,
    };

    return {
      CallExpression(node) {
        if (ignore(node)) {
          return;
        }

        state.callExpressionDepth++;
      },
      BlockStatement() {
        if (state.callExpressionDepth > 0) {
          state.blockStatementDepth++;
        }
      },
      IfStatement(node) {
        if (skip(state)) {
          return;
        }

        context.report({
          messageId: 'noIf',
          node,
        });
      },
      ConditionalExpression(node) {
        if (skip(state)) {
          return;
        }

        context.report({
          messageId: 'noConditional',
          node,
        });
      },
      'BlockStatement:exit': () => {
        state.blockStatementDepth--;
      },
      'CallExpression:exit': (node) => {
        if (ignore(node)) {
          return;
        }
        state.callExpressionDepth--;
      },
    };
  },
};

function ignore(node) {
  return !isTestDefinition(node) || hasEmptyBody(node);
}

function hasEmptyBody(node) {
  return (
    node.arguments &&
    node.arguments.length === 2 &&
    node.arguments[1].type === 'ArrowFunctionExpression' &&
    node.arguments[1].body &&
    node.arguments[1].body.body &&
    node.arguments[1].body.body.length === 0
  );
}

function skip(state) {
  return (
    state.callExpressionDepth === 0 ||
    state.blockStatementDepth > state.callExpressionDepth
  );
}
