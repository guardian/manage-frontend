module.exports = {
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
	testResultsProcessor: 'jest-teamcity-reporter',
	snapshotSerializers: ['@emotion/jest/serializer'],
	globals: {
		'ts-jest': {
			babelConfig: {
				presets: [
					['@babel/preset-env', { targets: { node: 'current' } }],
					'@babel/typescript',
					[
						'@babel/preset-react',
						{
							runtime: 'automatic',
							importSource: '@emotion/react',
						},
					],
				],
				plugins: [
					'@babel/proposal-class-properties',
					'@babel/proposal-object-rest-spread',
					'@babel/plugin-proposal-optional-chaining',
					'lodash',
					'@emotion/babel-plugin',
				],
			},
		},
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: [
		'<rootDir>/cypress/',
		'<rootDir>/cdk/',
		'<rootDir>/node_modules/',
	],
};
