import { css } from '@emotion/react';
import {
	headlineBold24,
	headlineBold34,
	palette,
	space,
	textSans17,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import {
	LinkButton,
	Stack,
	SvgCalendar,
	SvgEnvelope,
} from '@guardian/source/react-components';
import { useContext } from 'react';
import { useLocation } from 'react-router';
import { formatAmount } from '@/client/utilities/utils';
import { DATE_FNS_LONG_OUTPUT_FORMAT, parseDate } from '@/shared/dates';
import { getBillingPeriodAdjective } from '@/shared/productTypes';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
} from '../../../styles/ButtonStyles';
import {
	iconListCss,
	listWithDividersCss,
	whatHappensNextIconCss,
} from '../../../styles/GenericStyles';
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
import { linkCss } from './UpgradeSupportStyles';

export const UpgradeSupportThankYou = () => {
	const upgradeSupportContext = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const location = useLocation();
	const routerState = location.state as UpgradeRouterState;
	const chosenAmount = routerState?.chosenAmount;

	const currency = upgradeSupportContext.mainPlan.currency;
	const previousPrice = upgradeSupportContext.mainPlan.price / 100;
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
							${headlineBold34};
							${until.tablet} {
								${headlineBold24};
							}
						`}
					>
						Thank you for your continued support.
					</h2>
				</Stack>
				<Stack space={4}>
					<div
						css={css`
							${textSans17};
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
								${textSansBold20};
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
									Your billing date
								</strong>
								<br />
								From {nextBillingDate}, your ongoing{' '}
								{getBillingPeriodAdjective(
									billingPeriod,
								).toLowerCase()}{' '}
								payment will be {currency}
								{formatAmount(chosenAmount)}.
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
