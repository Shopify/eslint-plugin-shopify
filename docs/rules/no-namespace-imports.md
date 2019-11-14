# Prevent namespace import declarations. (no-namespace-imports)

Namespace imports grab all exported variables from a module as nested properties under a single variable name. This approach of importing everything, rather than only what is required from the module, leads to a polluted local scope from the unused components that were brought in under the module namespace.

## Rule Details

This rule will report all namespace imports and will optionally fix them (with the `--fix` flag) by converting them to default imports.

Examples of **incorrect** code for this rule:

```ts

import * as React from 'react';

```

Examples of **correct** code for this rule:

```ts

import React from 'react';

```

### `allow`

```json
{
  "shopify/no-namespace-imports": [
    "error",
    {
      "allow": ["react", "some-custom-module"]
    }
  ]
}
```

This array option can define either module names or regular expressions to match which namespaced module imports are ignored by this rule.

## When Not To Use It

If you do not wish to prevent namespace imports, you can safely disable this rule.

## Further Reading

* [Typescript 2.7 Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#support-for-import-d-from-cjs-from-commonjs-modules-with---esmoduleinterop)
