import { brand, neutral } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import type { LinkButtonProps } from './Buttons';
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

const Template: StoryFn<typeof LinkButton> = (args: LinkButtonProps) => (
	<LinkButton {...args} />
);

export const Default = Template.bind({});

export const BoldWithBrandColours = Template.bind({});
BoldWithBrandColours.args = {
	fontWeight: 'bold',
	colour: brand[800],
	textColour: brand[400],
};

export const WithAlert = Template.bind({});
WithAlert.args = {
	alert: true,
	fontWeight: 'bold',
	colour: brand[400],
	textColour: neutral[100],
};

export const WithRightArrow = Template.bind({});
WithRightArrow.args = {
	right: true,
};

export const WithLeftArrow = Template.bind({});
WithLeftArrow.args = {
	left: true,
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
