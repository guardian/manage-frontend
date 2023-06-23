import { css, ThemeProvider } from '@emotion/react';
import { palette, space, textSans, until } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
} from '@guardian/source-react-components';
import { ErrorSummary } from '@guardian/source-react-components-development-kitchen';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { formatAmount } from '../../../../utilities/utils';
import { supporterPlusSwitchBenefits } from '../../shared/benefits/BenefitsConfiguration';
import { BenefitsSection } from '../../shared/benefits/BenefitsSection';
import { Card } from '../../shared/Card';
import { Heading } from '../../shared/Heading';
import type {
	SwitchContextInterface,
	SwitchRouterState,
} from '../SwitchContainer';
import { SwitchContext } from '../SwitchContainer';
import {
	buttonCentredCss,
	errorSummaryBlockLinkCss,
	errorSummaryLinkCss,
	errorSummaryOverrideCss,
	productTitleCss,
	sectionSpacing,
	smallPrintCss,
} from '../SwitchStyles';

const cardHeaderDivCss = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

const productSubtitleCss = css`
	${textSans.medium({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;
`;

const buttonContainerCss = css`
	margin-top: ${space[1]}px;
	padding: ${space[5]}px 0;
	${until.tablet} {
		display: flex;
		flex-direction: column;
		position: sticky;
		bottom: 0;
		margin-left: -${space[3]}px;
		margin-right: -${space[3]}px;
		padding-left: ${space[3]}px;
		padding-right: ${space[3]}px;
	}
`;

const buttonStuckCss = css`
	${until.tablet} {
		background-color: ${palette.neutral[100]};
		box-shadow: 0px -1px 16px rgba(0, 0, 0, 0.1);
	}
`;

const fromAppHeadingCss = css`
	${textSans.large({ fontWeight: 'bold', lineHeight: 'regular' })}
	color:${palette.brand[500]};
	margin-bottom: 0;
`;

export const SwitchOptions = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;
	const location = useLocation();
	const routerState = location.state as SwitchRouterState;

	const {
		contributionToSwitch,
		mainPlan,
		monthlyOrAnnual,
		supporterPlusTitle,
		thresholds,
	} = switchContext;

	const {
		monthlyThreshold,
		annualThreshold,
		thresholdForBillingPeriod: threshold,
		isAboveThreshold,
	} = thresholds;

	const currentAmount = mainPlan.price / 100;

	const buttonContainerRef = useRef(null);
	const [buttonIsStuck, setButtonIsStuck] = useState(false);

	// Use IntersectionObserver to detect when button is 'stuck' at the bottom
	// of the viewport. The bottom of the observable area is set to -1px so that
	// when the button is stuck it is not considered to be fully visible. The
	// top edge is similarly extended upwards so the button is considered fully
	// visible when scrolling off the top of the screen.

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setButtonIsStuck(entry.intersectionRatio < 1);
			},
			{ threshold: [1], rootMargin: '100px 0px -1px 0px' },
		);

		if (buttonContainerRef.current) {
			observer.observe(buttonContainerRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [buttonContainerRef]);

	const navigate = useNavigate();

	return (
		<>
			{contributionToSwitch.alertText && (
				<section css={sectionSpacing}>
					<ErrorSummary
						cssOverrides={errorSummaryOverrideCss}
						message="There is a problem with your payment method"
						context={
							<>
								Please update your payment details in order to
								change your support.
								<Link
									css={[
										errorSummaryLinkCss,
										errorSummaryBlockLinkCss,
									]}
									to="/payment/contributions"
								>
									Check your payment details
								</Link>
							</>
						}
					/>
				</section>
			)}
			{switchContext.isFromApp && (
				<section css={sectionSpacing}>
					<h2 css={fromAppHeadingCss}>
						{isAboveThreshold
							? 'Add extras to get full access to our news app today'
							: 'Change your support to get full access to our news app today'}
					</h2>
					<p
						css={css`
							${textSans.medium()}
						`}
					>
						{isAboveThreshold
							? 'Your current payment entitles you to exclusive supporter extras. It takes less than a minute to add them.'
							: 'It takes less than a minute to change your support type.'}{' '}
						If this doesn't suit you, no change is needed, but note
						you will have limited access to our app.
					</p>
				</section>
			)}
			<section css={sectionSpacing}>
				<Heading
					sansSerif
					cssOverrides={css`
						margin-bottom: ${space[3]}px;
					`}
				>
					Your current support
				</Heading>
				<Card>
					<Card.Header backgroundColor={palette.brand[600]}>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>{monthlyOrAnnual}</h3>
							<p css={productSubtitleCss}>
								{mainPlan.currency}
								{formatAmount(currentAmount)}/
								{mainPlan.billingPeriod}
							</p>
						</div>
					</Card.Header>
					<Card.Section>
						<div
							css={css`
								${textSans.medium()}
							`}
						>
							You pay {mainPlan.currency}
							{formatAmount(currentAmount)} on a recurring basis
							every {mainPlan.billingPeriod}
						</div>
					</Card.Section>
				</Card>
			</section>

			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>
						{isAboveThreshold
							? 'Add extras'
							: 'Change your support'}
					</Heading>
					{isAboveThreshold && !switchContext.isFromApp && (
						<p
							css={css`
								${textSans.medium()}
								margin: 0;
							`}
						>
							Your current payment entitles you to exclusive
							supporter extras. It takes less than a minute to
							change your support type and gain access.
						</p>
					)}
					{!isAboveThreshold && !switchContext.isFromApp && (
						<p
							css={css`
								${textSans.medium()}
								margin: 0;
							`}
						>
							Unlock exclusive supporter extras when you pay a
							little more
						</p>
					)}
					<Card>
						<Card.Header backgroundColor={palette.brand[500]}>
							<div css={cardHeaderDivCss}>
								<h3 css={productTitleCss}>
									{supporterPlusTitle}
								</h3>
								{!isAboveThreshold && (
									<p css={productSubtitleCss}>
										{mainPlan.currency}
										{formatAmount(threshold)}/
										{mainPlan.billingPeriod}
									</p>
								)}
							</div>
						</Card.Header>
						<Card.Section>
							<BenefitsSection
								benefits={supporterPlusSwitchBenefits}
							/>
						</Card.Section>
					</Card>
				</Stack>
			</section>

			<section
				css={[buttonContainerCss, buttonIsStuck && buttonStuckCss]}
				ref={buttonContainerRef}
			>
				<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
					<Button
						size="small"
						cssOverrides={buttonCentredCss}
						onClick={() =>
							navigate('review', {
								state: routerState,
							})
						}
					>
						{isAboveThreshold
							? 'Add extras'
							: `Upgrade to ${mainPlan.currency}${threshold} per ${mainPlan.billingPeriod}`}
					</Button>
				</ThemeProvider>
			</section>

			<section>
				<p css={smallPrintCss}>
					These extras are exclusively available for supporters who
					give a minimum of {mainPlan.currency}
					{formatAmount(monthlyThreshold)} per month, or{' '}
					{mainPlan.currency}
					{formatAmount(annualThreshold)} per year.
				</p>
			</section>
		</>
	);
};
