const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    // Files will be available at http://localhost:8080/dist/index.html
    // publicPath: '/dist/'
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
