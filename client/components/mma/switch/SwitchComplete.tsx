import { css, ThemeProvider } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
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
import { formatAmount } from '../../../utilities/utils';
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
	const supporterPlusTitle = `${monthlyOrAnnual} + extras`;
	const threshold =
		monthlyOrAnnual == 'Monthly' ? monthlyThreshold : annualThreshold;
	const newAmount = Math.max(threshold, mainPlan.price / 100);
	const newAmountAndCurrency = `${mainPlan.currency}${newAmount}`;
	const isUpgrading = mainPlan.price >= threshold * 100;

	const location = useLocation();
	const routerState = location.state as SwitchRouterState;
	const amountPayableToday = routerState?.amountPayableToday;

	if (!amountPayableToday) {
		return <Navigate to=".." />;
	}

	return (
		<>
			{switchContext.isFromApp ? (
				<ThankYouBanner
					newAmount={newAmountAndCurrency}
					newProduct={supporterPlusTitle.toLowerCase()}
					isUpgrading={isUpgrading}
				/>
			) : (
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

const thankYouBannerCss = css`
	margin-top: -1px;
	margin-left: -${space[3]}px;
	margin-right: -${space[3]}px;
	padding: ${space[6]}px ${space[3]}px;
	color: ${palette.neutral[100]};
	background-color: ${palette.brand[500]};

	${from.tablet} {
		margin-left: -${space[5]}px;
		margin-right: -${space[5]}px;
	}

	${from.desktop} {
		margin-top: ${space[9]}px;
		margin-left: 0;
		margin-right: 0;
		padding: ${space[4]}px ${space[4]}px;
	}
`;

const thankYouBannerHeadingCss = css`
	${headline.xsmall({ fontWeight: 'bold' })}
	margin-top: 0;
	margin-bottom: ${space[5]}px;
	max-width: 30ch;
`;

const thankYouBannerSubheadingCss = css`
	${textSans.large({ fontWeight: 'bold' })};
	margin: 0;
	border-top: 1px solid rgba(255, 255, 255, 0.6);
`;

const thankYouBannerCopyCss = css`
	${textSans.medium()};
	margin: 0;
	max-width: 45ch;
`;

const thankYouBannerButtonCss = css`
	margin-top: ${space[6]}px;
	margin-bottom: ${space[5]}px;
	${until.tablet} {
		display: flex;
		flex-direction: column;
	}
`;

const ThankYouBanner = (props: {
	newAmount: string;
	newProduct: string;
	isUpgrading: boolean;
}) => {
	return (
		<section css={thankYouBannerCss}>
			<h2 css={thankYouBannerHeadingCss}>
				Thank you for {props.isUpgrading ? 'upgrading' : 'changing'} to{' '}
				{props.newAmount} {props.newProduct}.
			</h2>
			<p css={thankYouBannerSubheadingCss}>One last step ...</p>
			<div css={thankYouBannerButtonCss}>
				<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
					<LinkButton
						href="x-gu://mma/success"
						cssOverrides={buttonCentredCss}
					>
						Activate full app access now
					</LinkButton>
				</ThemeProvider>
			</div>
			<p css={thankYouBannerCopyCss}>
				If you don’t complete this step, you may be unable to access the
				app in full for up to one hour.
			</p>
		</section>
	);
};

const whatHappensNextCss = css`
	li > svg {
		fill: ${palette.brand[500]};
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
						{formatAmount(props.amountPayableToday)}.
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
			{formatAmount(props.newAmount)} per {props.mainPlan.billingPeriod}.{' '}
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
