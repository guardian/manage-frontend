import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RouterDecorator } from '../../.storybook/RouterDecorator';

import { Main, MainProps } from './main';

export default {
	title: 'Layouts/Main',
	component: Main,
	decorators: [RouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		signInStatus: 'init',
		requiresSignIn: false,
		helpCentrePage: false,
	},
	argTypes: {
		signInStatus: {
			options: ['init', 'signedOut', 'signedIn'],
			control: { type: 'select' },
		},
	},
} as ComponentMeta<typeof Main>;

const Template: ComponentStory<typeof Main> = (args: MainProps) => (
	<Main {...args}>
		<h1>Main content</h1>
	</Main>
);

export const SignedOut = Template.bind({});
SignedOut.args = {
	signInStatus: 'signedOut',
};

export const SignedIn = Template.bind({});
SignedIn.args = {
	signInStatus: 'signedIn',
};

export const RequiresSignIn = Template.bind({});
RequiresSignIn.args = {
	signInStatus: 'signedIn',
	requiresSignIn: true,
};

export const HelpCentreSignedOut = Template.bind({});
HelpCentreSignedOut.args = {
	signInStatus: 'signedOut',
	helpCentrePage: true,
};

export const HelpCentreSignedIn = Template.bind({});
HelpCentreSignedIn.args = {
	signInStatus: 'signedIn',
	helpCentrePage: true,
};
