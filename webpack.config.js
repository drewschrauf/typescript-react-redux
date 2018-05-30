const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?/, loader: 'ts-loader' },
      { test: /\.css/, loaders: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    disableHostCheck: true,
  },
};
