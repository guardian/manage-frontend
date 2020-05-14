const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common.server, {
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    disableHostCheck: true
  }
});
