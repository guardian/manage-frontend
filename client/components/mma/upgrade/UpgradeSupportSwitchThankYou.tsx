import { css } from '@emotion/react';
import {
	headline,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	LinkButton,
	Stack,
	SvgCalendar,
	SvgClock,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { useLocation } from 'react-router';
import { formatAmount } from '@/client/utilities/utils';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '@/shared/productTypes';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
} from '../../../styles/ButtonStyles';
import {
	iconListCss,
	listWithDividersCss,
	sectionSpacing,
	whatHappensNextIconCss,
} from '../../../styles/GenericStyles';
import { linkCss } from '../../../styles/LinkStyles';
import {
	signInContentContainerCss,
	signInCss,
	signInHeadingCss,
	signInParaCss,
} from '../../shared/SignIn';
import { SwitchSignInImage } from '../switch/complete/SwitchSignInImage';
import type {
	UpgradeRouterState,
	UpgradeSupportInterface,
} from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

export const UpgradeSupportSwitchThankYou = () => {
	const upgradeSupportContext = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const location = useLocation();
	const routerState = location.state as UpgradeRouterState;
	const amountPayableToday = routerState?.amountPayableToday;
	const chosenAmount = routerState?.chosenAmount;
	const nextPaymentDate = routerState?.nextPaymentDate;

	const currency = upgradeSupportContext.mainPlan.currency;
	const previousPrice = upgradeSupportContext.mainPlan.price / 100;
	const billingPeriod = upgradeSupportContext.mainPlan.billingPeriod;
	const userEmail = upgradeSupportContext.user?.email ?? '';

	const increasedText =
		chosenAmount > previousPrice ? 'increased' : 'changed';

	return (
		<>
			<section
				css={css`
					margin-top: ${space[4]}px;
				`}
			>
				<Stack space={4}>
					<h2
						css={css`
							margin: 0;
							${headline.medium({ fontWeight: 'bold' })};
							${until.tablet} {
								${headline.xsmall({ fontWeight: 'bold' })};
							}
						`}
					>
						Thank you for your continued support.
					</h2>
				</Stack>
				<Stack space={4}>
					<div
						css={css`
							${textSans.medium()}
							margin-bottom: 32px;
						`}
					>
						You’ve {increasedText} your support from {currency}
						{formatAmount(previousPrice)} to {currency}
						{formatAmount(chosenAmount)} per {billingPeriod}.
					</div>
				</Stack>
			</section>
			<section
				css={css`
					border-bottom: 1px solid ${palette.neutral[86]};
					padding-bottom: ${space[5]}px;
				`}
			>
				<Stack space={4}>
					<div
						css={css`
							border-top: 1px solid ${palette.neutral[86]};
							padding-bottom: ${space[1]}px;
						`}
					>
						<h3
							css={css`
								${textSans.large({ fontWeight: 'bold' })};
								padding-top: ${space[1]}px;
								margin: 0;
							`}
						>
							What happens next?
						</h3>
					</div>
					<ul
						css={[
							iconListCss,
							listWithDividersCss,
							whatHappensNextIconCss,
						]}
					>
						<li>
							<SvgEnvelope size="medium" />
							<span data-qm-masking="blocklist">
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									Check your email
								</strong>
								<br />
								You will receive a confirmation email to{' '}
								{userEmail}
							</span>
						</li>
						<li>
							<SvgCalendar size="medium" />
							<span>
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									Your billing date has changed
								</strong>
								<br />
								Your first billing date is today and you will be
								charged {currency}
								{formatAmount(amountPayableToday)}. From{' '}
								{nextPaymentDate}, your ongoing{' '}
								{calculateMonthlyOrAnnualFromBillingPeriod(
									billingPeriod,
								).toLowerCase()}{' '}
								payment will be {currency}
								{formatAmount(chosenAmount)}.
							</span>
						</li>
						<li>
							<SvgClock size="medium" />
							<span>
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									Enjoy your new extras
								</strong>
								<br />
								Your new support plan starts today. It may take
								up to an hour for your full app access to become
								available.
							</span>
						</li>
					</ul>
				</Stack>
			</section>
			<section>
				<div css={signInCss}>
					<SwitchSignInImage />
					<div css={signInContentContainerCss}>
						<h2 css={signInHeadingCss}>
							Sign in on all your devices
						</h2>
						<p css={signInParaCss}>
							To access your extras on all your digital devices,
							please sign in. It takes less than a minute.
						</p>
					</div>
				</div>
			</section>
			<section css={sectionSpacing}>
				<div css={stackedButtonLayoutCss}>
					<LinkButton
						href="https://theguardian.com"
						cssOverrides={buttonCentredCss}
					>
						Continue to the Guardian
					</LinkButton>
					<div css={linkCss}>
						<a href="/">Back to account overview </a>
					</div>
				</div>
			</section>
		</>
	);
};
