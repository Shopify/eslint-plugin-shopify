const Components = require('eslint-plugin-react/lib/util/Components');

module.exports = {
  meta: {
    docs: {
      description: 'Prevent definition of unused state fields',
      category: 'Best Practices',
      recommended: false
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    let classInfo = null;

    return {
      ClassDeclaration(node) {
        if (!utils.isES6Component(node)) {
          return;
        }

        classInfo = {
          hasStateType: classHasNonEmptytateType(node),
          declaredState: false,
        };
      },
      ClassProperty(node) {
        if (classInfo == null || getName(node.key) !== 'state' || node.value.type === 'Literal') {
          return;
        }

        classInfo.declaredState = true;
      },
      AssignmentExpression(node) {
        if (classInfo == null) {
          return;
        }

        if (
          node.left.type === 'MemberExpression' &&
          uncast(node.left.object).type === 'ThisExpression' &&
          getName(node.left.property) === 'state' &&
          node.right.type !== 'Literal'
        ) {
          classInfo.declaredState = true;
        }
      },
      'ClassDeclaration:exit'(node) {
        if (classInfo == null) {
          return;
        }

        if (classInfo.hasStateType && !classInfo.declaredState) {
          context.report(node, 'You declared a type for state, but did not initialize state.');
        }
      }
    };
  })
};

function classHasNonEmptytateType({superTypeParameters}) {
  return Boolean(superTypeParameters)
    && superTypeParameters.params.length > 1
    && superTypeParameters.params[1].type !== 'TSNeverKeyword'
    && (
      superTypeParameters.params[1].typeName == null ||
      superTypeParameters.params[1].typeName.members == null ||
      superTypeParameters.params[1].typeName.members.length > 0
    )
    && (
      superTypeParameters.params[1].properties == null ||
      superTypeParameters.params[1].properties.length > 0
    );
}

function uncast(node) {
  while (node.type === 'TypeCastExpression') {
    node = node.expression;
  }

  return node;
}

function getName(node) {
  node = uncast(node);
  const type = node.type;

  if (type === 'Identifier') {
    return node.name;
  } else if (type === 'Literal') {
    return String(node.value);
  } else if (type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0].value.raw;
  }
  return null;
}
