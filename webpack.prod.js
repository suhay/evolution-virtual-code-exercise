/* eslint-disable no-useless-escape */
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: {
    index: [
      './browser/index.js',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /cst/),
  ],
}
