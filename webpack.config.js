const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'babel-loader',
      },
      { test: /\.css/, loaders: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.md/, loaders: ['html-loader', 'markdown-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'typescript-react-redux',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
