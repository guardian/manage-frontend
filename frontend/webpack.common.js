const path = require("path");
const merge = require("webpack-merge");
const AssetsPlugin = require("assets-webpack-plugin");
const assetsPluginInstance = new AssetsPlugin({
  path: path.resolve(__dirname, "../conf/")
});

const nodeExternals = require("webpack-node-externals");

const common = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  plugins: [assetsPluginInstance],
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};

const server = merge(common, {
  entry: "./typescript/server",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    publicPath: "/"
  },
  target: "node",
  externals: nodeExternals()
});

const client = merge(common, {
  entry: {
    csr: "./typescript/csr",
    user: "./typescript/user"
  },
  output: {
    path: path.resolve(__dirname, "../public/"),
    filename: "[name].js",
    chunkFilename: "[name].js"
  }
});
module.exports = {
  client: client,
  server: server
};
