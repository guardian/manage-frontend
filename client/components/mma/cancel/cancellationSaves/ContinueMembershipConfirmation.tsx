import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { cancellationFormatDate } from '../../../../../shared/dates';
import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import { getMainPlan } from '../../../../../shared/productResponse';
import { getNewMembershipPrice } from '../../../../utilities/membershipPriceRise';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import type { CancellationContextInterface } from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import {
	buttonCentredCss,
	headingCss,
	paragraphListCss,
	stackedButtonLayoutCss,
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
			<ProgressIndicator
				steps={[
					{ title: '' },
					{ title: '' },
					{ title: 'Confirmation', isCurrentStep: true },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<Stack space={4}>
				<h2 css={headingCss}>Thank you for keeping your Membership</h2>
				<p css={paragraphListCss}>
					The new price of your Membership is{' '}
					{newMembershipPriceDisplay}/{mainPlan.billingPeriod}.{' '}
					<span>
						Your first billing date will be{' '}
						{cancellationFormatDate(
							mainPlan.chargedThrough ?? undefined,
						)}
						.
					</span>
				</p>
			</Stack>
			<div css={stackedButtonLayoutCss}>
				<Button
					priority="tertiary"
					onClick={() => navigate('/')}
					cssOverrides={buttonCentredCss}
				>
					Back to account overview
				</Button>
				<Button
					onClick={() => navigate('https://www.theguardian.com')}
					cssOverrides={buttonCentredCss}
				>
					Continue to the Guardian
				</Button>
			</div>
		</>
	);
};
