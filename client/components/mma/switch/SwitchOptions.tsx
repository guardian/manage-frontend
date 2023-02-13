import { css, ThemeProvider } from '@emotion/react';
import { palette, space, textSans, until } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
} from '@guardian/source-react-components';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
import { Card } from '../shared/Card';
import { Heading } from '../shared/Heading';
import { SupporterPlusBenefitsSection } from '../shared/SupporterPlusBenefits';
import type { SwitchContextInterface } from './SwitchContainer';
import { SwitchContext } from './SwitchContainer';
import {
	buttonCentredCss,
	productTitleCss,
	sectionSpacing,
	smallPrintCss,
} from './SwitchStyles';

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

function formatPrice(plan: PaidSubscriptionPlan, amount: number) {
	return (
		<>
			{plan.currency}
			{Number.isInteger(amount) ? amount : amount.toFixed(2)}
		</>
	);
}

export const SwitchOptions = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;

	const productDetail = switchContext.productDetail;
	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		mainPlan.billingPeriod,
	);
	const supporterPlusTitle = `${monthlyOrAnnual} + extras`;

	// ToDo: hardcoding this for now; need to find out where to get this from for each currency
	const monthlyThreshold = 10;
	const annualThreshold = 95;

	const threshold =
		monthlyOrAnnual == 'Monthly' ? monthlyThreshold : annualThreshold;
	const aboveThreshold = mainPlan.price >= threshold * 100;
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
			{switchContext.isFromApp && (
				<div css={sectionSpacing}>
					<h2 css={fromAppHeadingCss}>
						Change your support to unlock unlimited reading in our
						news app
					</h2>
					<p
						css={css`
							${textSans.medium()}
						`}
					>
						To unlock unlimited reading in our news app, please make
						a small change to your support type. If this doesn't
						suit you, no change is needed, but note you will
						continue to have limited app access.
					</p>
				</div>
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
							<h3 css={productTitleCss}>
								{monthlyOrAnnual} support
							</h3>
							<p css={productSubtitleCss}>
								{formatPrice(mainPlan, currentAmount)}/
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
							You're currently supporting the Guardian with a{' '}
							{monthlyOrAnnual.toLowerCase()} contribution of{' '}
							{formatPrice(mainPlan, currentAmount)}.
						</div>
					</Card.Section>
				</Card>
			</section>

			<section css={sectionSpacing}>
				<Stack space={3}>
					<Heading sansSerif>
						{aboveThreshold ? 'Add extras' : 'Change your support'}
					</Heading>
					{!switchContext.isFromApp && (
						<p
							css={css`
								${textSans.medium()}
								margin: 0;
							`}
						>
							Change to {supporterPlusTitle} and get exclusive
							supporter benefits
						</p>
					)}
					<Card>
						<Card.Header backgroundColor={palette.brand[500]}>
							<div css={cardHeaderDivCss}>
								<h3 css={productTitleCss}>
									{supporterPlusTitle}
								</h3>
								{!aboveThreshold && (
									<p css={productSubtitleCss}>
										{formatPrice(mainPlan, threshold)}/
										{mainPlan.billingPeriod}
									</p>
								)}
							</div>
						</Card.Header>
						<Card.Section>
							<SupporterPlusBenefitsSection />
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
						onClick={() => navigate('review')}
					>
						{aboveThreshold
							? 'Add extras with no extra cost'
							: 'Change to monthly + extras'}
					</Button>
				</ThemeProvider>
			</section>

			{aboveThreshold && (
				<section>
					<p css={smallPrintCss}>
						Exclusive supporter extras are unlocked for any monthly
						support of {formatPrice(mainPlan, monthlyThreshold)} or
						above and any annual support of{' '}
						{formatPrice(mainPlan, annualThreshold)} or above.
					</p>
				</section>
			)}
		</>
	);
};
