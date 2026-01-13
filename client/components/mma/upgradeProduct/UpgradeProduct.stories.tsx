import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { supporterPlus } from '../../../fixtures/productBuilder/testProducts';
import { UpgradeAllAccessConfirmation } from './UpgradeProductConfirmation';
import { UpgradeAllAccessContainer } from './UpgradeProductContainer';
import { UpgradeAllAccessInformation } from './UpgradeProductInformation';
import { UpgradeAllAccessThankYou } from './UpgradeProductThankYou';

export default {
	title: 'Pages/UpgradeProduct',
	component: UpgradeAllAccessContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: {
				productDetail: supporterPlus(),
			},
			container: <UpgradeAllAccessContainer />,
		},
	},
} as Meta<typeof UpgradeAllAccessContainer>;

export const Information: StoryFn<typeof UpgradeAllAccessInformation> = () => {
	return <UpgradeAllAccessInformation />;
};

export const Confirmation: StoryFn<
	typeof UpgradeAllAccessConfirmation
> = () => {
	return <UpgradeAllAccessConfirmation />;
};

export const ThankYou: StoryFn<typeof UpgradeAllAccessThankYou> = () => {
	return <UpgradeAllAccessThankYou />;
};
