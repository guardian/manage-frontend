import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { SectionContent } from '../../shared/SectionContent';
import { SectionHeader } from '../../shared/SectionHeader';
import { KnownIssues } from '../KnownIssues';
import { ContactUs } from './ContactUs';

export default {
	title: 'Pages/ContactUs',
	component: ContactUs,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof ContactUs>;

export const Default: StoryObj<typeof ContactUs> = {
	render: () => {
		return (
			<>
				<SectionHeader title="Need to contact us?" />
				<KnownIssues issues={[]} />
				<SectionContent>
					<ContactUs />
				</SectionContent>
			</>
		);
	},

	parameters: {
		msw: [
			rest.get('/api/known-issues/', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
		],
	},
};

const knownIssue = [
	{
		date: '20 Jan 2022 12:00',
		message: 'Live Chat is currently unavailable.',
	},
];

export const WithKnownIssue: StoryObj<typeof ContactUs> = {
	render: () => {
		return (
			<>
				<SectionHeader title="Need to contact us?" />
				<KnownIssues issues={knownIssue} />
				<SectionContent>
					<ContactUs />
				</SectionContent>
			</>
		);
	},

	parameters: {
		msw: [
			rest.get('/api/known-issues/', (_req, res, ctx) => {
				return res(ctx.json(knownIssue));
			}),
		],
	},
};

export const TopicSelected: StoryObj<typeof ContactUs> = {
	render: () => (
		<>
			<SectionHeader title="Need to contact us?" />
			<KnownIssues issues={[]} />
			<SectionContent>
				<ContactUs />
			</SectionContent>
		</>
	),

	parameters: {
		reactRouter: {
			location: '/contact-us/billing',
			path: '/contact-us/:urlTopicId',
		},
	},
};
