const {RuleTester} = require('eslint');

const rule = require('../../../lib/rules/no-namespace-imports');

const ruleTester = new RuleTester();

require('typescript-eslint-parser');

const parserOptions = {ecmaVersion: 6, sourceType: 'module'};

const error = {
  type: 'ImportDeclaration',
  message: `Prefer name-spaced React import. (import * as React from 'react';).`,
};

ruleTester.run('no-namespace-imports', rule, {
  valid: [
    {
      code: `import React from 'react';`,
      parserOptions,
    },
    {
      code: `import {useEffect} from 'react';`,
      parserOptions,
    },
    {
      code: `import React, {useEffect, useState} from 'react';`,
      parserOptions,
    },
    {
      code: `import {Location} from 'history';`,
      parserOptions,
    },
  ],
  invalid: [
    {
      code: `import * as React from 'react';`,
      parserOptions,
      errors: [
        {
          messageId: 'namespaceImport',
        },
      ],
    },
    {
      code: `import * as H from 'history';`,
      parserOptions,
      errors: [
        {
          messageId: 'namespaceImport',
        },
      ],
    },
    {
      code: `import * as faker from 'faker';`,
      parserOptions,
      errors: [
        {
          messageId: 'namespaceImport',
        },
      ],
    },
  ],
});
