import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import type { CancelRemindersProps } from './CancelReminders';
import CancelReminders from './CancelReminders';

export default {
	title: 'Pages/CancelReminders',
	component: CancelReminders,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof CancelReminders>;

export const Error: ComponentStory<typeof CancelReminders> = (
	_: CancelRemindersProps,
) => {
	fetchMock.restore().post('/api/reminders/cancel', 500);

	return <CancelReminders reminderCode="123" />;
};

export const Success: ComponentStory<typeof CancelReminders> = (
	_: CancelRemindersProps,
) => {
	fetchMock.restore().post('/api/reminders/cancel', 200);

	return <CancelReminders reminderCode="123" />;
};