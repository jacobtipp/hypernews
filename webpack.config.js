const path = require('path')
const ROOT = path.resolve(__dirname)

module.exports = {
  devtool: 'cheap-eval-source-map',

  entry: path.resolve(ROOT, 'src', 'main.js'),

  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: ROOT,
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: /src/,
      loader: 'babel-loader',
    }, ],
  },

  target: 'web',

  devServer: {
    port: 8088,
    host: '0.0.0.0',
    historyApiFallback: true,
    contentBase: path.resolve(ROOT, 'public'),
  },
}