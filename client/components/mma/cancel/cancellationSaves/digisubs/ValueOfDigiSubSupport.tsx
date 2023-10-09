import { css } from '@emotion/react';
import { palette, space, textSans, until } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import {
	cardHeaderDivCss,
	cardSectionCss,
	productSubtitleCss,
} from '@/client/components/mma/cancel/cancellationSaves/SaveStyles';
import { Card } from '@/client/components/mma/shared/Card';
import {
	getNewMembershipPrice,
	getOldMembershipPrice,
} from '@/client/utilities/membershipPriceRise';
import type { PaidSubscriptionPlan } from '@/shared/productResponse';
import { getMainPlan } from '@/shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '@/shared/productTypes';
import { dateString } from '../../../../../../shared/dates';
import {
	buttonCentredCss,
	buttonContainerCss,
} from '../../../../../styles/ButtonStyles';
import {
	headingCss,
	productTitleCss,
} from '../../../../../styles/GenericStyles';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from '../../CancellationContainer';
import { CancellationContext } from '../../CancellationContainer';

export const ValueOfDigiSubSupport = () => {
	const navigate = useNavigate();
	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const productDetail = cancellationContext.productDetail;

	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	if (!productDetail) {
		return <Navigate to="/" />;
	}

	const supportStartYear = dateString(
		new Date(productDetail.joinDate),
		'yyyy',
	);

	const membership = cancellationContext.productDetail;

	if (!membership) {
		return <Navigate to="/" />;
	}

	const mainPlan = getMainPlan(
		membership.subscription,
	) as PaidSubscriptionPlan;
	const billingPeriod = mainPlan.billingPeriod;
	const monthlyOrAnnual =
		calculateMonthlyOrAnnualFromBillingPeriod(billingPeriod);

	const oldPriceDisplay = `${mainPlan.currency}${getOldMembershipPrice(
		mainPlan,
	)}`;
	const newPriceDisplay = `${mainPlan.currency}${getNewMembershipPrice(
		mainPlan,
	)}`;

	return (
		<>
			<Stack
				space={4}
				cssOverrides={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			>
				<h1 css={headingCss}>
					Thank you for supporting the Guardian since{' '}
					{supportStartYear}.
					<span>
						Your funding has played a vital role in our progress
					</span>
				</h1>
				<p
					css={css`
						${textSans.medium()}
					`}
				>
					Since you first joined as a Guardian Member, we've lived
					through some of the most important news events of our times.
					Without you, our fearless, independent journalism wouldn't
					have reached millions around the world. We're so grateful.
				</p>
				<p>IMAGE PLACE HOLDER 🥁</p>
				<h2 css={headingCss}>Before you go...</h2>
				<Card>
					<Card.Header backgroundColor={palette.sport[300]}>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>
								Get a 25% discount for 3 months
							</h3>
							<div
								css={css`
									${until.tablet} {
										display: flex;
										flex-direction: column-reverse;
									}
								`}
							>
								<p css={productSubtitleCss}>
									<s>
										{oldPriceDisplay}/{monthlyOrAnnual}
									</s>
									{newPriceDisplay}/{monthlyOrAnnual}
								</p>
							</div>
						</div>
					</Card.Header>
					<Card.Section>
						<section css={[cardSectionCss, buttonContainerCss]}>
							<Button
								cssOverrides={buttonCentredCss}
								size="small"
								onClick={() => navigate('../thank-you')}
							>
								Keep support with discount
							</Button>
						</section>
					</Card.Section>
				</Card>
			</Stack>

			<div>
				<Button
					iconSide="right"
					cssOverrides={buttonCentredCss}
					onClick={() =>
						navigate('../offers', { state: { ...routerState } })
					}
				>
					Continue to cancellation
				</Button>
			</div>
		</>
	);
};
