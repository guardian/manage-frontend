import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { contribution } from '../../../fixtures/productDetail';
import { SwitchContainer } from './SwitchContainer';
import { SwitchOptions } from './SwitchOptions';

export default {
	title: 'Pages/SwitchOptions',
	component: SwitchContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: { productDetail: contribution },
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

const contributionBelowThreshold = JSON.parse(JSON.stringify(contribution));
const plan = contributionBelowThreshold.subscription
	.currentPlans[0] as PaidSubscriptionPlan;
plan.price = 300;

BelowThreshold.parameters = {
	reactRouter: {
		state: { productDetail: contributionBelowThreshold },
	},
};
