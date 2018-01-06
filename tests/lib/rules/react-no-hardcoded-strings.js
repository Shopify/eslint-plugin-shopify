const {RuleTester} = require('eslint');
const {resolve} = require('path');
const rule = require('../../../lib/rules/react-no-hardcoded-strings');

const ruleTester = new RuleTester();

require('babel-eslint');

const parser = 'babel-eslint';

// const errors = [
//   {
//     type: 'ClassDeclaration',
//     message: 'You declared a type for state, but did not initialize it.',
//   },
// ];

function errorsFor(component, prop) {
  const message =
    prop === 'children'
      ? `You must not use hardcoded content as the children of the ${
          component
        } component.`
      : `You must not use hardcoded content in the ${prop} prop of the ${
          component
        } component.`;

  return [{type: 'JSXElement', message}];
}

function fixtureFile(fixture) {
  return resolve(__dirname, '../../fixtures', fixture);
}

const allowStrings = {allowStrings: true};
const disallowBooleans = {allowBooleans: false};
const disallowNumbers = {allowNumbers: false};
const checkProps = {checkProps: ['foo']};

ruleTester.run('react-no-hardcoded-strings', rule, {
  valid: [
    {code: '<div />', parser},
    {code: '<MyComponent />', parser},
    {code: '<MyComponent>{true}</MyComponent>', parser},
    {code: '<MyComponent>{2}</MyComponent>', parser},
    {code: '<MyComponent>{true}</MyComponent>', parser},
    {
      code: '<MyComponent>Content</MyComponent>',
      parser,
      options: [allowStrings],
    },
    {
      code: '<MyComponent>{"Content"}</MyComponent>',
      parser,
      options: [allowStrings],
    },
    {code: '<MyComponent>{someVariable}</MyComponent>', parser},
    {code: '<MyComponent>{someFunction()}</MyComponent>', parser},
    {code: '<MyComponent>{this.someMethod()}</MyComponent>', parser},
    {
      code: '<MyComponent>{someVariable} Content</MyComponent>',
      parser,
      options: [allowStrings],
    },
    {
      code: '<MyComponent>{someFunction()}{" Content"}</MyComponent>',
      parser,
      options: [allowStrings],
    },
    {
      code: '<MyComponent>{someFunction()}{` Content`}</MyComponent>',
      parser,
      options: [allowStrings],
    },
    {
      code: '<MyComponent>{someFunction()}{" Content"}</MyComponent>',
      parser,
      options: [{...allowStrings, ...disallowNumbers}],
    },
    {
      code: '<MyComponent foo />',
      parser,
      options: [checkProps],
    },
    {
      code: '<MyComponent foo={false} />',
      parser,
      options: [checkProps],
    },
    {
      code: '<MyComponent foo={42} />',
      parser,
      options: [checkProps],
    },
    {
      code: '<MyComponent foo={someFunction()} />',
      parser,
      options: [checkProps],
    },
    {
      code: '<MyComponent foo={someVariable} />',
      parser,
      options: [checkProps],
    },
    {
      code: '<MyComponent foo="bar" />',
      parser,
      options: [{...checkProps, ...allowStrings}],
    },
    {
      code: '<MyComponent foo={"bar"} />',
      parser,
      options: [{...checkProps, ...allowStrings}],
    },
    {
      code: "<MyComponent foo={'bar'} />",
      parser,
      options: [{...checkProps, ...allowStrings}],
    },
    {
      code: '<MyComponent foo={`bar`} />',
      parser,
      options: [{...checkProps, ...allowStrings}],
    },
    {
      code: '<MyComponent foo={`bar`} />',
      parser,
      options: [{...checkProps, ...allowStrings}],
    },
    {
      code: '<MyComponent>{42}</MyComponent>',
      parser,
      options: [
        {
          modules: {
            'my-module': {MyComponent: disallowNumbers},
          },
        },
      ],
    },
    {
      code: `
        import {MyComponent} from 'other-module';
        <MyComponent>{42}</MyComponent>
      `,
      parser,
      options: [
        {
          modules: {
            'my-module': {MyComponent: disallowNumbers},
          },
        },
      ],
    },
    {
      code: `
        import {MyComponent} from 'my-module';
        <MyComponent>{42}</MyComponent>
      `,
      parser,
      options: [
        {
          modules: {
            'my-module': {OtherComponent: disallowNumbers},
          },
        },
      ],
    },
    {
      code: '<MyComponent>{true}</MyComponent>',
      parser,
      options: [
        {
          modules: {
            'my-module': {MyComponent: disallowBooleans},
          },
        },
      ],
    },
    {
      code: `
        import {MyComponent} from 'other-module';
        <MyComponent>{true}</MyComponent>
      `,
      parser,
      options: [
        {
          modules: {
            'my-module': {MyComponent: disallowBooleans},
          },
        },
      ],
    },
    {
      code: `
        import {MyComponent} from 'my-module';
        <MyComponent>{true}</MyComponent>
      `,
      parser,
      options: [
        {
          modules: {
            'my-module': {OtherComponent: disallowBooleans},
          },
        },
      ],
    },
    {
      code: '<MyComponent foo="bar" />',
      parser,
      options: [
        {
          modules: {
            'my-module': {MyComponent: checkProps},
          },
        },
      ],
    },
    {
      code: `
        import {MyComponent} from 'other-module';
        <MyComponent foo="bar" />
      `,
      parser,
      options: [
        {
          modules: {
            'my-module': {MyComponent: checkProps},
          },
        },
      ],
    },
    {
      code: `
        import {MyComponent} from 'my-module';
        <MyComponent foo="bar" />
      `,
      parser,
      options: [
        {
          modules: {
            'my-module': {OtherComponent: checkProps},
          },
        },
      ],
    },
    {
      code: `
        import {MyComponent} from 'my-module';
        <MyComponent>Content</MyComponent>
      `,
      parser,
      options: [
        {
          modules: {
            'my-module': {MyComponent: allowStrings},
          },
        },
      ],
    },
    {
      code: `
        import {MyComponent as Aliased} from 'my-module';
        <Aliased>Content</Aliased>
      `,
      parser,
      options: [
        {
          modules: {
            'my-module': {MyComponent: allowStrings},
          },
        },
      ],
    },
    {
      code: `
        import {MyComponent} from 'my-module';
        function MyComponent() {}
        <MyComponent>{42}</MyComponent>
      `,
      parser,
      options: [
        {
          modules: {
            'my-module': {MyComponent: disallowNumbers},
          },
        },
      ],
    },
    {
      code: `
        import {MyComponent} from 'components';
        <MyComponent>Content</MyComponent>
      `,
      filename: fixtureFile('basic-app/app/sections/MySection/MySection.js'),
      parser,
      settings: {
        'import/resolver': {
          node: {
            moduleDirectory: [fixtureFile('basic-app/app')],
          },
        },
      },
      options: [
        {
          modules: {
            'app/components': {MySharedComponent: allowStrings},
          },
        },
      ],
    },
    {
      code: `
        import {MyComponent} from './components';
        <MyComponent>Content</MyComponent>
      `,
      filename: fixtureFile('basic-app/app/sections/MySection/MySection.js'),
      parser,
      options: [
        {
          modules: {
            'app/sections/MySection/components': {MyComponent: allowStrings},
          },
        },
      ],
    },
  ],
  invalid: [
    {
      code: '<MyComponent>Content</MyComponent>',
      parser,
      errors: errorsFor('MyComponent', 'children'),
    },
    {
      code: '<MyComponent>{"Content"}</MyComponent>',
      parser,
      errors: errorsFor('MyComponent', 'children'),
    },
    {
      code: '<MyComponent>{`Content`}</MyComponent>',
      parser,
      errors: errorsFor('MyComponent', 'children'),
    },
    {
      code: '<MyComponent>{someFunction()} Content</MyComponent>',
      parser,
      errors: errorsFor('MyComponent', 'children'),
    },
    {
      code: '<MyComponent>{someFunction()}{" Content"}</MyComponent>',
      parser,
      errors: errorsFor('MyComponent', 'children'),
    },
    {
      code: '<MyComponent>{true}</MyComponent>',
      parser,
      options: [disallowBooleans],
      errors: errorsFor('MyComponent', 'children'),
    },
    {
      code: '<MyComponent>{3}</MyComponent>',
      parser,
      options: [disallowNumbers],
      errors: errorsFor('MyComponent', 'children'),
    },
    {
      code: '<MyComponent foo />',
      parser,
      options: [{...checkProps, ...disallowBooleans}],
      errors: errorsFor('MyComponent', 'foo'),
    },
    {
      code: '<MyComponent foo={false} />',
      parser,
      options: [{...checkProps, ...disallowBooleans}],
      errors: errorsFor('MyComponent', 'foo'),
    },
    {
      code: '<MyComponent foo={42} />',
      parser,
      options: [{...checkProps, ...disallowNumbers}],
      errors: errorsFor('MyComponent', 'foo'),
    },
    {
      code: '<MyComponent foo="bar" />',
      parser,
      options: [checkProps],
      errors: errorsFor('MyComponent', 'foo'),
    },
    {
      code: '<MyComponent foo={"bar"} />',
      parser,
      options: [checkProps],
      errors: errorsFor('MyComponent', 'foo'),
    },
    {
      code: "<MyComponent foo={'bar'} />",
      parser,
      options: [checkProps],
      errors: errorsFor('MyComponent', 'foo'),
    },
    {
      code: '<MyComponent foo={`bar`} />',
      parser,
      options: [checkProps],
      errors: errorsFor('MyComponent', 'foo'),
    },
    {
      code: `
        import {MyComponent} from 'my-module';
        <MyComponent>Content</MyComponent>
      `,
      parser,
      options: [
        {
          modules: {
            'other-module': {MyComponent: allowStrings},
          },
        },
      ],
      errors: errorsFor('MyComponent', 'children'),
    },
    {
      code: `
        import {MyComponent} from 'my-module';
        <MyComponent>Content</MyComponent>
      `,
      parser,
      options: [
        {
          ...allowStrings,
          modules: {
            'my-module': {MyComponent: disallowNumbers},
          },
        },
      ],
      errors: errorsFor('MyComponent', 'children'),
    },
    {
      code: `
        import {MyComponent as Aliased} from 'my-module';
        <Aliased>Content</Aliased>
      `,
      parser,
      options: [
        {
          modules: {
            'my-module': {Aliased: allowStrings},
          },
        },
      ],
      errors: errorsFor('Aliased', 'children'),
    },
    {
      code: `
        import {MyComponent} from 'my-module';
        function MyComponent() {}
        <MyComponent>Content</MyComponent>
      `,
      parser,
      options: [
        {
          modules: {
            'my-module': {MyComponent: allowStrings},
          },
        },
      ],
      errors: errorsFor('MyComponent', 'children'),
    },
  ],
});
