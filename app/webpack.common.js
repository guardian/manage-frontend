const path = require('path');
const { merge } = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const babelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');

const assetsPluginInstance = new AssetsPlugin({
	path: path.resolve(__dirname, './dist/'),
});

const definePlugin = new webpack.DefinePlugin({
	WEBPACK_BUILD: process.env.TEAMCITY_BUILD
		? `'${process.env.TEAMCITY_BUILD}'`
		: `'DEV_${new Date().getTime()}'`,
	GIT_COMMIT_HASH: process.env.BUILD_VCS_NUMBER
		? `'${process.env.BUILD_VCS_NUMBER}'`
		: `'${new GitRevisionPlugin().commithash()}'`,
	CYPRESS: `'${process.env.CYPRESS}'`,
});

const copyPlugin = new CopyWebpackPlugin({
	patterns: [
		{
			from: path.resolve(__dirname, 'package.json'),
			to: path.resolve(__dirname, 'dist', 'static', 'package.json'),
		},
	],
});

const nodePolyfillPlugin = new NodePolyfillPlugin({
	excludeAliases: ['console'],
});

const babelCommon = {
	presets: [
		'@babel/typescript',
		[
			"@babel/preset-react",
			{ runtime: "automatic" }
		],
		'@emotion/babel-preset-css-prop',
	],
	plugins: [
		'@babel/proposal-class-properties',
		'@babel/proposal-object-rest-spread',
		'@babel/plugin-proposal-optional-chaining',
		'lodash',
	],
};

const common = {
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	plugins: [definePlugin, assetsPluginInstance],
};

const server = merge(common, {
	entry: './server/server',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.js',
		publicPath: '/',
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false,
	},
	module: {
		rules: [
			{
				test: /\.(tsx?)|(js)$/,
				exclude: babelLoaderExcludeNodeModulesExcept(['@guardian/*']),
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
							...babelCommon.plugins,
							'babel-plugin-source-map-support',
						],
						presets: [
							[
								'@babel/preset-env',
								{
									targets: { node: '12.22.7' },
									ignoreBrowserslistConfig: true,
									useBuiltIns: 'entry',
									corejs: 3,
								},
							],
							...babelCommon.presets,
						],
					},
				},
			},
		],
	},
});

const client = merge(common, {
	entry: {
		mma: ['whatwg-fetch', './client/MMAPage'],
		'help-centre': ['whatwg-fetch', './client/HelpCentrePage'],
	},
	output: {
		path: path.resolve(__dirname, 'dist', 'static'),
		filename: '[name].js',
		chunkFilename: '[name].js',
		publicPath: '/static/',
	},
	module: {
		rules: [
			{
				test: /\.(tsx?)|(js)$/,
				exclude: babelLoaderExcludeNodeModulesExcept(['@guardian/*']),
				use: {
					loader: 'babel-loader',
					options: {
						plugins: babelCommon.plugins,
						presets: [
							[
								'@babel/env',
								{
									useBuiltIns: 'entry',
									corejs: 3.16,
								},
							],
							...babelCommon.presets,
						],
					},
				},
			},
			{
				test: /\.css$/i,
				type: 'asset/source',
				include: [path.resolve(__dirname, 'node_modules')],
			},
		],
	},
	plugins: [copyPlugin, nodePolyfillPlugin],
});
module.exports = {
	client: client,
	server: server,
	babelCommon: babelCommon,
};
