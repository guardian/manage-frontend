import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import {
	contributionPaidByPayPal,
	contributionPaidByPayPalAboveSupporterPlusThreshold,
} from '../../../../fixtures/productBuilder/testProducts';
import { SwitchContainer } from '../SwitchContainer';
import { SwitchOptions } from './SwitchOptions';

export default {
	title: 'Pages/SwitchOptions',
	component: SwitchContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: {
				productDetail:
					contributionPaidByPayPalAboveSupporterPlusThreshold(),
			},
			container: <SwitchContainer />,
		},
	},
} as Meta<typeof SwitchContainer>;

export const AboveThreshold: StoryFn<typeof SwitchOptions> = () => (
	<SwitchOptions />
);

export const BelowThreshold: StoryObj<typeof SwitchOptions> = {
	render: () => <SwitchOptions />,

	parameters: {
		reactRouter: {
			state: { productDetail: contributionPaidByPayPal() },
		},
	},
};

export const FromApp: StoryObj<typeof SwitchOptions> = {
	render: () => <SwitchOptions />,

	parameters: {
		reactRouter: {
			container: <SwitchContainer isFromApp={true} />,
			state: { productDetail: contributionPaidByPayPal() },
		},
	},
};
