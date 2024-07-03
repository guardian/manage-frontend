import type { Meta, StoryFn } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { toMembersDataApiResponse } from '../../../fixtures/mdapiResponse';
import { contributionPaidByCard } from '../../../fixtures/productBuilder/testProducts';
import { productMovePreviewResponse } from '../../../fixtures/productMove';
import { UpgradeSupport } from './UpgradeSupport';
import { UpgradeSupportContainer } from './UpgradeSupportContainer';
import { UpgradeSupportSwitchThankYou } from './UpgradeSupportSwitchThankYou';
import { UpgradeSupportThankYou } from './UpgradeSupportThankYou';

export default {
	title: 'Pages/UpgradeSupport',
	component: UpgradeSupportContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: {
				amountPayableToday: 5.9,
				chosenAmount: 9,
				nextPaymentDate: '20 March',
			},
			container: <UpgradeSupportContainer />,
		},
		msw: [
			http.get('/api/me/mma', () => {
				return HttpResponse.json(toMembersDataApiResponse(contributionPaidByCard()))
			}),
			http.post('/api/product-move/*', () => {
				return HttpResponse.json(productMovePreviewResponse)
			}),
		],
	},
} as Meta<typeof UpgradeSupportContainer>;

export const UpgradeSupportValue: StoryFn<typeof UpgradeSupport> = () => {
	return <UpgradeSupport />;
};

export const UpgradeSupportSwitchThankYouPage: StoryFn<
	typeof UpgradeSupportSwitchThankYou
> = () => {
	return <UpgradeSupportSwitchThankYou />;
};

export const UpgradeSupportThankYouPage: StoryFn<
	typeof UpgradeSupportThankYou
> = () => {
	return <UpgradeSupportThankYou />;
};
