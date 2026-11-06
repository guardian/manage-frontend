/* eslint-disable @typescript-eslint/no-var-requires -- minimising changes */
const { merge } = require('webpack-merge');
const { client, createSentryPlugin } = require('./webpack.common.js');

module.exports = merge(client, {
	devtool: 'inline-source-map',
	mode: 'development',
	plugins: createSentryPlugin('manage-frontend-client'),
	devServer: {
		// Containers override this to 0.0.0.0 as Docker can't access 127.0.0.1
		host: process.env.WEBPACK_DEV_SERVER_HOST || 'manage.thegulocal.com',
		allowedHosts: ['manage.thegulocal.com', 'localhost'],
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
