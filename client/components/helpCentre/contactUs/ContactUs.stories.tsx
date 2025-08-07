import type { Meta, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import {
	accountOverviewHandlers,
	setHelpCentreScenario,
} from '../../../utilities/mocks/mswHandlers';
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
		msw: {
			handlers: accountOverviewHandlers,
		},
	},
	beforeEach: () => {
		setHelpCentreScenario.clear();
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
	beforeEach: () => {
		setHelpCentreScenario.default();
	},
};

export const WithKnownIssue: StoryObj<typeof ContactUs> = {
	render: () => {
		const knownIssue = [
			{
				date: '20 Jan 2022 12:00',
				message: 'Live Chat is currently unavailable.',
			},
		];

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
	beforeEach: () => {
		setHelpCentreScenario.withKnownIssues();
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
	beforeEach: () => {
		setHelpCentreScenario.default();
	},
	parameters: {
		reactRouter: {
			location: '/contact-us/billing',
			path: '/contact-us/:urlTopicId',
		},
	},
};
