/* eslint-disable @typescript-eslint/no-var-requires -- minimising changes */
const { merge } = require('webpack-merge');
const { client } = require('./webpack.common.js');
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

module.exports = merge(client, {
	devtool: 'inline-source-map',
	mode: 'development',
	plugins: sentryPlugins,
	devServer: {
		host: 'manage.thegulocal.com',
		port: 9234,
		devMiddleware: {
			index: '/', // specify to enable root proxying
		},
		proxy: [
			{
				context: '**',
				target: 'http://localhost:9233',
			},
		],
	},
});
