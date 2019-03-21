const {docsUrl} = require('../../utilities');

const TEST_FUNCTION_NAMES = [
  'it',
  'xit',
  'fit',
  'test',
  'xtest',
  'describe',
  'fdescribe',
  'xdescribe',
];

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
        'and may want to consider breaking the if',
        'statement out into a separate test.',
      ].join(' '),
    },
  },

  create(context) {
    let inCallExpression = false;

    return {
      CallExpression(node) {
        if (notTestFunction(node) || hasEmptyBody(node)) {
          return;
        }
        inCallExpression = true;
      },
      IfStatement(node) {
        if (!inCallExpression) {
          return;
        }

        context.report({
          messageId: 'noIf',
          node,
        });
      },
      'CallExpression:exit': () => {
        inCallExpression = false;
      },
    };
  },
};

function notTestFunction(node) {
  const method = getMethodName(node);
  return !matchTestFunctionName(method);
}

function matchTestFunctionName(functionName) {
  return TEST_FUNCTION_NAMES.includes(functionName);
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

function getMethodName({callee}) {
  switch (callee.type) {
    case 'CallExpression':
      return callee.callee.object
        ? callee.callee.object.name
        : callee.callee.name;
    case 'Identifier':
      return callee.name;
    case 'MemberExpression':
      return callee.object.name;
    default:
      return false;
  }
}
