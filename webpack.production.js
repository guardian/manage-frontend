/* eslint-disable @typescript-eslint/no-var-requires -- minimising changes */
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const { client, server } = require('./webpack.common.js');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const RELEASE_VERSION = process.env.GITHUB_RUN_NUMBER
	? process.env.GITHUB_RUN_NUMBER
	: `DEV_${new Date().getTime()}`;

const sentryPlugins = process.env.SENTRY_AUTH_TOKEN
	? [
			SentryWebpackPlugin({
				authToken: process.env.SENTRY_AUTH_TOKEN,
				org: 'the-guardian',
				project: 'manage-frontend-client',
				release: RELEASE_VERSION,
			}),
	  ]
	: [];

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
			...sentryPlugins,
		],
	}),
	merge(server, {
		mode: 'production',
	}),
];
