module.exports = {
	parserOptions: {
		ecmaVersion: 2020,
	},
	extends: [
		'@guardian/eslint-config-typescript',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:jest/recommended',
		'plugin:@guardian/source-foundations/recommended',
		'plugin:@guardian/source-react-components/recommended',
	],
	plugins: ['react', 'jest'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	overrides: [
		{
			files: ['client/__tests__/**'],
			rules: {
				'@typescript-eslint/ban-ts-comment': ['off'],
			},
		},
	],
	rules: {
		// Overrides for rules from `@guardian/eslint-config-typescript`.
		// There are a number of these due to applying the config to an existing
		// codebase. We should progressively fix these and remove the overrides.
		'@typescript-eslint/no-floating-promises': ['off'],
		'@typescript-eslint/no-misused-promises': ['off'],
		'@typescript-eslint/no-unnecessary-condition': ['off'],
		'@typescript-eslint/no-unnecessary-type-assertion': ['off'],
		'@typescript-eslint/no-unsafe-argument': ['off'],
		'@typescript-eslint/no-unsafe-assignment': ['off'],
		'@typescript-eslint/no-unsafe-call': ['off'],
		'@typescript-eslint/no-unsafe-member-access': ['off'],
		'@typescript-eslint/no-unsafe-return': ['off'],
		'@typescript-eslint/prefer-nullish-coalescing': ['off'],
		'@typescript-eslint/prefer-optional-chain': ['off'],
		'@typescript-eslint/prefer-reduce-type-parameter': ['off'],
		'@typescript-eslint/require-await': ['off'],
		'@typescript-eslint/restrict-template-expressions': ['off'],
		'@typescript-eslint/unbound-method': ['off'],
		'import/no-cycle': ['off'],
		'import/no-default-export': ['off'],
		// Overrides carried over from old ESLint config.
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
		'@typescript-eslint/ban-types': ['off'],
		'@typescript-eslint/no-inferrable-types': ['off'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '_' },
		],
		'no-prototype-builtins': ['off'],
		'react/display-name': ['off'],
		'react/no-unescaped-entities': ['off'],
	},
};
