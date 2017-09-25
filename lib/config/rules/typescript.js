// See https://github.com/nzakas/eslint-plugin-typescript

module.exports = {
  // enforces one space after the colon and zero spaces before the colon of a type annotation.
  'typescript/type-annotation-spacing': ['error'],

  // enforces accessibility modifiers on class properties and methods. (member-access from TSLint)
  'typescript/explicit-member-accessibility': 'off',

  // enforces interface names are prefixed. (interface-name from TSLint)
  'typescript/interface-name-prefix': 'off',

  // enforces /// <reference /> is not used. (no-reference from TSLint)
  'typescript/no-triple-slash-reference': 'error',

  // enforces the any type is not used. (no-any from TSLint)
  'typescript/no-explicit-any': 'off',

  // enforces the use of as Type assertions instead of <Type> assertions. (no-angle-bracket-type-assertion from TSLint)
  'typescript/no-angle-bracket-type-assertion': 'error',

  // disallows the use of custom TypeScript modules and namespaces
  'typescript/no-namespace': 'off',

  // disallows the use of variables before they are defined.
  'typescript/no-use-before-define': 'off',

  // enforces the use of the keyword namespace over module to declare custom TypeScript modules. (no-internal-module from TSLint)
  'typescript/prefer-namespace-keyword': 'off',

  // disallows the use of type aliases. (interface-over-type-literal from TSLint)
  // breaks `export type Message = string | ((colorizer: any) => string);`
  'typescript/no-type-alias': 'off',

  // enforces a standard member declaration order. (member-ordering from TSLint) <FEEDBACK>
  'typescript/member-ordering': 'error',

  // prevents TypeScript-specific constructs from being erroneously flagged as unused
  'typescript/no-unused-vars': 'off',

  // enforces member overloads to be consecutive.
  'typescript/adjacent-overload-signatures': 'error',

  // disallows parameter properties in class constructors. (no-parameter-properties from TSLint)
  'typescript/no-parameter-properties': 'off',

  // enforces PascalCased class and interface names. (class-name from TSLint)
  'typescript/class-name-casing': 'error',

  // enforces a member delimiter style in interfaces and type literals.
  'typescript/member-delimiter-style': ['error', {
    delimiter: 'comma',
    overrides: {
      typeLiteral: {
        delimiter: 'comma',
      },
    },
  }],

  // disallows the declaration of empty interfaces. (no-empty-interface from TSLint)
  'typescript/no-empty-interface': 'off',


  // Disabled rules (already supported by TS)
  'no-undef': 'off',
  'no-unused-expressions': 'off',
  'no-unused-vars': 'off',
  'no-useless-constructor': 'off',
  'no-shadow': 'off',
  'no-use-before-define': 'off',

  // Does not support TS equivalent
  'import/no-unresolved': 'off',
  'import/no-extraneous-dependencies': 'off',

  // Breaks typescript-eslint-parser
  'array-callback-return': 'off',
  'getter-return': 'off',
  'strict': 'off',
  'lines-around-directive': 'off',
  'shopify/prefer-early-return': 'off',
  'no-empty-function': 'off',
  'import/namespace': 'off',
  'import/no-deprecated': 'off',
  'import/named': 'off',
};
