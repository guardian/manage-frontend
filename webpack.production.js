import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import { client, server } from './webpack.common.js';

export default [
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
