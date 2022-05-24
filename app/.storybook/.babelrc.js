module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-typescript',
		[
			'@babel/preset-react',
			{ runtime: 'automatic', importSource: '@emotion/core' },
		],
	],
	plugins: [
		'@babel/proposal-class-properties',
		'@babel/proposal-object-rest-spread',
		'@babel/plugin-proposal-optional-chaining',
		'lodash',
		['babel-plugin-emotion', { cssPropOptimization: true }],
	],
};
