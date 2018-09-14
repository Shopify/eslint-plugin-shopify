const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/jsx-require-react');

require('babel-eslint');

const parser = 'babel-eslint';
const ruleTester = new RuleTester();
function errorWithExt(extname) {
  return [
    {
      message: [
        `Missing import to React. Since JSX compiles to React.createElement calls,`,
        `the React library must be in scope when inside ${extname} files.`,
      ].join(' '),
    },
  ];
}

ruleTester.run('jsx-require-react', rule, {
  valid: [
    {
      code: `
        import React from 'react';
        function Card(props) {
          return (
            <div>{props.children}</div>
          )
        };
        export default Card;
      `,
      parser,
      filename: 'MyComponent.tsx',
    },
    {
      code: `
        import React from 'react';
        function Card(props) {
          return (
            <div>{props.children}</div>
          )
        };
        export default Card;
      `,
      parser,
      filename: 'MyComponent.jsx',
    },
    {
      code: `
        import * as React from 'react';
        function Card(props) {
          return (
            <div>{props.children}</div>
          )
        };
        export default Card;
      `,
      parser,
      filename: 'MyComponent.tsx',
    },
    {
      code: `
        import * as React from 'react';
        function Card(props) {
          return (
            <div>{props.children}</div>
          )
        };
        export default Card;
      `,
      parser,
      filename: 'MyComponent.jsx',
    },
    {
      code: `
        function Card(props) {
          return (
            <div>{props.children}</div>
          )
        };
        export default Card;`,
      parser,
    },
  ],
  invalid: [
    {
      code: `
        function Card(props) {
          return (
            <div>{props.children}</div>
          )
        };
        export default Card;`,
      parser,
      errors: errorWithExt('.tsx'),
      filename: 'MyComponent.tsx',
    },
    {
      code: `
        function Card(props) {
          return (
            <div>{props.children}</div>
          )
        };
        export default Card;`,
      parser,
      errors: errorWithExt('.jsx'),
      filename: 'MyComponent.jsx',
    },
  ],
});
