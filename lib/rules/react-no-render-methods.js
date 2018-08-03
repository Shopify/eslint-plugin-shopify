const Components = require('eslint-plugin-react/lib/util/Components');

module.exports = {
  meta: {
    docs: {
      description: 'Disallow renderX methods within React component classes',
      category: 'Best Practices',
      recommended: true,
      uri:
        'https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/react-no-render-methods.md',
    },
  },

  create: Components.detect((context, components, utils) => {
    let isES6Component = false;

    function report(node) {
      const {
        key: {name},
      } = node;

      context.report({
        node,
        message: `No renderX methods. '{{name}}' should be a seperate component.`,
        data: {name},
      });
    }

    return {
      ClassDeclaration(node) {
        isES6Component = utils.isES6Component(node);
      },
      MethodDefinition(node) {
        if (!isES6Component || isRenderMethod(node)) {
          return;
        }

        report(node);
      },
    };
  }),
};

function isRenderMethod({key: {name}}) {
  return !name.match(/^render[a-zA-Z0-9]+/i);
}
