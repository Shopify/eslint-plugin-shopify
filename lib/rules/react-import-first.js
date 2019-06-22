const {docsUrl} = require('../utilities');

module.exports = {
  meta: {
    docs: {
      description: 'Ensure React is the first import statement.',
      category: 'Best Practices',
      recommended: true,
      fixable: true,
      uri: docsUrl('react-import-first'),
    },
    messages: {
      reactImportFirst:
        'React should be imported before all other import statements.',
    },
    fixable: 'true',
  },
  create(context) {
    let firstImport = null;

    return {
      ImportDeclaration(node) {
        firstImport = firstImport || node;

        if (node.source.value !== 'react') {
          return;
        }

        if (firstImport === node) {
          return;
        }

        context.report({
          messageId: 'reactImportFirst',
          fix: (fixer) => {
            const source = context.getSourceCode();
            return [
              fixer.insertTextBefore(
                source.getTokenBefore(firstImport),
                `${source.getText(node)}\n`,
              ),
              fixer.remove(node),
            ];
          },
          node,
        });
      },
    };
  },
};
