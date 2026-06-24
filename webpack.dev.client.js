/* eslint-disable @typescript-eslint/no-var-requires -- minimising changes */
const { merge } = require('webpack-merge');
const { client, createSentryPlugin } = require('./webpack.common.js');

module.exports = merge(client, {
	devtool: 'inline-source-map',
	mode: 'development',
	plugins: createSentryPlugin('manage-frontend-client'),
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
