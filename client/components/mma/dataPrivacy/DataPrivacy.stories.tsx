import type { Meta, StoryObj } from '@storybook/react';
import {http, HttpResponse} from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { consents } from '../../../fixtures/consents';
import { user } from '../../../fixtures/user';
import { DataPrivacy } from './DataPrivacy';

export default {
	title: 'Pages/DataPrivacy',
	component: DataPrivacy,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof DataPrivacy>;

export const Default: StoryObj<typeof DataPrivacy> = {
	render: () => {
		return <DataPrivacy />;
	},

	parameters: {
		msw: [
			http.get('/idapi/consents', () => {
				return HttpResponse.json(consents)
			}),
			http.get('/idapi/user', () => {
				return HttpResponse.json(user)
			}),
		],
	},
};
