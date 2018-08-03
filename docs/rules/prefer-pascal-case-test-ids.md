# Enforce pascal case when naming test IDs. (prefer-pascal-case-testids)

Provides consistency when naming test IDs within React code.

## Rule Details

This rule enforces all test IDs used in JSX code to be in pascal case. An error will occur if another capitalization rule is used (such as snake case or lowercase) when naming them.

Examples of **incorrect** code for this rule:

```ts
<div testID="greetings-heading" />
```

Examples of **correct** code for this rule:

```ts
<div testID="GreetingsHeading" />
```

## When Not To Use It

If you have established coding standards using a different naming convention for test IDs, you can safely disable this rule.
