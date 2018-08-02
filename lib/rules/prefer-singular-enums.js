const pluralize = require('pluralize');

module.exports = {
  meta: {
    docs: {
      description: 'Prefer singular TypeScript enums.',
      category: 'Stylistic Issues',
      recommended: false,
      uri:
        'https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/prefer-singular-enums.md',
    },
    fixable: null,
  },
  create(context) {
    function report(node) {
      const {name} = node;

      context.report({
        node,
        message: `Enum '{{name}}' should be singular.`,
        data: {name},
      });
    }

    return {
      Identifier(node) {
        if (node.parent.type !== 'TSEnumDeclaration') {
          return;
        }

        if (pluralize.isSingular(node.name)) {
          return;
        }

        report(node);
      },
    };
  },
};
