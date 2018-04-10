var path = require('path');
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin({path:  path.resolve(__dirname, '../conf/')})

module.exports = {
    entry: {
    	csr: './typescript/csr',
    	user: './typescript/user'
    },
    output: {
        path:  path.resolve(__dirname, '../public/'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
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