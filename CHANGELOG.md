# Changelog

## Unreleased
### Added
* `shopify/jest` config with [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest) rules:
  - `jest/no-disabled-tests` (disabled)
  - `jest/no-focused-tests`
  - `jest/no-identical-title`
  - `jest/no-large-snapshots` (limited to 12 lines)
  - `jest/prefer-to-have-length`
  - `jest/prefer-to-be-null`
  - `jest/prefer-to-be-undefined`
  - `jest/valid-expect`
* Added `shopify/webpack` config
* Added `shopify/polaris` config
* Added `shopify/webpack/no-unnamed-dynamic-imports` rule
* Added `shopify/prefer-module-scope-constants` rule
* Added `shopify/jsx-no-complex-expressions` rule
* Added `shopify/jsx-no-hardcoded-content` rule
* Added `shopify/polaris-no-bare-stack-item` rule
* Added `shopify/polaris-prefer-sectioned-prop` rule
* Added `shopify/react-initialize-state` rule
* Added `shopify/react-type-state` rule

## [18.3.1] - 2017-12-21

### Changed
* Changed `eslint-config-shopify` codebase to follow es5 trailingComma [[#61](https://github.com/Shopify/eslint-plugin-shopify/pull/61)]

## [18.3.0] - 2017-12-18

### Added
* Added `shopify/no-debugger`, which behaves the same as ESLint's `no-debugger` but without a fixer.

## [18.2.0] - 2017-12-04
### Added
* Added a `typescript-prettier` config to run prettier against typescript projects.

## [18.1.0] - 2017-12-01

### Added
* Added a `typescript` and `typescript-react` config [[#54](https://github.com/Shopify/eslint-plugin-shopify/pull/54)]

### Changed
* `plugin:shopify/prettier` will now enforce trailing commas in function parameter calls [[#55](https://github.com/Shopify/eslint-plugin-shopify/pull/55)]
* `comma-dangle` will now enforce multi-line function parameters [[#55](https://github.com/Shopify/eslint-plugin-shopify/pull/55)]
* Removed `plugin:shopify/esnext` as an included extension of the `plugin:shopify/prettier` config. `plugin:shopify/esnext` must now be extended by the consumer to use the `plugin:shopify/prettier`. [[#53](https://github.com/Shopify/eslint-plugin-shopify/pull/53)]

  Example (`package.json`):
  ```
  "eslintConfig": {
    "extends": [
      "plugin:shopify/esnext",
      "plugin:shopify/prettier"
    ]
  }
  ```

## [18.0.0] - 2017-10-31
### Changed
* Turned off `class-methods-use-this`

## [17.2.1] - 2017-10-30
### Changed
* Turned off `babel/semi` rule in prettier config

## [17.2.0] - 2017-10-25
### Added
* Added a prettier config [[#46](https://github.com/Shopify/eslint-plugin-shopify/pull/46)]

Example:
```
"eslintConfig": {
  "extends": [
    "plugin:shopify/prettier"
  ]
}
```

### Changed
* Replace all `warn` with `error` [[#48](https://github.com/Shopify/eslint-plugin-shopify/pull/48)]
* `space-before-function-paren` now uses `asyncArrow` option (eg. `async () => {}`) [[#43](https://github.com/Shopify/eslint-plugin-shopify/pull/43)]
* Enable `padding-line-between-statements` for directives.  [[#44](https://github.com/Shopify/eslint-plugin-shopify/pull/44)]

### Removed
* `lines-around-directive` was deprecated in ESLint `v4.0.0`. [[#44](https://github.com/Shopify/eslint-plugin-shopify/pull/44)]


## [17.1.0] - 2017-09-19

### Added
* New rules ([#41](https://github.com/Shopify/eslint-plugin-shopify/pull/41)):
  - `import/no-anonymous-default-export`
  - `jsx-a11y/anchor-is-valid`
  - `no-buffer-constructor`
  - `node/no-extraneous-import` (disabled)
  - `node/no-extraneous-require`
  - `for-direction`
  - `getter-return`
  - `react/boolean-prop-naming` (disabled)
  - `react/default-props-match-prop-types`
  - `react/no-redundant-should-component-update`
  - `react/no-typos`
  - `react/no-unused-state`
  - `react/jsx-closing-tag-location`
  - `array-bracket-newline` (disabled)
  - `array-element-newline` (disabled)
  - `function-paren-newline`
  - `padding-line-between-statements` (disabled)
  - `semi-style`
  - `switch-colon-spacing`


### Changed
- Updated dependencies ([#41](https://github.com/Shopify/eslint-plugin-shopify/pull/41)):
  - `eslint`
  - `babel-eslint`
  - `eslint-plugin-import`
  - `eslint-plugin-jsx-a11y`
  - `eslint-plugin-node`
  - `eslint-plugin-react`
- `jquery-dollar-sign-reference` no longer flags assignments from `await` expressions

### Removed
- `jsx-a11y/href-no-hash` replaced with `jsx-a11y/anchor-is-valid`

## [17.0.0] - 2017-08-17
### Changed
- `eslint` upgrade to `4.3.0`
- `node.js` minimum supported node version update to `6.11.1` (LTS).
- Update dependencies:
  - `eslint-plugin-ava`: `^4.2.0` → `^4.2.1`.
  - `eslint-plugin-babel`: `^4.1.1` → `^4.1.2`.
  - `eslint-plugin-lodash`: `^2.4.2` → `^2.4.4`.
  - `eslint-plugin-mocha`: `^4.9.0` → `^4.11.0`.
  - `eslint-plugin-node`: `^4.2.2` → `^4.2.3`.
  - `eslint-plugin-react`: `^7.0.0` → `^7.0.1`.


## [16.0.1] - 2017-05-29
### Changed
- Turned off [`prefer-destructuring`](http://eslint.org/docs/rules/prefer-destructuring) ([#30](https://github.com/Shopify/eslint-plugin-shopify/pull/30))

## [16.0.0] - 2017-05-16
### Added
- New rule: [`babel/semi`](https://github.com/babel/eslint-plugin-babel/releases/tag/v4.1.0)
- New rule: [`flowtype/no-types-missing-file-annotation`](https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-no-types-missing-file-annotation)
- New rule: [`jsx-a11y/accessible-emoji`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/accessible-emoji.md)
- New rule: [`jsx-a11y/alt-text`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)
- New rule: [`jsx-a11y/aria-activedescendant-has-tabindex`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-activedescendant-has-tabindex.md)
- New rule: [`jsx-a11y/iframe-has-title`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/iframe-has-title.md)
- New rule: [`jsx-a11y/interactive-supports-focus`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md)
- New rule: [`jsx-a11y/media-has-caption`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/media-has-caption.md) (disabled)
- New rule: [`jsx-a11y/no-autofocus`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-autofocus.md)
- New rule: [`jsx-a11y/no-distracting-elements`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md)
- New rule: [`jsx-a11y/no-interactive-element-to-noninteractive-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-interactive-element-to-noninteractive-role.md) (disabled)
- New rule: [`jsx-a11y/no-noninteractive-element-interactions`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md)
- New rule: [`jsx-a11y/no-noninteractive-element-to-interactive-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-to-interactive-role.md)
- New rule: [`jsx-a11y/no-noninteractive-tabindex`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-tabindex.md)
- New rule: [`jsx-a11y/no-redundant-roles`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md)
- New rule: [`lodash/prefer-some`](https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/prefer-some.md)
- New rule: [`react/forbid-elements`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-elements.md) (disabled)
- New rule: [`react/forbid-foreign-prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md)
- New rule: [`react/no-will-update-set-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md)
- New rule: [`react/void-dom-elements-no-children`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md)
- New rule: [`no-await-in-loop`](http://eslint.org/docs/rules/no-await-in-loop)
- New rule: [`prefer-promise-reject-errors`](http://eslint.org/docs/rules/prefer-promise-reject-errors)
- New rule: [`require-await`](http://eslint.org/docs/rules/require-await)
- New rule: [`prefer-destructuring`](http://eslint.org/docs/rules/prefer-destructuring)
- New rule: [`no-compare-neg-zero`](http://eslint.org/docs/rules/no-compare-neg-zero)
- New rule: [`capitalized-comments`](http://eslint.org/docs/rules/capitalized-comments) (disabled)
- New rule: [`no-multi-assign`](http://eslint.org/docs/rules/no-multi-assign)
- New rule: [`nonblock-statement-body-position`](http://eslint.org/docs/rules/nonblock-statement-body-position) (disabled)
- New rule: [`template-tag-spacing`](http://eslint.org/docs/rules/template-tag-spacing)

### Removed
- Deprecated: [`babel/no-await-in-loop`](https://github.com/babel/eslint-plugin-babel/releases/tag/v4.1.1)
- Deprecated: [`jsx-a11y/img-has-alt`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/CHANGELOG.md#500--2017-05-05)
- Deprecated: [`jsx-a11y/onclick-has-focus`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/CHANGELOG.md#500--2017-05-05)
- Deprecated: [`jsx-a11y/onclick-has-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/CHANGELOG.md#500--2017-05-05)
- Deprecated: [`jsx-a11y/jsx-space-before-closing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/CHANGELOG.md#700---2017-05-06)


## [15.2.0] - 2017-03-06
### Changed
- `eslint` upgrade to `3.17.x`

## [15.1.2] - 2017-02-23
### Fixed
- `jquery-dollar-sign-reference` now checks assignments from `LogicalExpression` / `BinaryExpression`

## [15.1.1] - 2017-01-17
### Added
- Added `eslint-index` package ([#4](https://github.com/Shopify/eslint-plugin-shopify/pull/4))
- Added `rules-status` and `rules-omitted` scripts ([#4](https://github.com/Shopify/eslint-plugin-shopify/pull/4))
- Added new `eslint-plugin-react` rules: `no-array-index-key`, `require-default-props` ([#4](https://github.com/Shopify/eslint-plugin-shopify/pull/4))
- Added new `eslint-plugin-lodash` rules: `import-scope` ([#4](https://github.com/Shopify/eslint-plugin-shopify/pull/4))
- Added new `eslint-plugin-promise` rules: `no-return-wrap`, `no-nesting`, `no-promise-in-callback`, `no-callback-in-promise`, `avoid-new`, `prefer-await-to-then`, `prefer-await-to-callbacks` ([#4](https://github.com/Shopify/eslint-plugin-shopify/pull/4))

### Changed
- Updated `eslint-plugin-flowtype`, `eslint-plugin-lodash`, `eslint-plugin-mocha`, `eslint-plugin-promise`, `eslint-plugin-react` to their latest versions ([#4](https://github.com/Shopify/eslint-plugin-shopify/pull/4))
- Updated `react/prefer-stateless-function` rule to include `ignorePureComponents` flag ([#4](https://github.com/Shopify/eslint-plugin-shopify/pull/4))

### Removed
- Removed `eslint-find-rules` package ([#4](https://github.com/Shopify/eslint-plugin-shopify/pull/4))

# Pre-15.1.1 Changelog

Changes were originally tracked in Shopify's [JavaScript monorepo](https://github.com/Shopify/javascript/blob/f10bf7ddbdae07370cfe7c94617c450257731552/CHANGELOG.md).

[Unreleased]: https://github.com/Shopify/eslint-plugin-shopify/compare/v18.3.1...HEAD
[18.3.1]: https://github.com/Shopify/eslint-plugin-shopify/compare/v18.3.0...v18.3.1
[18.3.0]: https://github.com/Shopify/eslint-plugin-shopify/compare/v18.2.0...v18.3.0
[18.2.0]: https://github.com/Shopify/eslint-plugin-shopify/compare/v18.1.0...v18.2.0
[18.1.0]: https://github.com/Shopify/eslint-plugin-shopify/compare/v18.0.0...v18.1.0
[18.0.0]: https://github.com/Shopify/eslint-plugin-shopify/compare/v17.2.1...v18.0.0
[17.2.1]: https://github.com/Shopify/eslint-plugin-shopify/compare/v17.2.0...v17.2.1
