var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var YOUTUBE_INFO = require('../tools/private/youtubeInfo');

const GLOBALS = {
    'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'CLIENT_ID': JSON.stringify(YOUTUBE_INFO.CLIENT_ID),
        'YOUTUBE_KEY': JSON.stringify(YOUTUBE_INFO.API_KEY),
        'CHANNEL_ID': JSON.stringify(YOUTUBE_INFO.CHANNEL_ID)
    }
};

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  entry: [
    './src/polyfills.ts',
    './src/vendor.ts',
    './src/main.ts'
  ],

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    }),
    new HtmlWebpackPlugin({
      favicon: 'src/images/favicon.ico',
      template: 'src/index.html',
      inject: true
    })
  ]
});

