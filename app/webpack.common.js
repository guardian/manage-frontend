const path = require("path");
const merge = require("webpack-merge");
const AssetsPlugin = require("assets-webpack-plugin");
const webpack = require("webpack");

const assetsPluginInstance = new AssetsPlugin({
  path: path.resolve(__dirname, "./dist/")
});

const definePlugin = new webpack.DefinePlugin({
  WEBPACK_ENVIRONMENT: `'${process.env.NODE_ENV}'` || "'NO ENVIRONMENT SET'",
  WEBPACK_BUILD: `'${process.env.TEAMCITY_BUILD}'` || "'NO BUILD SET'"
});

const nodeExternals = require("webpack-node-externals");

const babelCommon = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          browsers: ["last 2 versions"]
        },
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
            ["@babel/env", { targets: { node: "current" } }],
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
    csr: ["babel-regenerator-runtime", "./client/csr"],
    user: ["babel-regenerator-runtime", "./client/user"]
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
  }
});
module.exports = {
  client: client,
  server: server
};
