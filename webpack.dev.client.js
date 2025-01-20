import { merge } from 'webpack-merge';
import { client } from './webpack.common.js';

export default merge(client, {
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
