module.exports = {
  rules: {
    'binary-assignment-parens': require('./lib/rules/binary-assignment-parens'),
    'class-property-semi': require('./lib/rules/class-property-semi'),
    'enzyme/no-bad-features': require('./lib/rules/enzyme/no-bad-features'),
    'jest/no-snapshots': require('./lib/rules/jest/no-snapshots'),
    'jest/no-vague-titles': require('./lib/rules/jest/no-vague-titles'),
    'jquery-dollar-sign-reference': require('./lib/rules/jquery-dollar-sign-reference'),
    'jsx-no-complex-expressions': require('./lib/rules/jsx-no-complex-expressions'),
    'jsx-no-hardcoded-content': require('./lib/rules/jsx-no-hardcoded-content'),
    'jsx-prefer-fragment-wrappers': require('./lib/rules/jsx-prefer-fragment-wrappers'),
    'no-ancestor-directory-import': require('./lib/rules/no-ancestor-directory-import'),
    'no-debugger': require('./lib/rules/no-debugger'),
    'no-useless-computed-properties': require('./lib/rules/no-useless-computed-properties'),
    'no-fully-static-classes': require('./lib/rules/no-fully-static-classes'),
    'polaris-prefer-sectioned-prop': require('./lib/rules/polaris-prefer-sectioned-prop'),
    'polaris-no-bare-stack-item': require('./lib/rules/polaris-no-bare-stack-item'),
    'prefer-class-properties': require('./lib/rules/prefer-class-properties'),
    'prefer-early-return': require('./lib/rules/prefer-early-return'),
    'prefer-module-scope-constants': require('./lib/rules/prefer-module-scope-constants'),
    'prefer-twine': require('./lib/rules/prefer-twine'),
    'react-initialize-state': require('./lib/rules/react-initialize-state'),
    'react-no-multiple-render-methods': require('./lib/rules/react-no-multiple-render-methods'),
    'react-prefer-private-members': require('./lib/rules/react-prefer-private-members'),
    'react-type-state': require('./lib/rules/react-type-state'),
    'restrict-full-import': require('./lib/rules/restrict-full-import'),
    'sinon-no-restricted-features': require('./lib/rules/sinon-no-restricted-features'),
    'sinon-prefer-meaningful-assertions': require('./lib/rules/sinon-prefer-meaningful-assertions'),
    'strict-component-boundaries': require('./lib/rules/strict-component-boundaries'),
    'typescript/prefer-pascal-case-enums': require('./lib/rules/typescript/prefer-pascal-case-enums'),
    'typescript/prefer-singular-enums': require('./lib/rules/typescript/prefer-singular-enums'),
    'webpack/no-unnamed-dynamic-imports': require('./lib/rules/webpack/no-unnamed-dynamic-imports'),
  },

  configs: {
    // Core configs - When extending, one of these should go first
    core: require('./lib/config/core'),
    es5: require('./lib/config/es5'),
    esnext: require('./lib/config/esnext'),
    react: require('./lib/config/react'),
    typescript: require('./lib/config/typescript'),

    // Augmenting configs - When extending, these go after the core config
    ava: require('./lib/config/ava'),
    'eslint-comments': require('./lib/config/eslint-comments'),
    flow: require('./lib/config/flow'),
    graphql: require('./lib/config/graphql'),
    jest: require('./lib/config/jest'),
    jquery: require('./lib/config/jquery'),
    lodash: require('./lib/config/lodash'),
    mocha: require('./lib/config/mocha'),
    node: require('./lib/config/node'),
    polaris: require('./lib/config/polaris'),
    webpack: require('./lib/config/webpack'),
    enzyme: require('./lib/config/enzyme'),

    // Prettier config - When extending, this must go last
    prettier: require('./lib/config/prettier'),

    // DEPREACATED - use 'prettier' instead
    'typescript-prettier': require('./lib/config/prettier'),
    // DEPREACATED - use 'typescript', then 'react' instead
    'typescript-react': require('./lib/config/typescript-react'),
  },
};
