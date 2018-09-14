import {extname} from 'path';

module.exports = {
  meta: {
    docs: {
      description: 'Require React import in .jsx and .tsx files.',
      category: 'Best Practises',
      recommended: false,
      uri:
        'https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/jsx-require-react.md',
    },
    fixable: null,
  },
  create(context) {
    const reactImports = [];
    let isTsxOrJsxFile = false;

    function checkFilename() {
      const fileExtension = extname(context.getFilename());
      isTsxOrJsxFile = ['.tsx', '.jsx'].some((ext) => ext === fileExtension);
    }

    function report(node) {
      context.report({
        node,
        message: [
          `Missing import to React. Since JSX compiles to React.createElement calls,`,
          `the React library must be in scope when inside {{extname}} files.`,
        ].join(' '),
        data: {
          extname: extname(context.getFilename()),
        },
      });
    }

    return {
      JSXOpeningElement: checkFilename,
      JSXOpeningFragment: checkFilename,
      ImportDeclaration(node) {
        if (node.source.value === 'react') {
          reactImports.push(node);
        }
      },
      'Program:exit': function(node) {
        if (!reactImports.length && isTsxOrJsxFile) {
          report(node);
        }
      },
    };
  },
};
