const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/hooks-strict-return');

const ruleTester = new RuleTester();

require('babel-eslint');

const parser = 'babel-eslint';

ruleTester.run('hooks-strict-return', rule, {
  valid: [
    {
      code: `function useFoo() {
        return [1]
      }
      `,
      parser,
    },
    {
      code: `function useFoo() {
        return [1, 2]
      }
      `,
      parser,
    },
    {
      code: `function useFoo() {
        const bar = [1, 2]
        return bar;
      }
      `,
      parser,
    },
    {
      code: `function useFoo() {
        const bar = [1, 2]
        return [...bar];
      }
      `,
      parser,
    },
    {
      code: `function useFoo() {
        const bar = [1]
        const baz = [2]
        return [...bar, ...baz];
      }
      `,
      parser,
    },
    {
      code: `function useFoo() {
        return {one: 1, two: 2, three: 3}
      }
      `,
      parser,
    },
    {
      code: `function useFoo() {
        const bar = {one: 1, two: 2, three: 3}
        return bar
      }
      `,
      parser,
    },
    {
      code: `function useFoo() {
        return {...bar}
      }
      `,
      parser,
    },
    {
      code: `function useFoo() {
        return {...bar, four: 4}
      }
      `,
      parser,
    },
    {
      code: `function foo() {
        return [1, 2, 3]
      }
      `,
      parser,
    },
  ],
  invalid: [
    {
      code: `function useFoo() {
        return [1, 2, 3]
      }`,
      parser,
      errors: [
        {
          messageId: 'hooksStrictReturn',
        },
      ],
    },
    {
      code: `function useFoo() {
        const bar = [1, 2, 3]
        return bar;
      }`,
      parser,
      errors: [
        {
          messageId: 'hooksStrictReturn',
        },
      ],
    },
    {
      code: `function useFoo() {
        const bar = [1, 2, 3]
        return [...bar]
      }`,
      parser,
      errors: [
        {
          messageId: 'hooksStrictReturn',
        },
      ],
    },
    {
      code: `function useFoo() {
        const bar = [1, 2]
        const baz = [3]
        return [...bar, ...baz];
      }`,
      parser,
      errors: [
        {
          messageId: 'hooksStrictReturn',
        },
      ],
    },
  ],
});
