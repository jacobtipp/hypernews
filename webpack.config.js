const path = require('path');
const ROOT = path.resolve(__dirname);

const settings = {
  devtool: 'cheap-eval-source-map',

  entry: path.resolve(ROOT, 'src', 'main.js'),

  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(ROOT, 'public'),
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: /src/,
      loader: 'babel-loader',
    }, ],
  },
  externals: {
    firebase: 'firebase'
  },
  target: 'web',
  mode: 'production'
}

if (process.env.NODE_ENV != 'production') {
  Object.assign(settings, {
    devtool: false,
    devServer: {
      port: 8088,
      host: '127.0.0.1',
      historyApiFallback: true,
      contentBase: path.resolve(ROOT, 'public'),
      disableHostCheck: true
    }
  })
}
module.exports = settings;