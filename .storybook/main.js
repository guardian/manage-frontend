const webpack = require('webpack');
const path = require('path');

module.exports = {
	stories: ['../client/**/*.stories.@(js|jsx|ts|tsx)'],

	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-webpack5-compiler-babel',
		'@chromatic-com/storybook',
	],

	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},

	docs: {},

	staticDirs: ['./static'],

	webpackFinal: async (config, { configType }) => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve('babel-loader'),
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-typescript',
							[
								'@babel/preset-react',
								{
									runtime: 'automatic',
									importSource: '@emotion/react',
								},
							],
						],
						plugins: [
							'@babel/plugin-transform-typescript',
							'@emotion/babel-plugin',
							'@babel/plugin-proposal-class-properties',
						],
					},
				},
			],
		});
		config.resolve.plugins ||= [];
		config.plugins.push(
			// Buffer, which is a Node.js object, is not defined in browser environments
			// when building with Webpack 5, so we need to polyfill it to make Storybook work.
			// We use Buffer in our file uploading utils.
			new webpack.ProvidePlugin({
				Buffer: ['buffer', 'Buffer'],
			}),
		);
		config.resolve.alias = {
			...config.resolve.alias,
			Buffer: 'buffer',
			'@': path.resolve(__dirname, '../'),
		};
		return config;
	},

	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
};
