const pascalCase = require('pascal-case');
const resolve = require('eslint-module-utils/resolve').default;

module.exports = {
  meta: {
    docs: {
      description: 'Prevent module imports between components.',
      category: 'Best Practises',
      recommended: false,
      uri:
        'https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/strict-component-boundaries.md',
    },
    fixable: null,
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;
        const pathParts = importSource
          .split('/')
          .filter((part) => part[0] !== '.');

        if (inNodeModules(importSource, context)) {
          return;
        }

        if (
          (hasAnotherComponentInPath(pathParts) && pathParts.length > 1) ||
          (hasComponentDirectoryInPath(pathParts) && pathParts.length > 2)
        ) {
          context.report({
            node,
            message: 'Strict component boundaries.',
          });
        }
      },
    };
  },
};

function inNodeModules(importSource, context) {
  const resolvedSource = resolve(importSource, context);

  if (resolvedSource === null) {
    return true;
  }

  if (!resolvedSource) {
    return false;
  }

  return resolvedSource.match(/node_modules/);
}

function hasComponentDirectoryInPath(pathParts) {
  return Boolean(pathParts.filter((part) => part === 'components').length);
}

function hasAnotherComponentInPath(pathParts) {
  return Boolean(pathParts.filter((part) => part === pascalCase(part)).length);
}
