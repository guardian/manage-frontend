/* eslint-disable @typescript-eslint/no-var-requires -- minimising changes */
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = [
	merge(common.client, {
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
	merge(common.server, {
		mode: 'production',
	}),
];
