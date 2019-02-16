const commonTags = require('common-tags');
const {docsUrl} = require('../../utilities');

const VAGUE_TERMS = {
  should: /should/i,
  correct: /correct/i,
  appropriate: /appropriate/i,
  all: /\ball\b/i,
  properly: /properly/i,
  every: /every/i,
  descriptive: /descriptive/i,
};

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
      description: 'Prevent the usage of vague words in test statements.',
      category: 'Best Practices',
      recommended: false,
      uri: docsUrl('jest/no-vague-titles'),
    },
    schema: [
      {
        type: 'object',
        properties: {
          ignore: {
            type: 'array',
            items: {enum: TEST_FUNCTION_NAMES},
          },
          allow: {
            type: 'array',
            items: {enum: Object.keys(VAGUE_TERMS)},
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      containsVagueWord:
        '{{ method }} description should not contain vague words. Remove {{ vagueWords }} and be sure this description meaningfully illustrates the purpose of this test.',
    },
  },
  create(context) {
    const options = context.options[0] || {};
    const ignored = options.ignore || [];
    const allowed = options.allow || [];

    function isIgnoredFunctionName(node) {
      const method = getMethodName(node);
      return ignored.some((ignoredMethod) => ignoredMethod === method);
    }

    function validate(node) {
      if (
        notTestFunction(node) ||
        isIgnoredFunctionName(node) ||
        hasEmptyDescription(node)
      ) {
        return;
      }

      const description = getDescription(node);
      const containingVagueWords = containsVagueWord(description, allowed);

      if (containingVagueWords.length) {
        const method = getMethodName(node);
        const vagueWords = commonTags.commaListsAnd`${containingVagueWords}`;
        context.report({
          messageId: 'containsVagueWord',
          data: {
            method,
            vagueWords,
          },
          node,
        });
      }
    }

    return {
      CallExpression(node) {
        validate(node);
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

function hasEmptyDescription({arguments: args}) {
  return (
    !args ||
    !args[0] ||
    (args[0].type !== 'Literal' && args[0].type !== 'TemplateLiteral')
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

function getDescription({arguments: args}) {
  const firstArgument = args[0];

  if (firstArgument.type === 'TemplateLiteral') {
    return firstArgument.quasis
      .map((templateLiteral) => {
        return templateLiteral.value.raw;
      })
      .join('');
  }

  return firstArgument && firstArgument.value;
}

function containsVagueWord(description, allowed) {
  return Object.entries(VAGUE_TERMS)
    .map(
      ([word, regex]) =>
        allowed.includes(word) ? false : description.match(regex),
    )
    .filter((words) => words)
    .map((words) => (words.length === 0 ? words : words.map((word) => word)))
    .reduce((wordsSoFar, word) => wordsSoFar.concat(`"${word}"`), []);
}
