import type { Meta } from '@storybook/react';
import { Spinner } from './Spinner';

export default {
	title: 'Components/Spinner',
	component: Spinner,
	args: {
		loadingMessage: '',
		scale: 1,
		inline: undefined,
		alignCenter: undefined,
	},
	argTypes: {
		inline: {
			options: [true, undefined],
			control: { type: 'inline-radio' },
		},
		alignCenter: {
			options: [true, undefined],
			control: { type: 'inline-radio' },
		},
	},
} as Meta<typeof Spinner>;

export const Default = {};

export const Scaled = {
	args: {
		scale: 2,
	},
};

export const WithLoadingMessage = {
	args: {
		loadingMessage: 'Loading your account details...',
	},
};
