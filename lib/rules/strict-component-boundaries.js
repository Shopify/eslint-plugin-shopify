const pascalCase = require('pascal-case');

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
        const pathParts = node.source.value
          .split('/')
          .filter((part) => part[0] !== '.');

        if (
          isInvalidFixtureDirectory(pathParts) &&
          ((hasAnotherComponentInPath(pathParts) && pathParts.length > 1) ||
            (hasComponentDirectoryInPath(pathParts) && pathParts.length > 2))
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

function hasComponentDirectoryInPath(pathParts) {
  return Boolean(pathParts.filter((part) => part === 'components').length);
}

function hasAnotherComponentInPath(pathParts) {
  return Boolean(pathParts.filter((part) => part === pascalCase(part)).length);
}

function isInvalidFixtureDirectory(pathParts) {
  const fixtureIndex = pathParts.indexOf('fixtures');

  if (fixtureIndex === -1) {
    return true;
  }

  const pathBeforeFixture = pathParts.slice(0, fixtureIndex);
  return (
    hasComponentDirectoryInPath(pathBeforeFixture) ||
    hasAnotherComponentInPath(pathBeforeFixture)
  );
}
