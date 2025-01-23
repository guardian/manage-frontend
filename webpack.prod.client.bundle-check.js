/* eslint-disable @typescript-eslint/no-var-requires -- minimising changes */
const path = require('path');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const { client } = require('./webpack.common.js');

module.exports = merge(client, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '../tmp_client_bundle'),
		chunkFilename: '[name].[chunkhash].js',
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
		}),
	],
});
