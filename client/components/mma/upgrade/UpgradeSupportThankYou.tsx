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
import { formatAmount } from '@/client/utilities/utils';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	parseDate,
} from '../../../../shared/dates';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
} from '../../../styles/ButtonStyles';
import {
	iconListCss,
	whatHappensNextIconCss,
} from '../../../styles/GenericStyles';
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
	const amountPayableToday = formatAmount(routerState?.amountPayableToday);
	const chosenAmount = formatAmount(routerState?.chosenAmount);

	const currency = upgradeSupportContext.mainPlan.currency;
	const previousPrice = formatAmount(
		upgradeSupportContext.mainPlan.price / 100,
	);
	const billingPeriod = upgradeSupportContext.mainPlan.billingPeriod;
	const userEmail = upgradeSupportContext.user?.email ?? '';

	const nextBillingDate = parseDate(
		upgradeSupportContext.mainPlan.chargedThrough ?? undefined,
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);

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
						{previousPrice} to {currency}
						{chosenAmount} per {billingPeriod}.
					</div>
				</Stack>
			</section>
			<section>
				<Stack space={5}>
					<Heading sansSerif>What happens next?</Heading>
					<ul css={[iconListCss, whatHappensNextIconCss]}>
						<li>
							<SvgEnvelope size="medium" />
							<span css={iconTextCss}>Check your email</span>
						</li>
						<p
							css={withMarginParagraphCss}
							data-qm-masking="blocklist"
						>
							You will receive a confirmation email to {userEmail}
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
								<span css={iconTextCss}>Your billing date</span>
							</li>
							<p css={withMarginParagraphCss}>
								From {nextBillingDate}, your ongoing{' '}
								{calculateMonthlyOrAnnualFromBillingPeriod(
									billingPeriod,
								).toLowerCase()}{' '}
								payment will be {currency}
								{chosenAmount}.
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
