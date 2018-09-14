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
        const resolvedSource = resolve(importSource, context);
        const pathParts = pathSegmantsFromSource(importSource);

        if (
          isCoreModule(resolvedSource) ||
          inNodeModules(pathSegmantsFromSource(resolvedSource))
        ) {
          return;
        }

        if (
          (hasAnotherComponentInPath(pathParts) &&
            pathParts.length > 1 &&
            !validFixtureImport(pathParts)) ||
          (hasDirectoryInPath(pathParts, 'components') &&
            pathParts.length > 2 &&
            !validFixtureImport(pathParts))
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

function isCoreModule(resolvedSource) {
  return resolvedSource === null;
}

function inNodeModules(pathParts) {
  return (
    pathParts &&
    Boolean(pathParts.filter((part) => part === 'node_modules').length)
  );
}

function hasDirectoryInPath(pathParts, directory) {
  return Boolean(pathParts.filter((part) => part === directory).length);
}

function validFixtureImport(pathParts) {
  if (!hasDirectoryInPath(pathParts, 'fixtures')) {
    return false;
  }

  const fixtureIndexInPath = pathParts.findIndex((part) => part === 'fixtures');
  const pathPartsBeforeFixture = pathParts.slice(0, fixtureIndexInPath);

  if (!hasAnotherComponentInPath(pathPartsBeforeFixture)) {
    return true;
  }

  return false;
}

function hasAnotherComponentInPath(pathParts) {
  return Boolean(pathParts.filter((part) => part === pascalCase(part)).length);
}

function pathSegmantsFromSource(source) {
  return source && source.split('/').filter((part) => part[0] !== '.');
}
