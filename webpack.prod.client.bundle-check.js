import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import { client } from './webpack.common.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default merge(client, {
	mode: 'production',
	output: {
		path: resolve(__dirname, '../tmp_client_bundle'),
		chunkFilename: '[name].[chunkhash].js',
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
		}),
	],
});
