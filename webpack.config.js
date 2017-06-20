const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.resolve('src');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(SRC_DIR, "index.html"),
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: path.resolve(SRC_DIR, "main.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve("public")
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: "awesome-typescript-loader"
    }, {
      test: /\.tsx?$/,
      enforce: 'pre',
      loader: 'tslint-loader',
      options: {
        configFile: 'tslint.json',
        failOnHint: false
      }
    }, {
      enforce: "pre",
      test: /\.js?$/,
      loader: "source-map-loader"
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.svg$/,
      loader: 'svg-react-loader'
    }],
  },
  resolve: {
    extensions: [
      ".ts", ".tsx", ".js", ".json", "svg"
    ],
    alias: {
      components: path.resolve(SRC_DIR, 'components'),
      assets: path.resolve(SRC_DIR, 'assets')
    }
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{ from: 'src/assets/images' }])
  ]
};
