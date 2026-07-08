import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { fn } from '@storybook/test';
import { ToastContainer } from '../../shared/ToastContainer';
import { ExtraAccountInviteForm } from './ExtraAccountInviteForm';

const ToastDecorator: Decorator = (Story) => (
	<>
		<Story />
		<ToastContainer />
	</>
);

const mockSendInvitation = fn(async () => true);

export default {
	title: 'Components/ExtraAccountInviteForm',
	component: ExtraAccountInviteForm,
	decorators: [ToastDecorator],
	args: {
		onOpen: fn(),
		onCancel: fn(),
		onSent: fn(),
		sendInvitation: mockSendInvitation,
		isSubmitting: false,
	},
} as Meta<typeof ExtraAccountInviteForm>;

export const Closed: StoryObj<typeof ExtraAccountInviteForm> = {
	args: {
		isFormOpen: false,
	},
};

export const Open: StoryObj<typeof ExtraAccountInviteForm> = {
	args: {
		isFormOpen: true,
	},
};

export const ValidationErrors: StoryObj<typeof ExtraAccountInviteForm> = {
	args: {
		isFormOpen: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const sendButton = canvas.getAllByRole('button', {
			name: 'Send invitation',
		})[0];
		await userEvent.click(sendButton);
	},
};

export const Submitting: StoryObj<typeof ExtraAccountInviteForm> = {
	args: {
		isFormOpen: true,
		isSubmitting: true,
	},
};
