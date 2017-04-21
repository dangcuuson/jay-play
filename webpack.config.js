const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve("public", "index.html"),
  filename: "index.html",
  inject: "body"
});

let clientAppDir = path.resolve("src", "client");

module.exports = {
  entry: path.resolve(clientAppDir, "main.js"),
  output: {
    path: path.resolve("public"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(clientAppDir, "components")
    }
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
