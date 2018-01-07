# Disallow the use of Polaris’s `Stack.Item` without any custom props. (polaris-no-bare-stack-item)

The Polaris [`Stack` component](https://polaris.shopify.com/components/structure/stack) has an `Item` subcomponent that is automatically wrapped around all children. As such, it is useless to wrap any content in a `Stack.Item` unless you are also providing non-default prop values. This rule prevents creating such items.

## Rule Details

The following patterns are considered warnings:

```js
import * as Polaris from '@shopify/polaris';
import {Stack} from '@shopify/polaris';
import {Stack as PolarisStack} from '@shopify/polaris';

<Stack><Stack.Item>Content</Stack.Item></Stack>
<Polaris.Stack.Item>Content</Polaris.Stack.Item>
<PolarisStack.Item>Content</PolarisStack.Item>
```

The following patterns are not warnings:

```js
import {Stack} from '@shopify/polaris';

<Stack.Item fill>Content</Stack.Item>
<Stack>No wrapping item</Stack>
```

