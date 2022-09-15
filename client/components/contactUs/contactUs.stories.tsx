import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactRouterDecorator } from '../../../.storybook/ReactRouterDecorator';
import fetchMock from 'fetch-mock';

import { SectionContent } from '../sectionContent';
import { SectionHeader } from '../sectionHeader';
import { KnownIssues } from '../helpCentre/knownIssues';
import ContactUs from './contactUs';

export default {
	title: 'Pages/ContactUs',
	component: ContactUs,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof ContactUs>;

export const Default: ComponentStory<typeof ContactUs> = () => {
	fetchMock.restore().get('/api/known-issues/', { body: [] });

	return (
		<>
			<SectionHeader title="Need to contact us?" />
			<KnownIssues />
			<SectionContent>
				<ContactUs />
			</SectionContent>
		</>
	);
};

export const WithKnownIssue: ComponentStory<typeof ContactUs> = () => {
	const knownIssue = [
		{
			date: '20 Jan 2022 12:00',
			message: 'Live Chat is currently unavailable.',
		},
	];

	fetchMock.restore().get('/api/known-issues/', { body: knownIssue });

	return (
		<>
			<SectionHeader title="Need to contact us?" />
			<KnownIssues />
			<SectionContent>
				<ContactUs />
			</SectionContent>
		</>
	);
};

export const TopicSelected: ComponentStory<typeof ContactUs> = () => {
	fetchMock.restore().get('/api/known-issues/', { body: [] });

	return (
		<>
			<SectionHeader title="Need to contact us?" />
			<KnownIssues />
			<SectionContent>
				<ContactUs />
			</SectionContent>
		</>
	);
};
TopicSelected.parameters = {
	reactRouter: {
		location: '/contact-us/billing',
		path: '/contact-us/:urlTopicId',
	},
};
