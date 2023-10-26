module.exports = {
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
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
		// Webpack's DefinePlugin bakes 'CYPRESS = "SKIP_IDAPI"' into the compiled code
		// when building for Cypress. This is used to skip the auth middleware in Cypress.
		// In Jest, we want to run the auth middleware, and in any case we need to set
		// CYPRESS to something, otherwise Jest won't run.
		CYPRESS: 'false',
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: [
		'<rootDir>/cypress/',
		'<rootDir>/cdk/',
		'<rootDir>/node_modules/',
	],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
	},
};
