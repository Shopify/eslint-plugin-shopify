module.exports = {
  extends: ['./prettier'],

  rules: {
    'prettier/prettier': [
      'error',
      {
        parser: 'typescript',
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: false,
        jsxBracketSameLine: false,
      },
    ],
  },
};
