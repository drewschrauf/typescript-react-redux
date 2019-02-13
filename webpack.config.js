const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'none' : 'eval-source-map',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
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
  ...(isProduction
    ? {
        optimization: {
          minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
        },
      }
    : {}),
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
