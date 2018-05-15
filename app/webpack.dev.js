const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

const configReplacer = new webpack.NormalModuleReplacementPlugin(
  /server\/config\.development\.ts/,
  "./config.ts"
);

module.exports = [
  merge(common.client, {
    plugins: [configReplacer],
    devtool: "inline-source-map",
    mode: "development"
  }),
  merge(common.server, {
    plugins: [configReplacer],
    devtool: "inline-source-map",
    mode: "development"
  })
];
