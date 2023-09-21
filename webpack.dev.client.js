/* eslint-disable @typescript-eslint/no-var-requires -- minimising changes */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common.client, {
	devtool: 'inline-source-map',
	mode: 'development',
	devServer: {
		host: 'manage.thegulocal.com',
		port: 9234,
		devMiddleware: {
			index: '/', // specify to enable root proxying
		},
		proxy: [
			{
				context: '/idapicodeproxy',
				target: 'https://idapi.code.dev-theguardian.com',
				pathRewrite: { '^/idapicodeproxy': '' },
				changeOrigin: true,
				headers: {
					host: 'https://idapi.code.dev-theguardian.com',
					origin: 'https://manage.code.dev-theguardian.com',
				},
			},
			{
				context: '/avatarcodeproxy',
				target: 'https://avatar.code.dev-theguardian.com',
				pathRewrite: { '^/avatarcodeproxy': '' },
				changeOrigin: true,
				headers: {
					host: 'https://avatar.code.dev-theguardian.com',
					origin: 'https://manage.code.dev-theguardian.com',
				},
			},
			{
				context: '**',
				target: 'http://localhost:9233',
			},
		],
	},
});
