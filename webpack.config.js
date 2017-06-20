const path = require("path");
const webpack = require("webpack");
const tsconfig = require('./tsconfig.json');

const baseUrl = path.resolve(tsconfig.compilerOptions.baseUrl);
const webpackAlias = {};
for (let key in tsconfig.compilerOptions.paths) {
  webpackAlias[key] = path.resolve(baseUrl, tsconfig.compilerOptions.paths[key][0]);
}

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
      enforce: "pre",
      test: /\.js?$/,
      loader: "source-map-loader"
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }],
  },
  resolve: {
    extensions: [
      ".ts", ".tsx", ".js", ".json"
    ],
    alias: webpackAlias
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
