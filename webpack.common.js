const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEV_MODE = !process.argv.includes('-p');

module.exports = {
  entry: {
    app: './app/scripts/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    // path: path.resolve(__dirname, 'dist'),
    publicPath: DEV_MODE ? '' : './dist'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: './'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: DEV_MODE ? '[name].css' : '[name].[hash].css',
      // chunkFilename: DEV_MODE ? '[id].css' : '[id].[hash].css'
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
