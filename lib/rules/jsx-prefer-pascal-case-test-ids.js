const pascalCase = require('pascal-case');

module.exports = {
  meta: {
    docs: {
      description: 'Enforce pascal case for test IDs.',
      category: 'Stylistic Issues',
      recommended: false,
      uri:
        'https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/prefer-pascal-case-testids.md',
    },
    fixable: null,
  },
  create(context) {
    return {
      JSXElement(node) {
        const {
          openingElement: {attributes},
        } = node;

        for (const {
          name: {name},
          value: {value: testID},
        } of attributes) {
          if (name !== 'testID' || isPascalCase(testID)) {
            continue;
          }

          context.report({
            node,
            message: `test ID '{{testID}}' should use pascal case`,
            data: {testID},
          });
        }
      },
    };
  },
};

function isPascalCase(testID) {
  return testID === pascalCase(testID);
}
