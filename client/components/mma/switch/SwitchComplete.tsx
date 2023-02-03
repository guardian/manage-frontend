import { css } from '@emotion/react';
import {
	brand,
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	Stack,
	SvgClock,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
import { InverseStarIcon } from '../shared/assets/InverseStarIcon';
import { Heading } from '../shared/Heading';
import type {
	SwitchContextInterface,
	SwitchRouterState,
} from './SwitchContainer';
import { SwitchContext } from './SwitchContainer';
import { SwitchSignInImage } from './SwitchSignInImage';
import { iconListCss, sectionSpacing } from './SwitchStyles';

export const SwitchComplete = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;
	const productDetail = switchContext.productDetail;
	const navigate = useNavigate();

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
			{!switchContext.isFromApp && (
				<section css={sectionSpacing}>
					<SignInBanner />
					<Button
						css={css`
							margin-top: ${space[6]}px;
						`}
						onClick={() => {
							navigate('https://www.theguardian.com/');
						}}
					>
						Continue to read the Guardian
					</Button>
				</section>
			)}
		</>
	);
};

const whatHappensNextCss = css`
	li > svg {
		fill: ${brand[500]};
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
			<ul css={[iconListCss, whatHappensNextCss]}>
				<li>
					<SvgEnvelope size="medium" />
					<span>
						You will receive a confirmation email to {props.email}
					</span>
				</li>
				<li>
					<SvgClock size="medium" />
					<span>
						Your first billing date is today and you will be charge
						a reduced rate of {props.currency}
						{props.amountPayableToday}.
					</span>
				</li>
				<li>
					<InverseStarIcon size="medium" />
					<span>
						Your new support will start today. It can take up to an
						hour for your support to be activated.
					</span>
				</li>
			</ul>
		</Stack>
	);
};

const thankYouCss = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	margin-top: 0;
	margin-bottom: 0;

	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
		span {
			display: block;
			color: ${palette.brand['500']};
		}
	}
`;

const ThankYouMessaging = (props: {
	mainPlan: PaidSubscriptionPlan;
	newAmount: number;
}) => {
	return (
		<h2 css={thankYouCss}>
			Thank you for upgrading to {props.mainPlan.currency}
			{props.newAmount} per {props.mainPlan.billingPeriod}.{' '}
			<span>Enjoy your exclusive extras.</span>
		</h2>
	);
};

const signInCss = css`
	display: grid;
	overflow: hidden;
	background-color: ${palette.brand[500]};
	border-radius: 8px;
	> * {
		grid-area: 1 / 1;
	}
	> svg {
		place-self: end;
		height: 0;
		min-height: 100%;
	}
	${from.tablet} {
		border-radius: 0;
	}
`;

const signInContentContainerCss = css`
	padding: ${space[3]}px;
	color: ${palette.neutral[100]};
`;

const signInHeadingCss = css`
	${textSans.medium({ fontWeight: 'bold', lineHeight: 'regular' })};
	margin: 0;
`;

const signInParaCss = css`
	${textSans.medium({ lineHeight: 'regular' })};
	margin: 0;
	max-width: 64%;
`;

const SignInBanner = () => (
	<div css={signInCss}>
		<SwitchSignInImage />
		<div css={signInContentContainerCss}>
			<h2 css={signInHeadingCss}>Sign in on all your devices</h2>
			<p css={signInParaCss}>
				To access your extras on all your digital devices, please sign
				in. It takes less than a minute.
			</p>
		</div>
	</div>
);
