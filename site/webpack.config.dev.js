var webpack = require('webpack'); // eslint-disable-line no-var
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line no-var
var webpackBaseConfig = require('./webpack.config.base'); // eslint-disable-line no-var

module.exports = Object.assign(webpackBaseConfig, {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index',
  ],
  plugins: [
    new ExtractTextPlugin('css/bundle.css', { disable: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
});
