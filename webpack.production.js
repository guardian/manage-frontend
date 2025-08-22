/* eslint-disable @typescript-eslint/no-var-requires -- minimising changes */
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const { client, server } = require('./webpack.common.js');

module.exports = [
	merge(client, {
		mode: 'production',
		output: {
			chunkFilename: '[name].[chunkhash].js',
		},
		plugins: [
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
			}),
		],
	}),
	merge(server, {
		mode: 'production',
	}),
];
