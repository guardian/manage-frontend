const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = [
  merge(common.client, {
    mode: "production",
    output: {
      chunkFilename: "[name].[chunkhash].js"
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: "static"
      })
    ]
  }),
  merge(common.server, {
    mode: "production"
  })
];
