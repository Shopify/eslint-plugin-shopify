const BAD_FEATURES = {
  immutability: ['setState', 'setContext', 'simulate', 'simulateError'],
  'component-boundaries': ['instance', 'state', 'ref'],
};

const MESSAGES = {
  setState: `Avoid using setState to test React components. 
    The state of a component should remain private 
    and local to that component. Instead, consider...`,
  setContext: `Avoid using setContext to test React components. 
    The context of a component should remain private 
    and local to that component. Instead, consider...`,
  simulate: 'Instead, consider using trigger from @shopify/enzyme-utilties',
  simulateError: 'WIP',
  instance: 'WIP',
  state: 'WIP',
  ref: 'WIP',
};

module.exports = {
  MESSAGES,
  meta: {
    docs: {
      description:
        'Disallows a group of Enzyme features that lead to bad practices.',
      category: 'Best Practices',
      recommended: true,
      uri:
        'https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/enzyme/no-bad-features.md',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: {
              enum: Object.keys(BAD_FEATURES).reduce((acc, value) => {
                return [...acc, value, ...BAD_FEATURES[value]];
              }, []),
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const enzymeWrappers = [];
    const options = context.options[0] || {};
    const allowed = options.allow || [];

    function report(node, prop) {
      context.report({
        node,
        message: MESSAGES[prop]
          ? MESSAGES[prop]
          : 'No bad enzyme features. Avoid using {{prop}} on an enzyme wrapper.',
        data: {prop},
      });
    }

    function checkNodeForInvalidProps(node) {
      const invalidProps = getInvalidPropsForNode(node, allowed);
      if (invalidProps.length) {
        return invalidProps.map((prop) => report(node, prop));
      }

      const variableDeclaratorParent = findParent(
        node,
        (parent) => parent.type === 'VariableDeclarator',
      );

      if (variableDeclaratorParent) {
        const references = context
          .getDeclaredVariables(variableDeclaratorParent)[0]
          .references.slice(1);
        references.forEach((reference) =>
          checkNodeForInvalidProps(reference.identifier),
        );
      }

      return false;
    }

    return {
      'Program:exit': function() {
        enzymeWrappers.forEach(checkNodeForInvalidProps);
      },
      CallExpression(node) {
        if (!isEnzymeWrapper(node)) {
          return;
        }

        enzymeWrappers.push(node);
      },
    };
  },
};

function isEnzymeWrapper({callee: {name}}) {
  return name === 'shallow' || name === 'mount' || name === 'render';
}

function getInvalidPropsForNode(node, allowed) {
  if (node.parent.type !== 'MemberExpression') {
    return false;
  }

  return Object.keys(BAD_FEATURES)
    .reduce((acc, value) => {
      if (allowed.length === 0) {
        return [...acc, ...BAD_FEATURES[value]];
      }

      if (allowed.length > 0 && allowed.includes(value)) {
        return acc;
      }

      return [
        ...acc,
        ...BAD_FEATURES[value].filter((feature) => !allowed.includes(feature)),
      ];
    }, [])
    .map((prop) => {
      if (hasPropertyName(node.parent, prop)) {
        return prop;
      }
      return null;
    })
    .filter((prop) => prop);
}

function hasPropertyName({property}, name) {
  return property && property.name === name;
}

function findParent(node, test) {
  if (test(node)) {
    return node;
  } else if (node.parent) {
    return findParent(node.parent, test);
  }
  return null;
}
