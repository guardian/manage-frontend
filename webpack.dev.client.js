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
				context: '**',
				target: 'http://localhost:9233',
			},
		],
	},
});
