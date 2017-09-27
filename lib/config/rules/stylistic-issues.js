// see http://eslint.org/docs/rules/#stylistic-issues

module.exports = {
  // enforce linebreaks after opening and before closing array brackets
  'array-bracket-newline': 'off',
  // Enforce spacing inside array brackets
  'array-bracket-spacing': ['warn', 'never'],
  // enforce line breaks after each array element
  'array-element-newline': 'off',
  // Disallow or enforce spaces inside of single line blocks
  'block-spacing': ['warn', 'always'],
  // Enforce one true brace style
  'brace-style': ['warn', '1tbs', {allowSingleLine: true}],
  // Require camel case names
  'camelcase': ['warn', {properties: 'always'}],
  // Enforce or disallow capitalization of the first letter of a comment
  'capitalized-comments': 'off',
  // Enforce spacing before and after comma
  'comma-spacing': ['warn', {before: false, after: true}],
  // Enforce one true comma style
  'comma-style': ['warn', 'last'],
  // Require or disallow padding inside computed properties
  'computed-property-spacing': ['warn', 'never'],
  // Enforces consistent naming when capturing the current execution context
  'consistent-this': ['warn', 'self'],
  // Enforce newline at the end of file, with no multiple empty lines
  'eol-last': 'warn',
  // Disallow space between function identifier and application
  'func-call-spacing': 'warn',
  // Require function names to match the name of the variable or property to which they are assigned
  'func-name-matching': 'warn',
  // Don't require function expressions to have a name
  'func-names': 'off',
  // Enforces use of function declarations or expressions
  'func-style': ['warn', 'declaration'],
  // enforce consistent line breaks inside function parentheses
  'function-paren-newline': ['error', 'consistent'],
  // Blacklist certain identifiers to prevent them being used
  'id-blacklist': 'off',
  // This option enforces minimum and maximum identifier lengths (variable names, property names etc.)
  'id-length': ['warn', {
    min: 2,
    properties: 'always',
    exceptions: ['x', 'y', 'i', 'j', 't', '_', '$'],
  }],
  // Require identifiers to match the provided regular expression
  'id-match': 'off',
  // Disable eslint v4 stricter indent rules
  'indent': 'off',
  // Use eslint v3 indent rules: This option sets a specific tab width for your code
  'indent-legacy': ['warn', 2, {SwitchCase: 1, MemberExpression: 1}],
  // Specify whether double or single quotes should be used in JSX attributes
  'jsx-quotes': ['warn', 'prefer-double'],
  // Enforces spacing between keys and values in object literal properties
  'key-spacing': ['warn', {beforeColon: false, afterColon: true}],
  // Enforce spacing before and after keywords
  'keyword-spacing': ['warn', {before: true, after: true, overrides: {}}],
  // Disallow mixed "LF" and "CRLF" as linebreaks
  'linebreak-style': 'off',
  // Enforces empty lines around comments
  'lines-around-comment': ['warn', {beforeBlockComment: true}],
  // Enforce position of line comments
  'line-comment-position': ['warn', {position: 'above'}],
  // Enforce a maximum file length
  'max-lines': 'off',
  // Specify the maximum depth callbacks can be nested
  'max-nested-callbacks': 'off',
  // Specify the maximum number of statements allowed per line
  'max-statements-per-line': ['warn', {max: 2}],
  // Enforce newlines between operands of ternary expressions
  'multiline-ternary': 'off',
  // Require a capital letter for constructors
  'new-cap': ['error', {newIsCap: true, capIsNew: false}],
  // Disallow the omission of parentheses when invoking a constructor with no arguments
  'new-parens': 'warn',
  // Allow/disallow an empty newline after var statement
  'newline-after-var': 'off',
  // Require newline before `return` statement
  'newline-before-return': 'off',
  // Enforce newline after each call when chaining the calls
  'newline-per-chained-call': ['warn', {ignoreChainWithDepth: 3}],
  // Disallow use of the Array constructor
  'no-array-constructor': 'error',
  // Disallow use of the continue statement
  'no-continue': 'off',
  // Disallow comments inline after code
  'no-inline-comments': 'off',
  // Disallow if as the only statement in an else block
  'no-lonely-if': 'warn',
  // Disallow mixes of different operators
  'no-mixed-operators': 'warn',
  // Disallow mixed spaces and tabs for indentation
  'no-mixed-spaces-and-tabs': 'warn',
  // Disallow use of chained assignment expressions
  'no-multi-assign': 'error',
  // Disallow multiple empty lines
  'no-multiple-empty-lines': 'warn',
  // Disallow negated conditions
  'no-negated-condition': 'warn',
  // Disallow nested ternary expressions
  'no-nested-ternary': 'warn',
  // Disallow use of the Object constructor
  'no-new-object': 'warn',
  // Disallow specified syntax
  'no-restricted-syntax': 'off',
  // Disallow tabs in file
  'no-tabs': 'warn',
  // Disallow the use of ternary operators
  'no-ternary': 'off',
  // Disallow trailing whitespace at the end of lines
  'no-trailing-spaces': 'warn',
  // Allow dangling underscores in identifiers
  'no-underscore-dangle': 'off',
  // Disallow the use of Boolean literals in conditional expressions
  'no-unneeded-ternary': 'warn',
  // Disallow whitespace before properties
  'no-whitespace-before-property': 'error',
  // Enforce the location of single-line statements
  'nonblock-statement-body-position': 'off',
  // Enforce consistent line breaks inside braces
  'object-curly-newline': 'off',
  // Require or disallow padding inside curly braces
  'object-curly-spacing': ['warn', 'never'],
  // Enforce placing object properties on separate lines
  'object-property-newline': 'off',
  // Allow or disallow one variable declaration per function
  'one-var': ['warn', 'never'],
  // Require or disallow an newline around variable declarations
  'one-var-declaration-per-line': ['warn', 'initializations'],
  // Require assignment operator shorthand where possible or prohibit it entirely
  'operator-assignment': ['warn', 'always'],
  // Enforce operators to be placed before or after line breaks
  'operator-linebreak': ['warn', 'after', {overrides: {'?': 'before', ':': 'before'}}],
  // Enforce padding within blocks
  'padded-blocks': 'off',
  // require or disallow padding lines between statements
  'padding-line-between-statements': [
    'error',
    {blankLine: 'always', prev: 'directive', next: '*'},
    {blankLine: 'any', prev: 'directive', next: 'directive'},
  ],
  // Require quotes around object literal property names
  'quote-props': ['warn', 'as-needed'],
  // Specify whether backticks, double or single quotes should be used
  'quotes': ['warn', 'single', 'avoid-escape'],
  // Require JSDoc comments
  'require-jsdoc': 'off',
  // Enforce spacing before and after semicolons
  'semi-spacing': ['warn', {before: false, after: true}],
  // enforce location of semicolons
  'semi-style': ['error', 'last'],
  // Require or disallow use of semicolons instead of ASI
  'semi': ['warn', 'always'],
  // Requires object keys to be sorted
  'sort-keys': 'off',
  // Sort variables within the same declaration block
  'sort-vars': 'off',
  // Require or disallow space before blocks
  'space-before-blocks': ['warn', 'always'],
  // Require or disallow space before function opening parenthesis
  'space-before-function-paren': ['error', {
    anonymous: 'never',
    named: 'never',
    asyncArrow: 'always',
  }],
  // Require or disallow spaces inside parentheses
  'space-in-parens': ['warn', 'never'],
  // Require spaces around operators
  'space-infix-ops': 'warn',
  // Require or disallow spaces before/after unary operators (words on by default, nonwords)
  'space-unary-ops': ['warn', {words: true, nonwords: false}],
  // Require or disallow a space immediately following the // or /* in a comment
  'spaced-comment': ['warn', 'always', {markers: ['=']}],
  // enforce spacing around colons of switch statements
  'switch-colon-spacing': ['error', {'after': true, 'before': false}],
  // Require or disallow spacing between template tags and their literals
  'template-tag-spacing': ['error', 'never'],
  // Require or disallow the Unicode BOM
  'unicode-bom': ['warn', 'never'],
  // Require regex literals to be wrapped in parentheses
  'wrap-regex': 'off',
};
