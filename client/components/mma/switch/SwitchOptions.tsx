import { css, ThemeProvider } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
} from '@guardian/source-react-components';
import { useContext, useEffect, useRef, useState } from 'react';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromInterval } from '../../../../shared/productTypes';
import { Card } from '../shared/Card';
import { Heading } from '../shared/Heading';
import { SupporterPlusBenefitsSection } from '../shared/SupporterPlusBenefits';
import type { SwitchContextInterface } from './SwitchContainer';
import { SwitchContext } from './SwitchContainer';

//TODO: this is copied from AccountOverviewV2, share it
const sectionSpacing = css`
	margin-top: ${space[6]}px;
	${from.tablet} {
		margin-top: ${space[9]}px;
	}
`;

const cardHeaderDivCss = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

const productTitleCss = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;

	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}
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
	${textSans.large({ fontWeight: 'bold' })}
	color:${palette.brand[500]};
	line-height: 1.35;
	border: 0;
	margin-bottom: 0;
`;

const SwitchOptions = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;

	const productDetail = switchContext.productDetail;
	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	const monthlyOrAnnual = calculateMonthlyOrAnnualFromInterval(
		mainPlan.interval,
	);
	const supporterPlusTitle = `${monthlyOrAnnual} + extras`;

	// ToDo: hardcoding this for now; need to find out where to get this from for each currency
	const monthlyThreshold = 10;
	const annualThreshold = 95;

	const threshold =
		monthlyOrAnnual == 'Monthly' ? monthlyThreshold : annualThreshold;
	const aboveThreshold = mainPlan.amount >= threshold * 100;
	const currentAmount = mainPlan.amount / 100;

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
	}, [buttonContainerRef]);

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
						suit you, no change is needed, but note you will continue
						to have limited app access.
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
					<Card.Header
						backgroundColor={palette.brand[600]}
						headerHeight={0}
					>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>
								{monthlyOrAnnual} support
							</h3>
							<p css={productSubtitleCss}>
								{mainPlan.currency}
								{currentAmount}/{mainPlan.interval}
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
							{mainPlan.currency}
							{currentAmount}.
						</div>
					</Card.Section>
				</Card>
			</section>

			<section css={sectionSpacing}>
				<Heading sansSerif>
					{aboveThreshold ? 'Add extras' : 'Change your support'}
				</Heading>
				<p
					css={css`
						${textSans.medium()}
						margin-bottom: ${space[3]}px;
					`}
				>
					Change to {supporterPlusTitle} and get exclusive supporter
					benefits
				</p>
				<Card>
					<Card.Header
						backgroundColor={palette.brand[500]}
						headerHeight={0}
					>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>{supporterPlusTitle}</h3>
							{!aboveThreshold && (
								<p css={productSubtitleCss}>
									{mainPlan.currency}
									{threshold}/{mainPlan.interval}
								</p>
							)}
						</div>
					</Card.Header>
					<Card.Section>
						<SupporterPlusBenefitsSection />
					</Card.Section>
				</Card>
			</section>

			<section
				css={[buttonContainerCss, buttonIsStuck && buttonStuckCss]}
				ref={buttonContainerRef}
			>
				<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
					<Button
						size="small"
						cssOverrides={css`
							justify-content: center;
						`}
					>
						{aboveThreshold
							? 'Add extras with no extra cost'
							: 'Change to monthly + extras'}
					</Button>
				</ThemeProvider>
			</section>

			{aboveThreshold && (
				<p
					css={css`
						color: ${palette.neutral[46]};
					`}
				>
					Exclusive supporter extras are unlocked for any monthly
					support of {mainPlan.currency}
					{monthlyThreshold} or above and any annual support of{' '}
					{mainPlan.currency}
					{annualThreshold} or above.
				</p>
			)}
		</>
	);
};

export default SwitchOptions;
