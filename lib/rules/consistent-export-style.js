import {sep, basename, extname} from 'path';

module.exports = {
  meta: {
    docs: {
      description: 'Enforces consistency in how components are exported',
      category: 'Best Practises',
      recommended: true,
    },
    schema: [],
  },

  create(context) {
    const componentExportDecalations = [];

    function isComponentsIndexFile() {
      const pathParts = context.getFilename().split(sep);
      const isIndexFile =
        basename(
          pathParts[pathParts.length - 1],
          extname(pathParts[pathParts.length - 1]),
        ) === 'index';

      const inComponentsFolder =
        pathParts[pathParts.length - 2] === 'components';

      return isIndexFile && inComponentsFolder;
    }

    return {
      'Program:exit': function() {
        const exportsMap = groupExports(componentExportDecalations);
        exportsMap.forEach((item) => {
          if (item.nodes.length <= 1) {
            if (checkSpecifierShape(item.nodes[0])) {
              return;
            }

            context.report({
              node: item.nodes[0],
              message: [
                'Export does not match a valid format.',
                'Expecting a default component export',
                'matching the name of the source,',
                `followed by the component's Props.`,
              ].join(' '),
            });

            return;
          }

          item.nodes.forEach((groupNode) =>
            context.report({
              node: groupNode,
              message:
                'Group multiple export from the same file into a single export.',
            }),
          );
        });
      },
      ExportNamedDeclaration(node) {
        if (isComponentsIndexFile()) {
          componentExportDecalations.push(node);
        }
      },
    };
  },
};

function checkSpecifierShape(node) {
  return validFirstSpecifier(node) && validSecondSpecifier(node);
}

function validFirstSpecifier(node) {
  return (
    node.specifiers[0].local.name === 'default' &&
    node.specifiers[0].exported.name === getSourceName(node)
  );
}

function validSecondSpecifier(node) {
  return (
    node.specifiers[1].local.name === 'Props' &&
    node.specifiers[1].exported.name === `${getSourceName(node)}Props`
  );
}

function getSourceName(node) {
  const sourceParts = node.source.value.split('/');
  return sourceParts[sourceParts.length - 1];
}

function groupExports(nodes) {
  const cache = new Map();
  nodes.forEach((node) => {
    if (cache.has(node.source.value)) {
      const currentNodes = cache.get(node.source.value).nodes;
      cache.set(node.source.value, {nodes: [...currentNodes, node]});
      return;
    }

    cache.set(node.source.value, {nodes: [node]});
  });

  return cache;
}
