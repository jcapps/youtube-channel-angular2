var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var YOUTUBE_INFO = require('../tools/private/youtubeInfo');

const GLOBALS = {
    'process.env': {
        'CLIENT_ID': JSON.stringify(YOUTUBE_INFO.CLIENT_ID),
        'YOUTUBE_KEY': JSON.stringify(YOUTUBE_INFO.API_KEY),
        'CHANNEL_ID': JSON.stringify(YOUTUBE_INFO.CHANNEL_ID)
    }
};

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/polyfills.ts',
    './src/vendor.ts',
    './src/main.ts'
  ],
  
  output: {
    path: helpers.root('dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({debug: true}),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),

    new HtmlWebpackPlugin({
      favicon: 'src/images/favicon.ico',
      template: 'src/index.html',
      inject: false
    })
  ],
  
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
