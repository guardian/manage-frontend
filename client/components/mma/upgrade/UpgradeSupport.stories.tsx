import type { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { toMembersDataApiResponse } from '../../../fixtures/mdapiResponse';
import { contributionPaidByCard } from '../../../fixtures/productBuilder/testProducts';
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
				productDetail: contributionPaidByCard(),
				user: { email: 'test@theguardian.com' },
				amountPayableToday: 5.9,
				nextPaymentDate: '20 March',
				chosenAmount: 9,
			},
			container: <UpgradeSupportContainer />,
		},
		msw: [
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(contributionPaidByCard()),
					),
				);
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
