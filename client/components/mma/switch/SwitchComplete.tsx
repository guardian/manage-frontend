import { css, ThemeProvider } from '@emotion/react';
import {
	brand,
	from,
	headline,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	LinkButton,
	Stack,
	SvgClock,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
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
import { buttonCentredCss, iconListCss, sectionSpacing } from './SwitchStyles';

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
		return <Navigate to=".." />;
	}

	return (
		<>
			{switchContext.isFromApp && <AppOnlyThankYou />}
			{!switchContext.isFromApp && (
				<section css={sectionSpacing}>
					<ThankYouMessaging
						mainPlan={mainPlan}
						newAmount={newAmount}
					/>
				</section>
			)}
			<section css={sectionSpacing}>
				<WhatHappensNext
					currency={mainPlan.currency}
					amountPayableToday={amountPayableToday}
					email={switchContext.user?.email ?? ''}
				/>
			</section>
			{!switchContext.isFromApp && (
				<section css={sectionSpacing}>
					<Stack space={6}>
						<SignInBanner />
						<div>
							<LinkButton href="https://www.theguardian.com/">
								Continue reading the Guardian
							</LinkButton>
						</div>
					</Stack>
				</section>
			)}
		</>
	);
};

const buttonContainerCss = css`
	margin-top: ${space[1]}px;
	padding: ${space[5]}px 0;
	${until.tablet} {
		display: flex;
		flex-direction: column;
	}
`;

const appThankYouCss = css`
	background-color: ${brand[500]};
	color: ${palette.neutral[100]};

	${until.tablet} {
		margin-left: -${space[3]}px;
		margin-right: -${space[3]}px;
		padding-left: ${space[3]}px;
		padding-right: ${space[3]}px;
		padding-top: ${space[6]}px;
		padding-bottom: ${space[6]}px;
	}
`;

const AppOnlyThankYou = () => {
	return (
		<div css={appThankYouCss}>
			<h2
				css={css`
					margin-top: 0;
					margin-bottom: ${space[5]}px;
					${headline.xsmall({ fontWeight: 'bold' })}
				`}
			>
				Thank you for upgrading to
			</h2>
			<p
				css={css`
					${textSans.large({ fontWeight: 'bold' })};
					margin: 0;
					border-top: 1px solid rgba(255, 255, 255, 0.6);
				`}
			>
				One last step ...
			</p>
			<section css={buttonContainerCss}>
				<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
					<Button
						cssOverrides={buttonCentredCss}
						onClick={() => alert('app')}
					>
						Activate full app access now
					</Button>
				</ThemeProvider>
			</section>
			<p
				css={css`
					${textSans.medium()};
					margin: 0;
				`}
			>
				If you don’t complete this step, you may be unable to access the
				app in full for up to one hour.
			</p>
		</div>
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
	${textSans.medium({ fontWeight: 'bold' })};
	margin: 0;
`;

const signInParaCss = css`
	${textSans.medium()};
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
