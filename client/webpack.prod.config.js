const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const APP_DIR = path.resolve(__dirname, './src/index.jsx');
const BUILD_DIR = path.resolve(__dirname, './dist');
const TEMPLATE_DIR = path.resolve(__dirname, './src/template.index.html');
const ENV_DIR = path.resolve(__dirname, './.env');

const cleanOptions = {
  verbose: true,
};

module.exports = {
  entry: {
    app: APP_DIR,
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanPlugin(['dist'], cleanOptions),
    new HTMLPlugin({
      template: TEMPLATE_DIR,
      inject: 'body',
    }),
    new Dotenv({
      path: ENV_DIR,
      safe: false,
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
