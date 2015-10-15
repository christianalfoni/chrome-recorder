var path = require('path');
var webpack = require('webpack');
var buildPath = path.resolve(__dirname, 'build');

var config = {
  entry: path.resolve(__dirname, 'test.js'),
  devtool: 'eval-source-map',
  output: {
    filename: 'build.js',
    path: buildPath,
    publicPath: '/public/'
  }
};

module.exports = config;
