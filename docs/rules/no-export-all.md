# Disallow exporting everything from a module using the wildcard asterisk (*) character. (no-export-all)

Using the wildcard asterisk (*) in an export statement will re-export everything from a module. Though concise, this syntax is far less clear than explicitly exporting the parts of module intended for use elsewhere in the application.

## Rule Details

This rule disallows using the wildcard asterisk syntax in export statements.

Examples of **incorrect** code for this rule:

```js
export * from './someModule';
```

Examples of **correct** code for this rule:

```js
export {thing1, thing2} from 'someModule'
```

## When Not To Use It

If you do not wish to prevent the wildcard asterisk syntax in export statements, you can safely disable this rule.
