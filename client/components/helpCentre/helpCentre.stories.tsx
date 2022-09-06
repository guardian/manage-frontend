import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import fetchMock from 'fetch-mock';

import { HelpCenterContentWrapper } from '../HelpCenterContentWrapper';
import HelpCentre from './helpCentre';

export default {
	title: 'Pages/HelpCentre',
	component: HelpCentre,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof HelpCentre>;

export const Default: ComponentStory<typeof HelpCentre> = () => {
	fetchMock.restore().get('/api/known-issues/', { body: [] });

	return (
		<MemoryRouter>
			<HelpCenterContentWrapper>
				<HelpCentre />
			</HelpCenterContentWrapper>
		</MemoryRouter>
	);
};

export const WithKnownIssue: ComponentStory<typeof HelpCentre> = () => {
	const knownIssue = [
		{
			date: '20 Jan 2022 12:00',
			message: 'Live Chat is currently unavailable.',
		},
	];

	fetchMock.restore().get('/api/known-issues/', { body: knownIssue });

	return (
		<MemoryRouter>
			<HelpCenterContentWrapper>
				<HelpCentre />
			</HelpCenterContentWrapper>
		</MemoryRouter>
	);
};

WithKnownIssue.parameters = {
	chromatic: {
		viewports: [320, 1300],
	},
};
