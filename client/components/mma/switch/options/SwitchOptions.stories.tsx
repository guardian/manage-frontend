import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import { contributionPayPal } from '../../../../fixtures/productDetail';
import { SwitchContainer } from '../SwitchContainer';
import { SwitchOptions } from './SwitchOptions';

export default {
	title: 'Pages/SwitchOptions',
	component: SwitchContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: { productDetail: contributionPayPal },
			container: <SwitchContainer />,
		},
	},
} as ComponentMeta<typeof SwitchContainer>;

export const AboveThreshold: ComponentStory<typeof SwitchOptions> = () => (
	<SwitchOptions />
);

export const BelowThreshold: ComponentStory<typeof SwitchOptions> = () => (
	<SwitchOptions />
);

const contributionBelowThreshold = JSON.parse(
	JSON.stringify(contributionPayPal),
);
const plan = contributionBelowThreshold.subscription
	.currentPlans[0] as PaidSubscriptionPlan;
plan.price = 300;

BelowThreshold.parameters = {
	reactRouter: {
		state: { productDetail: contributionBelowThreshold },
	},
};

export const FromApp: ComponentStory<typeof SwitchOptions> = () => (
	<SwitchOptions />
);

FromApp.parameters = {
	reactRouter: {
		container: <SwitchContainer isFromApp={true} />,
		state: { productDetail: contributionBelowThreshold },
	},
};
