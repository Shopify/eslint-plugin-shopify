function uncast(node) {
  let currentNode = node;

  while (
    currentNode.type === 'TypeCastExpression' ||
    currentNode.type === 'TSAsExpression'
  ) {
    currentNode = currentNode.expression;
  }

  return currentNode;
}

function getName(node) {
  const finalNode = uncast(node);
  const type = finalNode.type;

  if (type === 'Identifier') {
    return finalNode.name;
  } else if (type === 'Literal') {
    return String(finalNode.value);
  } else if (type === 'TemplateLiteral' && finalNode.expressions.length === 0) {
    return finalNode.quasis[0].value.raw;
  }
  return null;
}

module.exports = {
  uncast,
  getName,
};
