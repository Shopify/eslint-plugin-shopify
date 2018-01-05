module.exports = {
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },

  plugins: ['jest'],

  rules: require('./rules/jest'),
};
