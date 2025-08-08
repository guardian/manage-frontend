import type { Meta, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { featureSwitches } from '@/shared/featureSwitches';
import {
	mswHandlers,
	setAccountOverviewScenario,
} from '../../../utilities/mocks/mswHandlers';
import { AccountOverview } from './AccountOverview';

featureSwitches['appSubscriptions'] = true;

export default {
	title: 'Pages/AccountOverview',
	component: AccountOverview,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		msw: {
			handlers: mswHandlers,
		},
	},
	beforeEach: () => {
		setAccountOverviewScenario.clear();
	},
} as Meta<typeof AccountOverview>;

export const NoSubscription: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.noSubscription();
	},
};

export const WithSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withSubscriptions();
	},
};

export const WithOnlyObserverSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withOnlyObserverSubscriptions();
	},
};

export const WithUSASubscription: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withUSASubscription();
	},
};

export const WithContributionAndSwitchPossible: StoryObj<
	typeof AccountOverview
> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withContributionAndSwitchPossible();
	},
};

export const WithContributionInPaymentFailure: StoryObj<
	typeof AccountOverview
> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withContributionInPaymentFailure();
	},
};

export const WithContributionAndSwitchNotPossible: StoryObj<
	typeof AccountOverview
> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withContributionAndSwitchNotPossible();
	},
};

export const WithCancelledSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withCancelledSubscriptions();
	},
};

export const WithGiftSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withGiftSubscriptions();
	},
};

export const WithAppSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withAppSubscriptions();
	},
};

export const WithSingleContribution: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withSingleContribution();
	},
};

export const WithSupporterPlusDuringOffer: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withSupporterPlusDuringOffer();
	},
};

export const WithGuardianAdLite: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.withGuardianAdLite();
	},
};

export const MpapiRequestFailure: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},
	beforeEach: () => {
		setAccountOverviewScenario.mpapiRequestFailure();
	},
};
