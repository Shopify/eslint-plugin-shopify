const {docsUrl} = require('../utilities');

const MAX_RETURN_ELEMENTS = 2;

module.exports = {
  meta: {
    docs: {
      description: 'Enforce stict return style from React hooks.',
      category: 'Best Practices',
      recommended: true,
      uri: docsUrl('hooks-strict-return'),
    },
    messages: {
      hooksStrictReturn:
        'Hooks must return a tuple of two or fewer values or a single object.',
    },
  },

  create(context) {
    let inHook = false;

    return {
      FunctionDeclaration(node) {
        if (!isHookDeclaration(node)) {
          return;
        }

        inHook = true;
      },
      'FunctionDeclaration:exit': function(node) {
        if (!isHookDeclaration(node)) {
          return;
        }

        inHook = false;
      },
      ReturnStatement(node) {
        if (!inHook) {
          return;
        }
        if (
          !exceedsMaxReturnProperties(
            node,
            context.getScope(),
            MAX_RETURN_ELEMENTS,
          )
        ) {
          return;
        }

        context.report({
          messageId: 'hooksStrictReturn',
          node,
        });
      },
    };
  },
};

function exceedsMaxReturnProperties(node, scope, max) {
  let props;
  switch (node.argument.type) {
    case 'ArrayExpression': {
      props = node.argument && node.argument.elements;
      break;
    }
    case 'ObjectExpression': {
      props = getPropertiesForObject(node);
      break;
    }

    case 'Identifier': {
      const {references} = getVariableByName(scope, node.argument.name);
      props = getPropertiesForIdentifier(references);
      break;
    }
    default: {
      props = gatherProperties(node, scope);
    }
  }

  return props && props.length > max;
}

function gatherProperties(val, scope) {
  const {references} = getVariableByName(scope, val.argument.name) || {};

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

function isHookDeclaration(node) {
  return /^use[A-Z0-9].*$/.test(node.id.name);
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
function getPropertiesForObject(node) {
  node.argument.properties.reduce((acc, val) => {
    const prop = isSpreadElement(val) ? gatherProperties(val) : val;

    return [...acc, prop];
  }, []);
}

function getPropertiesForIdentifier(references) {
  return (
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
    }, [])
  );
}

// function isHook(node) {
//   if (node.type === 'Identifier') {
//     return isHookName(node.name);
//   } else if (
//     node.type === 'MemberExpression' &&
//     !node.computed &&
//     isHook(node.property)
//   ) {
//     const obj = node.object;
//     return obj.type === 'Identifier' && obj.name === 'React';
//   } else {
//     return false;
//   }
// }
