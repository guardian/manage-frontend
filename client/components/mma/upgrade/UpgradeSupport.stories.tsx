import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { contributionPaidByCard } from '../../../fixtures/productBuilder/testProducts';
import { UpgradeSupport } from './UpgradeSupport';

export default {
	title: 'Pages/UpgradeSupport',
	component: UpgradeSupport,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: {
				productDetail: contributionPaidByCard,
				user: { email: 'test@test.com' },
			},
		},
	},
} as Meta<typeof UpgradeSupport>;

export const UpgradeSupportValue: StoryFn<typeof UpgradeSupport> = () => {
	return <UpgradeSupport />;
};
