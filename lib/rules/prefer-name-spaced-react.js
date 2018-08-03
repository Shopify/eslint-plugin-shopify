module.exports = {
  meta: {
    docs: {
      description: 'Prefer React import be name-spaced.',
      category: 'Stylistic Issues',
      recommended: false,
      uri:
        'https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/prefer-name-spaced-react.md',
    },
    fixable: null,
  },
  create(context) {
    function report(node) {
      const {name} = node;

      context.report({
        node,
        message: `Prefer name-spaced React import. (import * as React from 'react';).`,
        data: {name},
      });
    }

    return {
      ImportDeclaration(node) {
        if (
          node.source.value === 'react' &&
          node.specifiers[0].type === 'ImportDefaultSpecifier'
        ) {
          report(node);
        }
      },
    };
  },
};
