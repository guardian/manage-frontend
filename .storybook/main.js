module.exports = {
	stories: ['../client/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-essentials'],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: false,
	},
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
		return config;
	},
};
