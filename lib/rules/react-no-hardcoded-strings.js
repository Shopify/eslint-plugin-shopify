// interface Config extends Settings {
//   modules: {
//     [key: string]: Module,
//   },
// }
//
// interface Settings {
//   allowAnything: boolean;
//   allowNumbers: boolean;
//   allowBoolean: boolean;
//   checkProps: string[];
// }

// interface Module {
//   [key: string]: Settings,
// }

const resolve = require('eslint-module-utils/resolve').default;

module.exports = {
  meta: {
    docs: {
      description:
        'Requires that React component state be typed in TypeScript.',
      category: 'Possible Errors',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowStrings: {
            type: 'boolean',
          },
          allowNumbers: {
            type: 'boolean',
          },
          allowBooleans: {
            type: 'boolean',
          },
          checkProps: {
            type: 'array',
            items: {type: 'string'},
          },
          modules: {
            type: 'object',
            additionalProperties: {
              type: 'object',
              additionalProperties: {
                type: 'object',
                properties: {
                  allowBooleans: {
                    type: 'boolean',
                  },
                  allowNumbers: {
                    type: 'boolean',
                  },
                  allowStrings: {
                    type: 'boolean',
                  },
                  checkProps: {
                    items: {
                      type: 'string',
                    },
                    type: 'array',
                  },
                },
              },
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const defaultOptions = context.options[0] || {};
    const modules = defaultOptions.modules || {};

    function createContentChecker(node) {
      const {
        allowStrings = false,
        allowNumbers = true,
        allowBooleans = true,
        checkProps = [],
      } = getOptionsForNode(node);

      function isInvalidContent(contentNode) {
        return (
          (contentNode.type === 'Literal' &&
            ((!allowStrings && typeof contentNode.value === 'string') ||
              (!allowNumbers && typeof contentNode.value === 'number') ||
              (!allowBooleans && typeof contentNode.value === 'boolean'))) ||
          (contentNode.type === 'TemplateLiteral' && !allowStrings) ||
          (contentNode.type === 'JSXExpressionContainer' &&
            isInvalidContent(contentNode.expression))
        );
      }

      function isInvalidProp(propNode) {
        return (
          propNode.type === 'JSXAttribute' &&
          checkProps.some(prop => prop === propNode.name.name) &&
          isInvalidContent(
            propNode.value == null
              ? {type: 'Literal', value: true}
              : propNode.value
          )
        );
      }

      return function hasHardcodedContent(node) {
        if (node.children.some(isInvalidContent)) {
          return {valid: false, prop: 'children'};
        }

        const invalidProp =
          node.openingElement.attributes &&
          node.openingElement.attributes.find(isInvalidProp);
        return invalidProp
          ? {valid: false, prop: invalidProp.name.name}
          : {valid: true};
      };
    }

    function getOptionsForNode(node) {
      const importDetails = getImportedDetailsForName(
        node.openingElement.name.name,
        context
      );

      if (importDetails == null) {
        return defaultOptions;
      }


      console.log(importDetails.source, resolve(importDetails.source, context));
      const foundModule = modules[importDetails.source];
      if (foundModule == null) {
        return defaultOptions;
      }

      return foundModule[importDetails.name] || defaultOptions;
    }

    function getHardcodedContentChecker(node) {
      return createContentChecker(node);
    }

    return {
      JSXElement(node) {
        const contentChecker = getHardcodedContentChecker(node);
        const check = contentChecker(node);

        if (check.valid) {
          return;
        }

        const elementName = node.openingElement.name.name;

        if (check.prop === 'children') {
          context.report(
            node,
            `You must not use hardcoded content as the children of the ${
              elementName
            } component.`
          );
        } else if (check.prop) {
          context.report(
            node,
            `You must not use hardcoded content in the ${
              check.prop
            } prop of the ${elementName} component.`
          );
        }
      },
    };
  },
};

function getImportedDetailsForName(name, context) {
  const definition = findDefinition(name, context);
  if (definition == null || definition.type !== 'ImportBinding') {
    return null;
  }

  const source = definition.parent.source.value;
  const originalName = definition.node.imported.name;
  return {source, name: originalName};
}

function findDefinition(name, context) {
  let definition = null;
  let currentScope = context.getScope();

  while (currentScope && !definition) {
    if (currentScope.set.has(name)) {
      const {defs} = currentScope.set.get(name);
      definition = defs[defs.length - 1];
    }

    currentScope = currentScope.upper;
  }

  return definition;
}
