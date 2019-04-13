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
        if (!isHook(node)) {
          return;
        }

        inHook = true;
      },
      'FunctionDeclaration:exit': function(node) {
        if (!isHook(node)) {
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
      props = getProps(node, scope);
      break;
    }
    // case 'ObjectExpression': {
    //   props = getPropertiesForObject(node, scope);
    //   break;
    // }
    case 'Identifier': {
      const {references} = getVariableByName(scope, node.argument.name);
      props = getPropsForIdentifierReferences(references);
      break;
    }
    default: {
      props = groupProps(node, scope);
    }
  }

  if (!props) {
    return false;
  }

  return flatten(props).length > max;
}

function groupProps(val, scope) {
  const {references} = getVariableByName(scope, val.argument.name) || {};

  const properties =
    references &&
    references
      .map(
        (ref) =>
          ref.identifier &&
          ref.identifier.parent &&
          ref.identifier.parent.init &&
          ref.identifier.parent.init.elements,
      )
      .filter((el) => el);

  return flatten(properties);
}

function getProps(node, scope) {
  if (!node.argument) {
    return [];
  }

  const elementsOrProperties =
    node.argument.properties || node.argument.elements;

  const props = elementsOrProperties.reduce((acc, val) => {
    const property = isSpreadElement(val) ? groupProps(val, scope) : val;
    const prop = Array.isArray(property) ? property : [property];

    return [...acc, prop];
  }, []);

  return flatten(props);
}

function getPropsForIdentifierReferences(references) {
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

function isHook(node) {
  return /^use[A-Z0-9].*$/.test(node.id.name);
}

function isSpreadElement(node) {
  if (!node) {
    return false;
  }
  return (
    node.type === 'SpreadElement' || node.type === 'ExperimentalSpreadProperty'
  );
}

function getVariableByName(initialScope, name) {
  let scope = initialScope;

  while (scope) {
    const variable = scope.set.get(name);

    if (variable) {
      return variable;
    }

    scope = scope.upper;
  }

  return null;
}

function flatten(arr) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten,
    );
  }, []);
}
