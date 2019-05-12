const {docsUrl} = require('../utilities');

module.exports = {
  meta: {
    docs: {
      description: 'TODO',
      category: 'Stylistic Issues',
      recommended: false,
      uri: docsUrl('no-namespace-imports'),
    },
    messages: {
      namespacedImport: `The namespace import for {{name}} should be converted to a default or named import.`,
    },
    fixable: null,
  },
  create(context) {
    function report(node) {
      const name = node.source.value;

      context.report({
        node,
        messageId: 'namespaceImport',
        data: {name},
      });
    }

    return {
      ImportDeclaration(node) {
        if (notCommonJsModule(node)) {
          return;
        }

        const namespaceSpecifiers = getNamespaceSpecifiers(node);

        if (namespaceSpecifiers.length === 0) {
          return;
        }

        report(node);
      },
    };
  },
};

function getNamespaceSpecifiers(node) {
  return node.specifiers.filter((specifier) => {
    return specifier.type === 'ImportNamespaceSpecifier';
  });
}

function notCommonJsModule(node) {
  return ![
    '@shopify/app-bridge',
    '@shopify/app-bridge/actions',
    '@shopify/app-bridge/validate/actions/navigation',
    '@shopify/app-bridge/validate/actions/resourcePicker',
    '@shopify/app-bridge/validate/actions',
    '@shopify/react-form-state',
    '@shopify/safe-redirect',
    'd3',
    'faker',
    'fs',
    'glob',
    'history',
    'http',
    'koa',
    'react-dom',
    'react-router',
    'redux',
    'topojson',
    'prop-types',
    'react',
    'url',
  ].some((module) => module === node.source.value);
}
