import type { Meta, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import type { FaqItem } from './Faqs';
import { Faqs } from './Faqs';

const sampleItems: FaqItem[] = [
	{
		id: 'what-are-extra-accounts',
		title: 'What are extra accounts?',
		content: [
			'Extra accounts is a subscription benefit that allows eligible subscribers to share their Guardian access with up to three other people.',
		],
	},
	{
		id: 'who-can-i-invite',
		title: 'Who can I invite to join?',
		content: [
			'You can invite friends to join your subscription. They must be aged 18 or older and have a valid email address.',
		],
	},
	{
		id: 'what-benefits',
		title: 'What benefits will invited members receive?',
		content: [
			'Each invited member will have an individual account with their own login. Invited users will receive the same access to the Guardian as the primary account holder, including the Guardian app, Feast, Editions, ad-free reading and more.',
		],
	},
	{
		id: 'what-information-can-people-see',
		title: 'What information can people I invite see?',
		content: [
			'People you invite will not be able to see your account data, billing information or payment details.',
			'Each invited member will have their own individual Guardian account and login. Their account, reading history, activity and preferences will remain separate from yours.',
		],
	},
	{
		id: 'cancel-or-change',
		title: 'What happens if I cancel or change my subscription?',
		content: [
			'If you cancel your Digital plus subscription or change to a different subscription, you will no longer be able to access extra accounts and all invited members will automatically have their access cancelled. Invited members will be notified of this via email.',
		],
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
		viewMoreLabel: 'See our full FAQs',
	},
};
