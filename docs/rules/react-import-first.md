# Import React first. (react-import-first)

Ensure React is the first import statement.

## Rule Details

Examples of **incorrect** code for this rule:


```js
import Foo from 'bar';
import React from 'react'
```

Examples of **correct** code for this rule:

```js
import React from 'react'
import Foo from 'bar';
```

## When Not To Use It

If you do not want to ensure React is the first import statement, you can safely disable this rule.
