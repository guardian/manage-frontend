import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	palette,
	space,
	textSans17,
	textSansBold17,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import {
	LinkButton,
	Stack,
	SvgCalendar,
	SvgClock,
	SvgEnvelope,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import { buttonCentredCss } from '../../../../styles/ButtonStyles';
import {
	iconListCss,
	sectionSpacing,
	whatHappensNextIconCss,
} from '../../../../styles/GenericStyles';
import { formatAmount } from '../../../../utilities/utils';
import { Heading } from '../../shared/Heading';
import type {
	SwitchContextInterface,
	SwitchRouterState,
} from '../SwitchContainer';
import { SwitchContext } from '../SwitchContainer';
import { SwitchSignInImage } from './SwitchSignInImage';

export const SwitchComplete = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;
	const { mainPlan, monthlyOrAnnual, supporterPlusTitle, thresholds } =
		switchContext;

	const { thresholdForBillingPeriod: threshold, isAboveThreshold } =
		thresholds;

	const newAmount = Math.max(threshold, mainPlan.price / 100);
	const newAmountAndCurrency = `${mainPlan.currency}${formatAmount(
		newAmount,
	)}`;

	const location = useLocation();
	const routerState = location.state as SwitchRouterState;
	const amountPayableToday = routerState?.amountPayableToday;
	const nextPaymentDate = routerState?.nextPaymentDate;

	if (amountPayableToday === undefined || !nextPaymentDate) {
		return <Navigate to=".." />;
	}

	return (
		<>
			{switchContext.isFromApp ? (
				<AppThankYouBanner
					newAmount={newAmountAndCurrency}
					newProduct={supporterPlusTitle.toLowerCase()}
					aboveThreshold={isAboveThreshold}
				/>
			) : (
				<section css={sectionSpacing}>
					<ThankYouMessaging
						mainPlan={mainPlan}
						newAmount={newAmount}
						aboveThreshold={isAboveThreshold}
					/>
				</section>
			)}
			<section css={sectionSpacing}>
				<WhatHappensNext
					currency={mainPlan.currency}
					amountPayableToday={amountPayableToday}
					nextPaymentAmount={newAmount}
					billingPeriod={monthlyOrAnnual.toLowerCase()}
					email={switchContext.user?.email ?? ''}
					isFromApp={switchContext.isFromApp}
					nextPaymentDate={nextPaymentDate}
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
	${headlineBold24};
	margin-top: 0;
	margin-bottom: ${space[5]}px;
	max-width: 30ch;
`;

const thankYouBannerSubheadingCss = css`
	${textSansBold20};
	margin: 0;
	border-top: 1px solid rgba(255, 255, 255, 0.6);
`;

const thankYouBannerCopyCss = css`
	${textSans17};
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

const AppThankYouBanner = (props: {
	newAmount: string;
	newProduct: string;
	aboveThreshold: boolean;
}) => {
	return (
		<section css={thankYouBannerCss}>
			<h2 css={thankYouBannerHeadingCss}>
				Thank you for {props.aboveThreshold ? 'changing' : 'upgrading'}{' '}
				to {props.newAmount} {props.newProduct}
			</h2>
			<p css={thankYouBannerSubheadingCss}>One last step ...</p>
			<div css={thankYouBannerButtonCss}>
				<LinkButton
					theme={themeButtonReaderRevenueBrand}
					href="x-gu://mma/success"
					cssOverrides={buttonCentredCss}
				>
					Activate full app access now
				</LinkButton>
			</div>
			<p css={thankYouBannerCopyCss}>
				If you don’t complete this step, you may be unable to access the
				app in full for up to one hour
			</p>
		</section>
	);
};

const WhatHappensNext = (props: {
	currency: string;
	amountPayableToday: number;
	nextPaymentAmount: number;
	billingPeriod: string;
	email: string;
	isFromApp: boolean;
	nextPaymentDate: string;
}) => {
	return (
		<Stack space={4}>
			<Heading sansSerif>What happens next?</Heading>
			<ul css={[iconListCss, whatHappensNextIconCss]}>
				<li>
					<SvgEnvelope size="medium" />
					<span data-qm-masking="blocklist">
						You will receive a confirmation email to {props.email}
					</span>
				</li>
				<li>
					<SvgCalendar size="medium" />
					<span>
						Your first billing date is today and you will be charged{' '}
						{props.currency}
						{formatAmount(props.amountPayableToday)}. From{' '}
						{props.nextPaymentDate}, your ongoing{' '}
						{props.billingPeriod} payment will be {props.currency}
						{formatAmount(props.nextPaymentAmount)}
					</span>
				</li>
				{!props.isFromApp && (
					<li>
						<SvgClock size="medium" />
						<span>
							Your new support will start today. It can take up to
							an hour for your support to be activated
						</span>
					</li>
				)}
			</ul>
		</Stack>
	);
};

const thankYouCss = css`
	${headlineBold24};
	margin-top: 0;
	margin-bottom: 0;

	${from.tablet} {
		${headlineBold28};
		span {
			display: block;
			color: ${palette.brand['500']};
		}
	}
`;

const ThankYouMessaging = (props: {
	mainPlan: PaidSubscriptionPlan;
	newAmount: number;
	aboveThreshold: boolean;
}) => {
	return (
		<h2 css={thankYouCss}>
			{props.aboveThreshold ? (
				<>Thank you for changing your support type.</>
			) : (
				<>
					Thank you for upgrading to {props.mainPlan.currency}
					{formatAmount(props.newAmount)} per{' '}
					{props.mainPlan.billingPeriod}.
				</>
			)}{' '}
			<span>Enjoy your exclusive extras</span>
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
	${textSansBold17};
	margin: 0;
`;

const signInParaCss = css`
	${textSans17};
	margin: 0;
	max-width: 64%;
`;

const SignInBanner = () => (
	<div css={signInCss}>
		<SwitchSignInImage />
		<div css={signInContentContainerCss}>
			<h2 css={signInHeadingCss}>Sign in on all your devices</h2>
			<p css={signInParaCss}>
				To access your exclusive extras on our website and app, please
				sign in. It takes less than a minute.
			</p>
		</div>
	</div>
);
