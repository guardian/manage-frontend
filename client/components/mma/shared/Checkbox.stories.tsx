import type { Meta } from '@storybook/react';
import { Checkbox } from './Checkbox';

export default {
	title: 'Components/Checkbox',
	component: Checkbox,
	args: {
		checked: false,
		required: undefined,
		label: '',
		checkboxFill: undefined,
		maxWidth: '',
	},
	argTypes: {
		required: {
			options: [true, undefined],
			control: { type: 'inline-radio' },
		},
		checkboxFill: {
			control: { type: 'color' },
		},
	},
} as Meta<typeof Checkbox>;

export const Default = {};

export const Checked = {
	args: {
		checked: true,
	},
};

export const WithLabel = {
	args: {
		label: 'Guardian Weekly newsletter',
	},
};

export const WithMaxWidth = {
	args: {
		label: 'Guardian Weekly newsletter',
		maxWidth: '8ch',
	},
};
