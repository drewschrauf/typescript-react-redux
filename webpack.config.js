/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

const { isProduction, addIfProd, addIfDev } = require('./env');

module.exports = {
  mode: isProduction ? 'production' : 'development',
  ...addIfDev({ devtool: 'eval-source-map' }),
  entry: [...addIfDev(['react-hot-loader/patch']), './src/index.tsx'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
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
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          ...addIfDev(['style-loader']),
          ...addIfProd([MiniCssExtractPlugin.loader]),
          'css-loader',
        ],
      },
      { test: /\.md/, use: ['html-loader', 'markdown-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'typescript-react-redux',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
      },
    }),
    new VanillaExtractPlugin(),
    ...addIfProd([
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
        chunkFilename: '[id].[chunkhash].css',
      }),
    ]),
  ],
  ...addIfProd({
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
  }),
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
  },
};
