const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/react-initialize-state');

const ruleTester = new RuleTester();

require('babel-eslint');
require('typescript-eslint-parser');

const babelParser = 'babel-eslint';
const typeScriptParser = 'typescript-eslint-parser';

const errors = [{
  type: 'ClassDeclaration',
  message: 'You declared a type for state, but did not initialize state.',
}];

ruleTester.run('react-initialize-state', rule, {
  valid: [
    {
      code: 'class Button {}',
      parser: babelParser,
    },
    {
      code: 'class Button extends Klass {}',
      parser: babelParser,
    },
    {
      code: 'class Button extends React.Component {}',
      parser: babelParser,
    },
    {
      code: 'class Button extends React.Component<Props> {}',
      parser: babelParser,
    },
    {
      code: 'class Button extends React.Component<Props, {}> {}',
      parser: babelParser,
    },
    {
      code: `class Button extends React.Component<Props, {focused: boolean}> {
        state = {focused: false};
      }`,
      parser: babelParser,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        state = {focused: false};
      }`,
      parser: babelParser,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        state = getState();
      }`,
      parser: babelParser,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        constructor() {
          this.state = {focused: true};
        }
      }`,
      parser: babelParser,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        constructor() {
          this.state = getState();
        }
      }`,
      parser: babelParser,
    },
    {
      code: 'class Button extends React.Component {}',
      parser: typeScriptParser,
    },
    {
      code: 'class Button extends React.Component<Props, {}> {}',
      parser: typeScriptParser,
    },
    {
      code: 'class Button extends React.Component<Props, never> {}',
      parser: typeScriptParser,
    },
    {
      code: `class Button extends React.Component<Props, {focused: boolean}> {
        state = {focused: false};
      }`,
      parser: typeScriptParser,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        state = {focused: false};
      }`,
      parser: typeScriptParser,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        state = getState();
      }`,
      parser: typeScriptParser,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        constructor() {
          this.state = {focused: true};
        }
      }`,
      parser: typeScriptParser,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        constructor() {
          this.state = getState();
        }
      }`,
      parser: typeScriptParser,
    },
  ],
  invalid: [
    {
      code: 'class Button extends React.Component<Props, {focused: boolean}> {}',
      parser: babelParser,
      errors,
    },
    {
      code: `class Button extends React.Component<Props, {focused: boolean}> {
        state = null;
      }`,
      parser: babelParser,
      errors,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        states = {focused: false};
      }`,
      parser: babelParser,
      errors,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        constructor() {
          this.state = null;
        }
      }`,
      parser: babelParser,
      errors,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        constructor() {
          this.states = {focused: true};
        }
      }`,
      parser: babelParser,
      errors,
    },
    {
      code: 'class Button extends React.Component<Props, {focused: boolean}> {}',
      parser: typeScriptParser,
      errors,
    },
    {
      code: `class Button extends React.Component<Props, {focused: boolean}> {
        state = null;
      }`,
      parser: typeScriptParser,
      errors,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        states = {focused: false};
      }`,
      parser: typeScriptParser,
      errors,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        constructor() {
          this.state = null;
        }
      }`,
      parser: typeScriptParser,
      errors,
    },
    {
      code: `class Button extends React.Component<Props, State> {
        constructor() {
          this.states = {focused: true};
        }
      }`,
      parser: typeScriptParser,
      errors,
    },
  ],
});
