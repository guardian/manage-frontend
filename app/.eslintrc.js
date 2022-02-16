module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:jest/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'jest', '@emotion'],
	overrides: [
		{
			files: ['client/__tests__/**'],
			rules: {
				'@typescript-eslint/ban-ts-comment': ['off'],
			},
		},
	],
	rules: {
		'no-prototype-builtins': ['off'],
		'react/no-unescaped-entities': ['off'],
		'react/display-name': ['off'], // TODO: remove this rule and fix in code
		'@typescript-eslint/ban-types': ['off'],
		'@typescript-eslint/explicit-module-boundary-types': ['off'],
		'@typescript-eslint/no-inferrable-types': ['off'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '_' },
		],
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-expect-error': 'allow-with-description',
				'ts-ignore': 'allow-with-description',
				'ts-nocheck': 'allow-with-description',
				'ts-check': 'allow-with-description',
				minimumDescriptionLength: 10,
			},
		],
		'@emotion/pkg-renaming': 'error',
	},
};
