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
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    ...(process.env.NODE_ENV !== 'production' ? ['babel-plugin-styled-components'] : []),
  ],
};
