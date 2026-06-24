import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../../../.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '../../../../../../shared/productTypes';
import { membershipSupporterCurrencyUSD } from '../../../../../fixtures/productBuilder/testProducts';
import { CancellationContainer } from '../../CancellationContainer';
import { SelectReason } from '../SelectReason';
import { ConfirmMembershipCancellation } from './ConfirmMembershipCancellation';
import { ContinueMembershipConfirmation } from './ContinueMembershipConfirmation';
import { MembershipSwitch } from './MembershipSwitch';
import { SaveOptions } from './SaveOptions';
import { SwitchThankYou } from './SwitchThankYou';
import { ValueOfSupport } from './ValueOfSupport';

const membershipWithSortedReasons = PRODUCT_TYPES.membership;
membershipWithSortedReasons.cancellation!.reasons?.sort((a, b) =>
	a.reasonId.localeCompare(b.reasonId),
);

export default {
	title: 'Pages/MembershipSave',
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

export const SwitchOptions: StoryFn<typeof SaveOptions> = () => {
	return <SaveOptions />;
};

export const Reasons: StoryObj<typeof SelectReason> = {
	render: () => <SelectReason />,

	parameters: {
		reactRouter: {
			state: { productDetail: membershipSupporterCurrencyUSD() },
			container: (
				<CancellationContainer
					productType={membershipWithSortedReasons}
				/>
			),
		},
	},
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
