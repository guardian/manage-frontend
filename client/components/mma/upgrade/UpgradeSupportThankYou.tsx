import { css } from '@emotion/react';
import { brand, textSans } from '@guardian/source-foundations'; //move import?
import {
	LinkButton,
	Stack,
	SvgCalendar,
	SvgEnvelope,
} from '@guardian/source-react-components';
import { useContext } from 'react';
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
import type { UpgradeSupportInterface } from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';
import {
	headingCSS,
	paragraphCss,
	sectionSpacing,
} from './UpgradeSupportStyles';

export const UpgradeSupportThankYou = () => {
	const upgradeSupportContext = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const billingPeriod = upgradeSupportContext.mainPlan.billingPeriod;

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
						You’ve increased your support from{' '}
						{upgradeSupportContext.mainPlan.currency}
						{upgradeSupportContext.mainPlan.price} per month to{' '}
						{upgradeSupportContext.mainPlan.currency}
						{(upgradeSupportContext.mainPlan.price / 100.0).toFixed(
							2,
						)}{' '}
						per {billingPeriod}.
					</p>
				</Stack>
			</section>
			<section>
				<Stack space={4}>
					<Heading sansSerif>What happens next?</Heading>
					<ul css={[iconListCss, whatHappensNextCss]}>
						<li>
							<SvgEnvelope size="medium" />
							<span
								data-qm-masking="blocklist"
								css={css`
									font-size: 17px;
									font-style: normal;
									font-weight: 700;
									line-height: 130%; /* 22.1px */
									margin-top: 4px;
								`}
							>
								Check your email
							</span>
						</li>
						<p
							css={css`
								margin-left: 36px;
							`}
						>
							You will receive a confirmation email to
							{upgradeSupportContext.user?.user?.email ?? ''}
						</p>
						<Heading sansSerif>
							<li>
								<SvgCalendar size="medium" />
								<span
									css={css`
										font-size: 17px;
										font-style: normal;
										font-weight: 700;
										line-height: 130%; /* 22.1px */
										margin-bottom: 12px;
										margin-top: 4px;
									`}
								>
									Your billing date has changed
								</span>
							</li>
							<p
								css={css`
									font-size: 17px;
									font-style: normal;
									font-weight: 400;
									line-height: 130%; /* 22.1px */
									margin-bottom: 36px;
									margin-top: 2px;
									margin-left: 36px;
								`}
							>
								Your first billing date is today and you will be
								charged{' '}
								{upgradeSupportContext.mainPlan.currency}
								{upgradeSupportContext.mainPlan.price}. From{' '}
								{nextBillingDate}, your ongoing monthly payment
								will be{' '}
								{upgradeSupportContext.mainPlan.currency}
								{
									upgradeSupportContext.subscription
										.nextPaymentPrice
								}{' '}
								{/* add in to fixed and null handling */}
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

				<div
					css={css`
						${textSans.medium()};
						color: ${brand[400]};
						font-style: normal;
						font-weight: 700;
						line-height: 135%; /* 22.95px */
						text-decoration-line: underline;
						margin-left: 20px;
						margin-top: 10px;
					`}
				>
					<a href="/">Back to account overview </a>
				</div>
			</div>
		</>
	);
};
