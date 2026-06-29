import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { newslettersV2 } from '@/client/fixtures/newslettersV2';
import { NewsletterOptinSection } from './NewsletterOptinSection';

export default {
	title: 'Components/AccountOverview/NewsletterOptinSection',
	component: NewsletterOptinSection,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof NewsletterOptinSection>;

export const Default: StoryObj<typeof NewsletterOptinSection> = {
	args: {
		activeNewletterIDs: ['4151', '4156'],
	},
	parameters: {
		msw: [
			http.get('/idapi/newsletters/restricted', () => {
				return HttpResponse.json(newslettersV2);
			}),
			http.get('/idapi/user/newsletters', () => {
				return HttpResponse.json(['4151']);
			}),
		],
	},
};
