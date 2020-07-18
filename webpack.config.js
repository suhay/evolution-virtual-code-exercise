const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: 'eval-source-map',
  entry: {
    index: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
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
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.mjs'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/',
    hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: '.hot/[hash].hot-update.json',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
