import { merge } from 'webpack-merge';
import { server } from './webpack.common.js';

export default merge(server, {
	devtool: 'inline-source-map',
	mode: 'development',
});
