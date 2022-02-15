import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import fetchMock from 'fetch-mock';

import { SectionContent } from '../sectionContent';
import { SectionHeader } from '../sectionHeader';
import { KnownIssues } from '../helpCentre/knownIssues';
import ContactUs, { ContactUsProps } from './contactUs';

export default {
	title: 'Pages/ContactUs',
	component: ContactUs,
	parameters: {
		controls: { disabled: true },
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof ContactUs>;

export const Default: ComponentStory<typeof ContactUs> = (
	_: ContactUsProps,
) => {
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

export const WithKnownIssue: ComponentStory<typeof ContactUs> = (
	_: ContactUsProps,
) => {
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

export const TopicSelected: ComponentStory<typeof ContactUs> = (
	_: ContactUsProps,
) => {
	fetchMock.restore().get('/api/known-issues/', { body: [] });

	return (
		<>
			<SectionHeader title="Need to contact us?" />
			<KnownIssues />
			<SectionContent>
				<ContactUs urlTopicId="billing" />
			</SectionContent>
		</>
	);
};
