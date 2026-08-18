import type { Meta, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { Faqs } from './Faqs';

const sampleItems = [
	{
		id: 'what-is-extra-accounts',
		title: 'What is Extra accounts?',
		content:
			'Multiple accounts is a subscription benefit that allows Digital Plus subscribers to share their subscription access with up to three other people.',
	},
	{
		id: 'who-can-i-invite',
		title: 'Who can I invite to join Extra accounts?',
		content:
			'You can invite friends, family, or anyone you choose. Each person needs their own Guardian account to accept the invitation.',
	},
	{
		id: 'what-benefits',
		title: 'What benefits will invited members receive?',
		content:
			'Invited members get access to the same Digital Plus benefits as you, including ad-free reading and exclusive features.',
	},
	{
		id: 'cancel-or-change',
		title: 'What happens if I cancel or change my subscription?',
		content:
			'If you cancel or change your subscription, invited members will lose access when your Extra accounts benefit ends.',
	},
];

export default {
	title: 'Components/Faqs',
	component: Faqs,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'padded',
	},
} as Meta<typeof Faqs>;

export const Default: StoryObj<typeof Faqs> = {
	args: {
		items: sampleItems,
		viewMoreHref: '/help-centre',
	},
};
