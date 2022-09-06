import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import fetchMock from 'fetch-mock';

import { SectionContent } from '../sectionContent';
import { SectionHeader } from '../sectionHeader';
import { KnownIssues } from '../helpCentre/knownIssues';
import ContactUs from './contactUs';

export default {
	title: 'Pages/ContactUs',
	component: ContactUs,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof ContactUs>;

export const Default: ComponentStory<typeof ContactUs> = () => {
	fetchMock.restore().get('/api/known-issues/', { body: [] });

	return (
		<MemoryRouter>
			<SectionHeader title="Need to contact us?" />
			<KnownIssues />
			<SectionContent>
				<ContactUs />
			</SectionContent>
		</MemoryRouter>
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
		<MemoryRouter>
			<SectionHeader title="Need to contact us?" />
			<KnownIssues />
			<SectionContent>
				<ContactUs />
			</SectionContent>
		</MemoryRouter>
	);
};

export const TopicSelected: ComponentStory<typeof ContactUs> = () => {
	fetchMock.restore().get('/api/known-issues/', { body: [] });

	return (
		<MemoryRouter initialEntries={['/contact-us/billing']}>
			<Routes>
				<Route
					path="/contact-us/:urlTopicId"
					element={
						<>
							<SectionHeader title="Need to contact us?" />
							<KnownIssues />
							<SectionContent>
								<ContactUs />
							</SectionContent>
						</>
					}
				/>
			</Routes>
		</MemoryRouter>
	);
};
