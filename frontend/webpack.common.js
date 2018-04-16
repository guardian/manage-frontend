var path = require('path');
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin({path:  path.resolve(__dirname, '../conf/')})

const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './typescript/server.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.js',
      publicPath: '/'
    },
    target: 'node',
  externals: nodeExternals(),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    plugins: [assetsPluginInstance],
    module: {
        rules: [{
            // Include ts, tsx, and js files.
            test: /\.(tsx?)|(js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    }
};