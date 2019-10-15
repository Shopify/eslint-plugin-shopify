module.exports = {
  plugins: ['self'],
  extends: ['plugin:self/node', 'plugin:self/typescript'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
