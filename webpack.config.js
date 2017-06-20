'use strict';

const dotenv = require('dotenv');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

dotenv.load();

const production = process.env.NODE_ENV === 'production';

let plugins = [
  new ExtractTextPlugin('bundle.css'),
  new HTMLPlugin({ template: `${__dirname}/app/index.html`}),
  new webpack.DefinePlugin({
    __API_URL__: JSON.stringify(process.env.API_URL),
    __DEBUG__: JSON.stringify(!production),
  }),
];

if(production) {
  plugins = plugins.concat([
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: true,
    //   compress: {
    //     warnings: false,
    //   },
    // }),
    new UglifyJsPlugin(),
    new CleanPlugin(),
  ]);
}

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build`,
  },
  plugins,
  devtool: production ? false : 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        // might need to move this to url-loader
        test: /\.(eot|ttf|woff|svg|png|jpg).*/,
        use: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            use: [
              {
                loader: 'css-loader',
                options: { sourceMap: true },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  includePaths: [`${__dirname}/app/scss`],
                },
              },
            ],
          }
        ),
      },
    ],
  },
};
