const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common.client, {
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    host: "manage.thegulocal.com",
    port: 9234,
    inline: true,
    open: true,
    index: "/", // specify to enable root proxying
    proxy: {
      "**": {
        target: "http://localhost:9233"
      }
    }
  },
  plugins: [new BundleAnalyzerPlugin()]
});
