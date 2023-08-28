import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Button, LinkButton, Stack } from '@guardian/source-react-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { cancellationFormatDate } from '../../../../../shared/dates';
import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import { getMainPlan } from '../../../../../shared/productResponse';
import { headingCss } from '../../../../styles/GenericStyles';
import { getNewMembershipPrice } from '../../../../utilities/membershipPriceRise';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type { CancellationContextInterface } from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import {
	buttonCentredCss,
	paragraphListCss,
	stackedButtonLeftLayoutCss,
} from './SaveStyles';

export const ContinueMembershipConfirmation = () => {
	const navigate = useNavigate();
	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const membership = cancellationContext.productDetail;

	const mainPlan = getMainPlan(
		membership.subscription,
	) as PaidSubscriptionPlan;

	const newMembershipPriceDisplay = `${
		mainPlan.currency
	}${getNewMembershipPrice(mainPlan)}`;

	return (
		<>
			<ProgressStepper
				steps={[
					{ title: 'Details' },
					{ title: 'Options' },
					{ title: 'Confirmation', isCurrentStep: true },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
					max-width: 350px;
				`}
			/>
			<Stack space={4}>
				<h2 css={headingCss}>Thank you for keeping your Membership</h2>
				<p css={paragraphListCss}>
					The price of your Membership is {newMembershipPriceDisplay}/
					{mainPlan.billingPeriod}.{' '}
					<span>
						Your first billing date will be{' '}
						{cancellationFormatDate(
							mainPlan.chargedThrough ?? undefined,
						)}
						.
					</span>
				</p>
			</Stack>
			<div css={stackedButtonLeftLayoutCss}>
				<Button
					priority="tertiary"
					onClick={() => navigate('/')}
					cssOverrides={buttonCentredCss}
				>
					Back to my account
				</Button>
				<LinkButton
					href="https://theguardian.com"
					cssOverrides={buttonCentredCss}
				>
					Continue to the Guardian
				</LinkButton>
			</div>
		</>
	);
};
