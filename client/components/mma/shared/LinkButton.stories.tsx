import { palette } from '@guardian/source/foundations';
import type { Meta } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { LinkButton } from './Buttons';

export default {
	title: 'Components/LinkButton',
	component: LinkButton,
	decorators: [ReactRouterDecorator],
	args: {
		text: 'Link Button',
		to: '/example',
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
} as Meta<typeof LinkButton>;

export const Default = {};

export const BoldWithBrandColours = {
	args: {
		fontWeight: 'bold',
		colour: palette.brand[800],
		textColour: palette.brand[400],
	},
};

export const WithAlert = {
	args: {
		alert: true,
		fontWeight: 'bold',
		colour: palette.brand[400],
		textColour: palette.neutral[100],
	},
};

export const WithRightArrow = {
	args: {
		right: true,
	},
};

export const WithLeftArrow = {
	args: {
		left: true,
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
