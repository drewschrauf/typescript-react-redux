const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: { filename: 'bundle.js' },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?/, loader: 'ts-loader' }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
}
