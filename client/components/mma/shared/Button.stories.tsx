import { brand } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import type { ButtonProps } from './Buttons';
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

const Template: StoryFn<typeof Button> = (args: ButtonProps) => (
	<Button {...args} />
);

export const Default = Template.bind({});

export const Bold = Template.bind({});
Bold.args = {
	fontWeight: 'bold',
};

export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true,
};

export const WithBrandColours = Template.bind({});
WithBrandColours.args = {
	colour: brand[800],
	textColour: brand[400],
};

export const WithRightArrow = Template.bind({});
WithRightArrow.args = {
	right: true,
};

export const DisabledWithRightArrow = Template.bind({});
DisabledWithRightArrow.args = {
	disabled: true,
	right: true,
};

export const PrimaryWithRightArrow = Template.bind({});
PrimaryWithRightArrow.args = {
	primary: true,
	right: true,
};

export const HollowWithLeftArrow = Template.bind({});
HollowWithLeftArrow.args = {
	hollow: true,
	left: true,
};
