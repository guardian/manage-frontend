const path = require("path");
const merge = require("webpack-merge");
const AssetsPlugin = require("assets-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const assetsPluginInstance = new AssetsPlugin({
  path: path.resolve(__dirname, "./dist/")
});

const definePlugin = new webpack.DefinePlugin({
  WEBPACK_BUILD: process.env.TEAMCITY_BUILD
    ? `'${process.env.TEAMCITY_BUILD}'`
    : "'NO BUILD SET'"
});

const copyPlugin = new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, "client", "fonts"),
    to: path.resolve(__dirname, "dist", "static", "fonts")
  }
]);

const nodeExternals = require("webpack-node-externals");

const babelCommon = {
  presets: [
    [
      "@babel/env",
      {
        useBuiltIns: "usage"
      }
    ],
    "@babel/typescript",
    "@babel/react"
  ],
  plugins: [
    "emotion",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
};

const common = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  plugins: [definePlugin, assetsPluginInstance]
};

const server = merge(common, {
  entry: "./server/server",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    publicPath: "/"
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  externals: nodeExternals(),
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: [...babelCommon.plugins, "babel-plugin-source-map-support"],
          presets: [
            [
              "@babel/env",
              {
                targets: { node: "10.7.0" },
                ignoreBrowserslistConfig: true
              }
            ],
            "@babel/typescript",
            "@babel/react"
          ]
        }
      }
    ]
  }
});

const client = merge(common, {
  entry: {
    csr: ["whatwg-fetch", "./client/csr"],
    user: ["whatwg-fetch", "./client/user"]
  },
  output: {
    path: path.resolve(__dirname, "dist", "static"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/static/"
  },
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: babelCommon
      }
    ]
  },
  plugins: [copyPlugin]
});
module.exports = {
  client: client,
  server: server
};
