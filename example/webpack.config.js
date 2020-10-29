'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolveModules() {
  return ['node_modules', path.resolve(__dirname, '../node_modules')];
}

module.exports = function () {
  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.bundle.js'
    },
    module: {
      rules: [
        {
          test: /.(js|json|jsx|ts|tsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      modules: resolveModules()
    },

    devtool: 'source-map',

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html')
      })
    ]
  };
};
