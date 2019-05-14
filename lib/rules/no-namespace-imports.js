const {docsUrl} = require('../utilities');

module.exports = {
  meta: {
    docs: {
      description: 'Prevent namespace import declarations.',
      category: 'Stylistic Issues',
      recommended: false,
      uri: docsUrl('no-namespace-imports'),
    },
    schema: [
      {
        type: 'object',
        properties: {
          modules: {
            type: 'array',
            items: {type: 'string'},
          },
          ignore: {
            type: 'array',
            items: {type: 'string'},
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      namespaceImport: `The namespace import declaration for {{name}} should be converted to a default or named import.`,
    },
    fixable: 'code',
  },
  create(context) {
    const options = context.options[0] || {};
    const ignored = options.ignore || [];
    const modules = options.modules || [];

    function report(node) {
      const name = node.source.value;

      context.report({
        node,
        messageId: 'namespaceImport',
        data: {name},
        fix: (fixer) => {
          const source = context.getSourceCode();
          const namespaceSpecifiers = getNamespaceSpecifiers(node);

          return namespaceSpecifiers.map((specifier) => {
            const start = source.getFirstToken(specifier).range[0];
            const end = source.getLastToken(specifier).range[1];
            const namespaceName = specifier.local.name;

            return fixer.replaceTextRange([start, end], namespaceName);
          });
        },
      });
    }

    return {
      ImportDeclaration(node) {
        if (
          notCommonJsModule(node, modules) ||
          isIgnoredModule(node, ignored)
        ) {
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

function notCommonJsModule(node, modules) {
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
    ...modules,
  ].some((module) => module === node.source.value);
}

function isIgnoredModule(node, ignored) {
  return ignored.some((module) => module === node.source.value);
}
