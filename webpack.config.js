const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const { addIfProd, addIfDev } = require('./env');

module.exports = {
  ...addIfDev({ mode: 'development', devtool: 'inline-cheap-module-source-map' }),
  ...addIfProd({ mode: 'production', devtool: 'none' }),
  entry: [...addIfDev(['react-hot-loader/patch']), './src/index.tsx'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      ...addIfDev({
        'react-dom': '@hot-loader/react-dom',
      }),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/,
        loaders: [
          ...addIfDev(['style-loader']),
          ...addIfProd([MiniCssExtractPlugin.loader]),
          'css-loader',
        ],
      },
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
    ...addIfDev([new ErrorOverlayPlugin()]),
    ...addIfProd([
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      }),
    ]),
  ],
  ...addIfProd({
    optimization: {
      minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    },
  }),
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
