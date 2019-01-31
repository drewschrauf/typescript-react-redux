module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ...(process.env.NODE_ENV !== 'production' ? ['babel-plugin-styled-components'] : []),
  ],
};
