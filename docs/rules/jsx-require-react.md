# Require React import in .jsx and .tsx files. (jsx-require-react)

JSX really just provides syntactic sugar for React's `createElement(component, props, ...children)` function. For example:

```jsx
<Button color="blue">
  Click Me
</Button>
```

will compile to:

```js
React.createElement(
  Button,
  {color: 'blue'},
  'Click Me'
)
```

Built-in components and self-closing tags compile in the same way. For example:

```jsx
<div className="fancy" />
```

will compile to:

```js
React.createElement(
  'div',
  {className: 'fancy'},
  null
)
```

## Rule Details

The requirement to import React can easily be missed because it is not directly referenced when authoring JSX. This rule necessitates that React is imported when working in a .tsx or .jsx files.

Examples of **incorrect** code for this rule:

```jsx
function Card(props) {
  return (
    <div>{props.children}</div>
  )
};
export default Card;
```

Examples of **correct** code for this rule:

```jsx
import React from 'react'

function Card(props) {
  return (
    <div>{props.children}</div>
  )
};
export default Card;
```

## When Not To Use It

If you do not wish to enforce a React import in JSX (perhaps you are loading React from a <script> tag and is therefore in the global scope), you can safely disable this rule.

## Further Reading

* [Online babel compiler](https://babeljs.io/repl/#?presets=react&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA)
* [JSX in depth](https://reactjs.org/docs/jsx-in-depth.html)

