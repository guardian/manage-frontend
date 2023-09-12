import { css } from '@emotion/react';
import { headline, space, textSans, until } from '@guardian/source-foundations';
import {
	LinkButton,
	Stack,
	SvgCalendar,
	SvgClock,
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
import {
	iconListCss,
	sectionSpacing,
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
import type { UpgradeRouterState ,
	UpgradeSupportInterface} from './UpgradeSupportContainer';
import {
	UpgradeSupportContext,
} from './UpgradeSupportContainer';
import {
	iconTextCss,
	linkCss,
	withMarginParagraphCss,
} from './UpgradeSupportStyles';

export const UpgradeSupportSwitchThankYou = () => {
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
					<ul css={[iconListCss, whatHappensNextIconCss]}>
						<li>
							<SvgEnvelope size="medium" />
							<span data-qm-masking="blocklist" css={iconTextCss}>
								Check your email
							</span>
						</li>
						<div css={withMarginParagraphCss}>
							You will receive a confirmation email to
							{userEmail}
						</div>
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
							<div css={withMarginParagraphCss}>
								Your first billing date is today and you will be
								charged {currency}
								{amountPayableToday}. From {nextBillingDate},
								your ongoing payment will be {currency}
								{chosenAmount}
							</div>
						</Heading>
						<Heading
							sansSerif
							cssOverrides={css`
								margin-top: ${space[3]}px;
								margin-bottom: ${space[5]}px;
							`}
						>
							<li>
								<SvgClock size="medium" />
								<span css={iconTextCss}>
									Enjoy your new extras
								</span>
							</li>
							<div css={withMarginParagraphCss}>
								To access your exclusive extras on our website
								and app, please sign in. It takes less than a
								minute.
							</div>
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
