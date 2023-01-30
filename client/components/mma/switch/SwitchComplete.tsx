import { css } from '@emotion/react';
import {
	brand,
	from,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Stack,
	SvgClock,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
import { sectionSpacing } from '../../../styles/spacing';
import { InverseStarIcon } from '../shared/assets/InverseStarIcon';
import { Heading } from '../shared/Heading';
import type {
	SwitchContextInterface,
	SwitchRouterState,
} from './SwitchContainer';
import { SwitchContext } from './SwitchContainer';

export const SwitchComplete = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;
	const productDetail = switchContext.productDetail;
	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	// ToDo: hardcoding this for now; need to find out where to get this from for each currency
	const monthlyThreshold = 10;
	const annualThreshold = 95;
	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		mainPlan.billingPeriod,
	);

	const threshold =
		monthlyOrAnnual == 'Monthly' ? monthlyThreshold : annualThreshold;
	const newAmount = Math.max(threshold, mainPlan.price / 100);

	const location = useLocation();
	const routerState = location.state as SwitchRouterState;
	const amountPayableToday = routerState?.amountPayableToday;

	if (!amountPayableToday) {
		return <Navigate to="/switch" />;
	}

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={3}>
					{!switchContext.isFromApp && (
						<ThankYouMessaging
							mainPlan={mainPlan}
							newAmount={newAmount}
						/>
					)}
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<WhatHappensNext
					currency={mainPlan.currency}
					amountPayableToday={amountPayableToday}
					email={switchContext.user?.email ?? ''}
				/>
			</section>
		</>
	);
};

const extrasStyling = css`
	${from.tablet} {
		color: ${palette.brand['500']};

		::before {
			content: '\\a';
			white-space: pre;
		}
	}
`;

const whatHappensNextTextCss = css`
	width: 100%;
	margin-left: 0.5rem;

	p {
		${textSans.medium()}
		margin-top: 0;
		margin-bottom: ${space[2]}px;
	}
`;

const WhatHappensNext = (props: {
	currency: string;
	amountPayableToday: number;
	email: string;
}) => {
	return (
		<Stack space={4}>
			<Heading sansSerif>What happens next?</Heading>
			<div
				css={css`
					svg {
						fill: ${brand[500]};
						flex-shrink: 0;
					}
				`}
			>
				<div
					css={css`
						display: flex;
						align-items: start;
					`}
				>
					<SvgEnvelope size="medium" />
					<div css={whatHappensNextTextCss}>
						<p>
							You will receive a confirmation email to{' '}
							{props.email}
						</p>
					</div>
				</div>
				<div
					css={css`
						display: flex;
						align-items: start;
					`}
				>
					<SvgClock size="medium" />
					<div css={whatHappensNextTextCss}>
						<p>
							Your first billing date is today and you will be
							charge a reduced rate of {props.currency}
							{props.amountPayableToday}.
						</p>
					</div>
				</div>
				<div
					css={css`
						display: flex;
						align-items: start;
					`}
				>
					<InverseStarIcon size="medium" />
					<div css={whatHappensNextTextCss}>
						<p>
							Your new support will start today. It can take up to
							an hour for your support to be activated.
						</p>
					</div>
				</div>
			</div>
		</Stack>
	);
};

const ThankYouMessaging = (props: {
	mainPlan: PaidSubscriptionPlan;
	newAmount: number;
}) => {
	return (
		<>
			<Heading
				cssOverrides={css`
					${until.mobile} {
						max-width: 350px;
					}
				`}
				noDivider
			>
				Thank you for upgrading to {props.mainPlan.currency}
				{props.newAmount} per {props.mainPlan.billingPeriod}.{' '}
				<span css={extrasStyling}>Enjoy your exclusive extras.</span>
			</Heading>
		</>
	);
};
