import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { fn } from '@storybook/test';
import type { ExtraAccount } from '../../../stores/ExtraAccountsStore';
import { ToastContainer } from '../../shared/ToastContainer';
import { ExtraAccountCancelInvitationModal } from './ExtraAccountCancelInvitationModal';

const ToastDecorator: Decorator = (Story) => (
	<>
		<Story />
		<ToastContainer />
	</>
);

const pendingAccount: ExtraAccount = {
	status: 'pending',
	email: 'pending@example.com',
	invitationCode: 'INV-001',
};

const activeAccount: ExtraAccount = {
	status: 'active',
	email: 'active@example.com',
	name: 'Alex Active',
	secondaryIdentityId: 'secondary-active',
};

const mockCancelInvitation = fn(async () => true);
const mockRemoveAccess = fn(async () => true);

export default {
	title: 'Components/ExtraAccountCancelInvitationModal',
	component: ExtraAccountCancelInvitationModal,
	decorators: [ToastDecorator],
	args: {
		cancelInvitation: mockCancelInvitation,
		removeAccess: mockRemoveAccess,
		isSubmitting: false,
		remainingInvitations: 1,
	},
} as Meta<typeof ExtraAccountCancelInvitationModal>;

export const CancelInvitationClosed: StoryObj<
	typeof ExtraAccountCancelInvitationModal
> = {
	args: {
		account: pendingAccount,
	},
};

export const CancelInvitationOpen: StoryObj<
	typeof ExtraAccountCancelInvitationModal
> = {
	args: {
		account: pendingAccount,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByText('Cancel invitation'));
	},
};

export const RemoveAccessClosed: StoryObj<
	typeof ExtraAccountCancelInvitationModal
> = {
	args: {
		account: activeAccount,
	},
};

export const RemoveAccessOpen: StoryObj<
	typeof ExtraAccountCancelInvitationModal
> = {
	args: {
		account: activeAccount,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByText('Remove access'));
	},
};
