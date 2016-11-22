'use strict';
require("nodejs-dashboard");
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const rimraf = require('rimraf');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),

  entry: {
    "app":  path.join(__dirname, 'src', 'app', 'index.js'),
    "vendor": [ path.join(__dirname, 'src', 'app', 'vendor', 'index.js') ],
  },

  output: {
    path:       path.join(__dirname, 'build'),
    publicPath:     "/static/app/build/",
    filename:       "[name].js",
    chunkFilename:  "[id].js",
    library:        "[name]"
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

  plugins: [
    {
      apply: (compiler) => {
        rimraf.sync(compiler.options.output.path);
      }
    },
    new ExtractTextPlugin('[name].css', {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG:     JSON.stringify('ru')
    }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path:     path.join(__dirname, 'assets')
    })
  ],
  //
   resolve: {
    // modulesDirectories: ['node_modules'],
     extensions:         ['', '.js', '.scss']
  },
  //
  // resolveLoader: {
  //   modulesDirectories: ['node_modules'],
  //   moduleTemplates:    ['*-loader', '*'],
  //   extensions:         ['', '.js']
  // },


  module: {

    loaders: [
    {
      test:   /\.js/,
      exclude: /(node_modules)/,
      loader: 'babel'
    },
    {
      "test": /\.css?$/,
      "loader": "style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]"
    },
    // {
    //   "test": /\.scss?$/,
    //   loaders: ['style', 'css', 'sass']
    // },
      {
        test:   /\.scss/,
        loader: ExtractTextPlugin.extract('css!sass?resolve url')
      }, {
        test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=[path][name].[ext]',
      }
    ]

  }
};


if (NODE_ENV == 'production') {
  module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // don't show unreachable variables etc
          warnings:     false,
          drop_console: true,
          unsafe:       true
        }
      })
  );
}
