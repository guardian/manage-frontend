import { css } from '@emotion/react';
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
	stackedButtonLeftLayoutCss,
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
	headingCSS,
	iconTextCss,
	linkCss,
	paragraphCss,
	sectionSpacing,
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
	const userEmail = upgradeSupportContext.user?.email;

	const nextBillingDate = parseDate(
		upgradeSupportContext.mainPlan.chargedThrough ?? undefined,
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<h2 css={headingCSS}>
						Thank you for your continued support.
					</h2>
				</Stack>
				<Stack>
					<p css={paragraphCss}>
						You’ve increased your support from {currency}
						{previousPrice} to {currency}
						{chosenAmount} per {billingPeriod}.
					</p>
				</Stack>
			</section>
			<section>
				<Stack space={4}>
					<Heading sansSerif>What happens next?</Heading>
					<ul css={[iconListCss, whatHappensNextCss]}>
						<li>
							<SvgEnvelope size="medium" />
							<span data-qm-masking="blocklist" css={iconTextCss}>
								Check your email
							</span>
						</li>
						<p
							css={css`
								margin-left: 36px;
							`}
						>
							You will receive a confirmation email to
							{userEmail}
						</p>
						<Heading sansSerif>
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
			<div css={stackedButtonLeftLayoutCss}>
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
