const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './src/index.tsx',
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
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
        },
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
    new DashboardPlugin(),
  ],
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
