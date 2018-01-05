# Requires that React component state be typed in TypeScript. (react-type-state)

TypeScript will not correctly check your state instance property against the state declared in your type initialization unless you explicitly provide the type annotation. This rule enforces that you provide that type annotation when it detects you are initializing state in a TypeScript React component.

## Rule Details

The following pattern is considered a warning:

```ts
class MyComponent extends React.Component<{}, State> {
  state = {};
}
```

The following patterns are not warnings:

```ts
class MyComponent extends React.Component<Props, never> {}
class MyComponent extends React.Component<Props, State> {
  state: State = {};
}
```
