const {docsUrl} = require('../utilities');
const MAX_RETURN_ELEMENTS = 2;

module.exports = {
  meta: {
    docs: {
      description: 'Enforce stict return style from React hooks.',
      category: 'Best Practices',
      recommended: true,
      uri: docsUrl('hooks-strict-return'),
      messages: {
        hooksStrictReturn:
          'Hooks must return a tuple of two or fewer values or a single object.',
      },
    },
  },
  create(context) {
    let inHook = false;

    function exceedsMaxReturnElements(node, max) {
      if (node.argument.type === 'ArrayExpression') {
        return node.argument && node.argument.elements.length > max;
      }

      if (node.argument.type === 'ObjectExpression') {
        const elements = node.argument.properties.reduce((acc, val) => {
          const prop = isSpreadElement(val) ? gatherProperties(val) : val;

          return [...acc, prop];
        }, []);

        return elements.length > max;
      }

      if (node.argument.type === 'Identifier') {
        const {references} = getVariableByName(
          context.getScope(),
          node.argument.name,
        );
        const elements =
          references &&
          references.reduce((acc, ref) => {
            if (
              ref.identifier &&
              ref.identifier.parent &&
              ref.identifier.parent.init &&
              ref.identifier.parent.init.elements
            ) {
              return [...acc, ...ref.identifier.parent.init.elements];
            }
            return acc;
          }, []);

        return elements.length > max;
      }

      return gatherProperties(node).length > max;
    }

    function gatherProperties(val) {
      const {references} =
        getVariableByName(context.getScope(), val.argument.name) || {};

      return (
        references &&
        references
          .map((ref) => {
            if (
              ref.identifier &&
              ref.identifier.parent &&
              ref.identifier.parent.init &&
              ref.identifier.parent.init.properties
            ) {
              return ref.identifier.parent.init.properties;
            }

            return null;
          })
          .filter((el) => el)
          .flat()
      );
    }

    return {
      FunctionDeclaration(node) {
        if (!isHookDeclaration(node)) {
          return;
        }

        inHook = true;
      },
      ReturnStatement(node) {
        if (!inHook) {
          return;
        }
        if (!exceedsMaxReturnElements(node, MAX_RETURN_ELEMENTS)) {
          return;
        }

        context.report({message: 'noooo', node});
      },
      'FunctionDeclaration:exit': function(node) {
        if (!isHookDeclaration(node)) {
          return;
        }

        inHook = false;
      },
    };
  },
};

function isHookDeclaration(node) {
  return node.id.name.startsWith('use');
}

function isSpreadElement(node) {
  return (
    node.type === 'SpreadElement' || node.type === 'ExperimentalSpreadProperty'
  );
}

function getVariableByName(initScope, name) {
  let scope = initScope;

  while (scope) {
    const variable = scope.set.get(name);

    if (variable) {
      return variable;
    }

    scope = scope.upper;
  }

  return null;
}

/**
 * Catch all identifiers that begin with "use" followed by an uppercase Latin
 * character to exclude identifiers like "user".
 */

function isHookName(s) {
  return /^use[A-Z0-9].*$/.test(s);
}

/**
 * We consider hooks to be a hook name identifier or a member expression
 * containing a hook name.
 */

function isHook(node) {
  if (node.type === 'Identifier') {
    return isHookName(node.name);
  } else if (
    node.type === 'MemberExpression' &&
    !node.computed &&
    isHook(node.property)
  ) {
    const obj = node.object;
    return obj.type === 'Identifier' && obj.name === 'React';
  } else {
    return false;
  }
}
