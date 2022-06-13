import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router';

import Header, { HeaderProps } from './header';

export default {
	title: 'Components/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		signInStatus: 'init',
		requiresSignIn: false,
	},
	argTypes: {
		signInStatus: {
			options: ['init', 'signedOut', 'signedIn'],
			control: { type: 'select' },
		},
	},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args: HeaderProps) => (
	<MemoryRouter>
		<Header {...args} />
	</MemoryRouter>
);

export const Initial = Template.bind({});

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
