import { palette } from '@guardian/source-foundations';
import type { Meta } from '@storybook/react';
import { Button } from './Buttons';

export default {
	title: 'Components/Button',
	component: Button,
	args: {
		text: 'Button',
		height: undefined,
		fontWeight: undefined,
		left: false,
		right: false,
		disabled: false,
		colour: undefined,
		textColour: undefined,
		primary: undefined,
		hollow: undefined,
		hide: false,
		forceCircle: undefined,
		hoverColour: undefined,
		leftTick: undefined,
		alert: false,
		type: 'button',
	},
	argTypes: {
		fontWeight: {
			options: ['bold', undefined],
			control: { type: 'inline-radio' },
		},
		primary: {
			options: [true, undefined],
			control: { type: 'inline-radio' },
		},
		hollow: {
			options: [true, undefined],
			control: { type: 'inline-radio' },
		},
		forceCircle: {
			options: [true, undefined],
			control: { type: 'inline-radio' },
		},
		leftTick: {
			options: [true, undefined],
			control: { type: 'inline-radio' },
		},
		colour: {
			control: { type: 'color' },
		},
		textColour: {
			control: { type: 'color' },
		},
		hoverColour: {
			control: { type: 'color' },
		},
		type: {
			options: ['button', 'submit', 'reset'],
			control: { type: 'inline-radio' },
		},
	},
} as Meta<typeof Button>;

export const Default = {};

export const Bold = {
	args: {
		fontWeight: 'bold',
	},
};

export const Disabled = {
	args: {
		disabled: true,
	},
};

export const WithBrandColours = {
	args: {
		colour: palette.brand[800],
		textColour: palette.brand[400],
	},
};

export const WithRightArrow = {
	args: {
		right: true,
	},
};

export const DisabledWithRightArrow = {
	args: {
		disabled: true,
		right: true,
	},
};

export const PrimaryWithRightArrow = {
	args: {
		primary: true,
		right: true,
	},
};

export const HollowWithLeftArrow = {
	args: {
		hollow: true,
		left: true,
	},
};
