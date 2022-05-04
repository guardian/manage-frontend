import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import fetchMock from 'fetch-mock';

import { SectionContent } from '../sectionContent';
import { SectionHeader } from '../sectionHeader';
import HelpCentreTopic from './helpCentreTopic';

export default {
	title: 'Pages/HelpCentreTopic',
	component: HelpCentreTopic,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof HelpCentreTopic>;

const topicContent = {
	path: 'delivery',
	title: 'Delivery',
	articles: [
		{
			path: 'i-need-to-pause-my-delivery',
			title: 'I need to pause my delivery',
		},
		{
			path: 'my-delivery-is-late-or-missing',
			title: 'My delivery is late or missing',
		},
		{
			path: 'my-paper-is-missing-a-section',
			title: 'My paper is missing a section',
		},
	],
};

export const Default: ComponentStory<typeof HelpCentreTopic> = () => {
	fetchMock
		.restore()
		.get('/api/help-centre/topic/delivery', { body: topicContent });

	return (
		<MemoryRouter initialEntries={["/topic/delivery"]}>
			<Routes>
				<Route path="/topic/:topicCode" element={
					<>
						<SectionHeader title="How can we help you?" pageHasNav={true} />
						<SectionContent hasNav={true}>
							<HelpCentreTopic />
						</SectionContent>
					</>
				} />
			</Routes>
		</MemoryRouter>
	);
};
