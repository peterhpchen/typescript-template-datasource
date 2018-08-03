const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pkgJson = require('./package.json');

module.exports = {
  target: 'node',
  context: path.join(__dirname, 'src'),
  entry: {
      'module': './module.ts'
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'amd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  externals: [
    'jquery', 'lodash', 'moment', 'q',
    function(context, request, callback) {
      var prefix = 'grafana/';
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    }
  ],
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      {
        from: './plugin.json',
        transform (content, path) {
          return content.toString()
            .replace('%VERSION%', pkgJson.version)
            .replace('%TODAY%', new Date().toISOString().slice(0, 10));
        }
      },
      '../README.md',
      '../LICENSE',
      './partials/*',
      './img/*'
    ])
  ]
}
