import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { contributionPaidByCard } from '../../../fixtures/productBuilder/testProducts';
import { UpgradeSupport } from './UpgradeSupport';
import { UpgradeSupportContainer } from './UpgradeSupportContainer';

export default {
	title: 'Pages/UpgradeSupport',
	component: UpgradeSupportContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: {
				productDetail: contributionPaidByCard,
				user: { email: 'test@test.com' },
				container: <UpgradeSupportContainer />,
			},
		},
	},
} as Meta<typeof UpgradeSupportContainer>;

export const UpgradeSupportValue: StoryFn<typeof UpgradeSupport> = () => {
	return <UpgradeSupport />;
};
