/* eslint-disable @typescript-eslint/no-var-requires -- minimising changes */
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const { client, server, createSentryPlugin } = require('./webpack.common.js');

module.exports = [
	merge(client, {
		mode: 'production',
		output: {
			chunkFilename: '[name].[chunkhash].js',
		},
		devtool: 'source-map',
		plugins: [
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
			}),
			...createSentryPlugin('manage-frontend-client'),
		],
	}),
	merge(server, {
		mode: 'production',
	}),
];
