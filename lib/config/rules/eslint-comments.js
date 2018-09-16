// see https://github.com/mysticatea/eslint-plugin-eslint-comments

module.exports = {
  // Disallow a eslint-enable comment for multiple eslint-disable comments
  'eslint-comments/no-aggregating-enable': 'error',
  // Disallow duplicate eslint-disable comments
  'eslint-comments/no-duplicate-disable': 'error',
  // Disallow eslint-disable comments without rule names
  'eslint-comments/no-unlimited-disable': 'error',
  // Disallow unused eslint-disable comments
  'eslint-comments/no-unused-disable': 'error',
  // Disallow unused eslint-enable comments
  'eslint-comments/no-unused-enable': 'error',
  // Disallow eslint-disable comments about specific rules
  'eslint-comments/no-restricted-disable': 'off',
  // // Disallow ESLint directive-comments entirely
  'eslint-comments/no-use': 'off',
};
