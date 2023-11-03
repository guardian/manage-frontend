import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '../../../../../shared/productTypes';
import { toMembersDataApiResponse } from '../../../../fixtures/mdapiResponse';
import { membershipSupporterCurrencyUSD } from '../../../../fixtures/productBuilder/testProducts';
import { CancellationContainer } from '../CancellationContainer';
import { ConfirmMembershipCancellation } from './ConfirmMembershipCancellation';
import { ContinueMembershipConfirmation } from './ContinueMembershipConfirmation';
import { MembershipCancellationLanding } from './MembershipCancellationLanding';
import { MembershipSwitch } from './MembershipSwitch';
import { SaveOptions } from './SaveOptions';
import { SelectReason } from './SelectReason';
import { SwitchThankYou } from './SwitchThankYou';
import { ValueOfSupport } from './ValueOfSupport';

export default {
	title: 'Pages/CancellationSave',
	component: CancellationContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: {
				productDetail: membershipSupporterCurrencyUSD(),
				user: { email: 'test@test.com' },
			},
			container: (
				<CancellationContainer productType={PRODUCT_TYPES.membership} />
			),
		},
	},
} as Meta<typeof CancellationContainer>;

export const ValueOfSupportPage: StoryFn<typeof ValueOfSupport> = () => {
	return <ValueOfSupport />;
};

export const SwitchReview: StoryFn<typeof MembershipSwitch> = () => {
	return <MembershipSwitch />;
};

export const LandingPage: StoryObj<typeof MembershipCancellationLanding> = {
	render: () => {
		return <MembershipCancellationLanding />;
	},

	parameters: {
		msw: [
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(
							membershipSupporterCurrencyUSD(),
						),
					),
				);
			}),
		],
	},
};

export const SwitchOptions: StoryFn<typeof SaveOptions> = () => {
	return <SaveOptions />;
};

export const Reasons: StoryFn<typeof SelectReason> = () => {
	return <SelectReason />;
};

export const ContinueMembership: StoryFn<
	typeof ContinueMembershipConfirmation
> = () => {
	return <ContinueMembershipConfirmation />;
};

export const ConfirmCancellation: StoryFn<
	typeof ConfirmMembershipCancellation
> = () => {
	return <ConfirmMembershipCancellation />;
};

export const SwitchCompleteThankYou: StoryFn<typeof SwitchThankYou> = () => {
	return <SwitchThankYou />;
};
