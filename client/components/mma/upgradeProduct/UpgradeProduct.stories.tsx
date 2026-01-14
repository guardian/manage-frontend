import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { supporterPlus } from '../../../fixtures/productBuilder/testProducts';
import { UpgradeProductConfirmation } from './UpgradeProductConfirmation';
import { UpgradeProductContainer } from './UpgradeProductContainer';
import { UpgradeProductInformation } from './UpgradeProductInformation';
import { UpgradeProductThankYou } from './UpgradeProductThankYou';

export default {
	title: 'Pages/UpgradeProduct',
	component: UpgradeProductContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: {
				productDetail: supporterPlus(),
			},
			container: <UpgradeProductContainer />,
		},
	},
} as Meta<typeof UpgradeProductContainer>;

export const Information: StoryFn<typeof UpgradeProductInformation> = () => {
	return <UpgradeProductInformation />;
};

export const Confirmation: StoryFn<typeof UpgradeProductConfirmation> = () => {
	return <UpgradeProductConfirmation />;
};

export const ThankYou: StoryFn<typeof UpgradeProductThankYou> = () => {
	return <UpgradeProductThankYou />;
};
