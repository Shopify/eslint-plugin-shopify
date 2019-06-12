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
    const state = {
      testDepth: 0,
      nestedDepth: 0,
    };

    const changeNestedDepth = (increase) => () =>
      inTest(state) && (increase ? state.nestedDepth++ : state.nestedDepth--);

    const changeDepth = (increase) => (node) =>
      !testCallExpression(node) &&
      (increase ? state.testDepth++ : state.testDepth--);

    const ifStatement = (messageId) => (node) =>
      !ignoreStatement(state) &&
      context.report({
        messageId,
        node,
      });

    return {
      CallExpression: changeDepth(true),
      FunctionExpression: changeNestedDepth(true),
      ArrowFunctionExpression: changeNestedDepth(true),
      IfStatement: ifStatement('noIf'),
      ConditionalExpression: ifStatement('noConditional'),
      'FunctionExpression:exit': changeNestedDepth(),
      'ArrowFunctionExpression:exit': changeNestedDepth(),
      'CallExpression:exit': changeDepth(),
    };
  },
};

function inTest(state) {
  return state.testDepth > 0;
}

function ignoreStatement(state) {
  return state.testDepth === 0 || state.nestedDepth > state.testDepth;
}

function testCallExpression(node) {
  return notTestFunction(node) || hasEmptyBody(node);
}

function notTestFunction(node) {
  const method = getTestMethodName(node);
  return !TEST_FUNCTION_NAMES.includes(method);
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
