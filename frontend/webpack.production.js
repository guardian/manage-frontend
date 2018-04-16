const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = [
  merge(common.client, {
    mode: "production",
    output: {
  //    filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].js"
    }
  }),
  merge(common.server, {
    mode: "production"
  })
];
