import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '../../../../../shared/productTypes';
import {
	membershipSupporter,
	toMembersDataApiResponse,
} from '../../../../fixtures/productDetail';
import { CancellationContainer } from '../CancellationContainer';
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
			state: { productDetail: membershipSupporter },
			container: (
				<CancellationContainer productType={PRODUCT_TYPES.membership} />
			),
		},
	},
} as ComponentMeta<typeof CancellationContainer>;

export const ValueOfSupportPage: ComponentStory<typeof ValueOfSupport> = () => {
	return <ValueOfSupport />;
};

export const Switch: ComponentStory<typeof MembershipSwitch> = () => {
	return <MembershipSwitch />;
};

export const LandingPage: ComponentStory<
	typeof MembershipCancellationLanding
> = () => {
	return <MembershipCancellationLanding />;
};

LandingPage.parameters = {
	msw: [
		rest.get('/api/me/mma', (_req, res, ctx) => {
			return res(ctx.json(toMembersDataApiResponse(membershipSupporter)));
		}),
	],
};

export const SwitchOptions: ComponentStory<typeof SaveOptions> = () => {
	return <SaveOptions />;
};

export const Reasons: ComponentStory<typeof SelectReason> = () => {
	return <SelectReason />;
};

export const ContinueMembership: ComponentStory<
	typeof ContinueMembershipConfirmation
> = () => {
	return <ContinueMembershipConfirmation />;
};

export const SwitchCompleteThankYou: ComponentStory<
	typeof SwitchThankYou
> = () => {
	return <SwitchThankYou />;
};
