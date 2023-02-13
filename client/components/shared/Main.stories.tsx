import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactRouterDecorator } from '../../../.storybook/ReactRouterDecorator';
import type { MainProps } from './Main';
import { Main } from './Main';

export default {
	title: 'Layouts/Main',
	component: Main,
	decorators: [ReactRouterDecorator],
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

export const HelpCentreSignedOut = Template.bind({});
HelpCentreSignedOut.args = {
	signInStatus: 'signedOut',
};

export const HelpCentreSignedIn = Template.bind({});
HelpCentreSignedIn.args = {
	signInStatus: 'signedIn',
};
