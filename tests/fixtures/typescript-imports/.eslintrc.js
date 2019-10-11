module.exports = {
  plugins: ['self'],
  extends: [
    'plugin:self/node',
    'plugin:self/typescript',
    'plugin:self/typescript-fast',
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
