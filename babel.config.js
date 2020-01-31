/* eslint-disable @typescript-eslint/no-var-requires */
const { addIfDev } = require('./env');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: process.env.NODE_ENV !== 'test' ? 'last 2 versions' : { node: 'current' },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ...addIfDev(['react-hot-loader/babel', 'babel-plugin-styled-components']),
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
};
