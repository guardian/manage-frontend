const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = [
  merge(common.client, {
    devtool: "inline-source-map",
    mode: "development"
  }),
  merge(common.server, {
    devtool: "inline-source-map",
    mode: "development"
  })
];
