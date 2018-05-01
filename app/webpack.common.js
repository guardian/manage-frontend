const path = require("path");
const merge = require("webpack-merge");
const AssetsPlugin = require("assets-webpack-plugin");
const assetsPluginInstance = new AssetsPlugin({
  path: path.resolve(__dirname, "../conf/")
});

const nodeExternals = require("webpack-node-externals");
/**"env": {
    "production": {
      "plugins": [
        [
          "emotion",
          {
            "hoist": true
          }
        ]
      ]
    },
    "development": {
      "plugins": [
        [
          "emotion",
          {
            "sourceMap": true,
            "autoLabel": true
          }
        ]
      ]
    }
  }, */

const babelCommon = {
  presets: ["@babel/env", "@babel/typescript", "@babel/react"],
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
  plugins: [assetsPluginInstance]
};

const server = merge(common, {
  entry: "./server/server",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    publicPath: "/"
  },
  target: "node",
  externals: nodeExternals(),
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          ...babelCommon,
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
    chunkFilename: "[name].js"
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
