import { css } from '@emotion/react';
import { headline, space, textSans, until } from '@guardian/source-foundations';
import {
	LinkButton,
	Stack,
	SvgCalendar,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { useLocation } from 'react-router';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	parseDate,
} from '../../../../shared/dates';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
} from '../../../styles/ButtonStyles';
import { iconListCss, whatHappensNextCss } from '../../../styles/GenericStyles';
import {
	signInContentContainerCss,
	signInCss,
	signInHeadingCss,
	signInParaCss,
} from '../../shared/SignIn';
import { Heading } from '../shared/Heading';
import { SwitchSignInImage } from '../switch/complete/SwitchSignInImage';
import type {
	UpgradeRouterState,
	UpgradeSupportInterface,
} from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';
import {
	iconTextCss,
	linkCss,
	withMarginParagraphCss,
} from './UpgradeSupportStyles';

export const UpgradeSupportThankYou = () => {
	const upgradeSupportContext = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const location = useLocation();
	const routerState = location.state as UpgradeRouterState;
	const amountPayableToday = routerState?.amountPayableToday.toFixed(2);
	const chosenAmount = routerState?.chosenAmount.toFixed(2);

	const currency = upgradeSupportContext.mainPlan.currency;
	const previousPrice = (upgradeSupportContext.mainPlan.price / 100).toFixed(
		2,
	);
	const billingPeriod = upgradeSupportContext.mainPlan.billingPeriod;
	const userEmail = upgradeSupportContext.user?.email ?? '';

	const nextBillingDate = parseDate(
		upgradeSupportContext.mainPlan.chargedThrough ?? undefined,
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);

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
						You’ve increased your support from {currency}
						{previousPrice} to {currency}
						{chosenAmount} per {billingPeriod}.
					</div>
				</Stack>
			</section>
			<section>
				<Stack space={5}>
					<Heading sansSerif>What happens next?</Heading>
					<ul css={[iconListCss, whatHappensNextCss]}>
						<li>
							<SvgEnvelope size="medium" />
							<span data-qm-masking="blocklist" css={iconTextCss}>
								Check your email
							</span>
						</li>
						<p css={withMarginParagraphCss}>
							You will receive a confirmation email to
							{userEmail}
						</p>
						<Heading
							sansSerif
							cssOverrides={css`
								margin-top: ${space[3]}px;
								margin-bottom: ${space[5]}px;
							`}
						>
							<li>
								<SvgCalendar size="medium" />
								<span css={iconTextCss}>
									Your billing date has changed
								</span>
							</li>
							<p css={withMarginParagraphCss}>
								Your first billing date is today and you will be
								charged {currency}
								{amountPayableToday}. From {nextBillingDate},
								your ongoing monthly payment will be {currency}
								{chosenAmount}{' '}
							</p>
						</Heading>
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
							For the best experience, please sign in on the app
							and web. It takes less than a minute.
						</p>
					</div>
				</div>
			</section>
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
		</>
	);
};
