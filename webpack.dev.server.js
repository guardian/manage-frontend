/* eslint-disable @typescript-eslint/no-var-requires -- minimising changes */
const { merge } = require('webpack-merge');
const { server } = require('./webpack.common.js');

module.exports = merge(server, {
	devtool: 'inline-source-map',
	mode: 'development',
});
