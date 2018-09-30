module.exports = {
  meta: {
    docs: {
      description:
        'Disallow exporting everything from a module using the asterisk (*) character.',
      category: 'Possible Errors',
      url:
        'https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/no-export-all.md',
      recommended: true,
    },
  },

  create(context) {
    return {
      ExportAllDeclaration(node) {
        context.report({
          node,
          message:
            'Do not use the asterisk (*) to export everything from a module.',
        });
      },
    };
  },
};
