import react from 'eslint-plugin-react';
import jest from 'eslint-plugin-jest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	...compat.extends('@guardian/eslint-config-typescript'),
	{
		plugins: {
			react,
			jest,
		},

		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'script',
		},

		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			'@typescript-eslint/no-floating-promises': ['off'],
			'@typescript-eslint/no-misused-promises': ['off'],
			'@typescript-eslint/no-unnecessary-condition': ['off'],
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
			'import/no-cycle': ['off'],

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
				{
					argsIgnorePattern: '_',
				},
			],

			'no-prototype-builtins': ['off'],
			'react/display-name': ['off'],
			'react/no-unescaped-entities': ['off'],
		},
	},
	{
		files: ['client/__tests__/**'],

		rules: {
			'@typescript-eslint/ban-ts-comment': ['off'],
		},
	},
	{
		files: ['client/**/*.stories.tsx'],

		rules: {
			'import/no-default-export': 'off',
		},
	},
];

