const path = require("path");
const merge = require("webpack-merge");
const AssetsPlugin = require("assets-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");

const assetsPluginInstance = new AssetsPlugin({
  path: path.resolve(__dirname, "./dist/")
});

const definePlugin = new webpack.DefinePlugin({
  WEBPACK_BUILD: process.env.TEAMCITY_BUILD
    ? `'${process.env.TEAMCITY_BUILD}'`
    : `'DEV_${new Date().getTime()}'`,
  GIT_COMMIT_HASH: process.env.BUILD_VCS_NUMBER
    ? `'${process.env.BUILD_VCS_NUMBER}'`
    : `'${new GitRevisionPlugin().commithash()}'`
});

const copyPlugin = new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, "package.json"),
    to: path.resolve(__dirname, "dist", "static", "package.json")
  }
]);

const nodeExternals = require("webpack-node-externals");

const babelCommon = {
  presets: [
    "@babel/typescript",
    "@babel/react",
    "@emotion/babel-preset-css-prop"
  ],
  plugins: [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
    "lodash"
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
  externals: nodeExternals({
    whitelist: [/@guardian\//]
  }),
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: [
          {
            test: /node_modules/,
            exclude: [/@guardian\//]
          }
        ],
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
            ...babelCommon.presets
          ]
        }
      }
    ]
  }
});

const client = merge(common, {
  entry: {
    mma: ["whatwg-fetch", "./client/MMAPage"],
    helpcentre: ["whatwg-fetch", "./client/HelpCentrePage"]
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
        exclude: [
          {
            test: /node_modules/,
            exclude: [/@guardian\//]
          }
        ],
        loader: "babel-loader",
        options: {
          plugins: babelCommon.plugins,
          presets: [
            [
              "@babel/env",
              {
                useBuiltIns: "entry",
                corejs: 3.16
              }
            ],
            ...babelCommon.presets
          ]
        }
      },
      {
        test: /\.css$/i,
        use: "raw-loader",
        include: /node_modules/
      }
    ]
  },
  plugins: [copyPlugin]
});
module.exports = {
  client: client,
  server: server,
  babelCommon: babelCommon
};
