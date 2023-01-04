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
	Stack,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromInterval } from '../../../../shared/productTypes';
import { Card } from '../shared/Card';
import { Heading } from '../shared/Heading';
import { SupporterPlusBenefitsSection } from '../shared/SupporterPlusBenefits';
import type { SwitchContextInterface } from './SwitchContainer';
import { SwitchContext } from './SwitchContainer';

//TODO: this is copied from AccountOverviewV2, share it
const pageTopCss = css`
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

const buttonCss = css`
	display: flex;

	${until.tablet} {
		justify-content: center;
	}
`;

const SwitchOptions = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;

	const productDetail = switchContext.productDetail;
	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	const monthlyOrAnnual = calculateMonthlyOrAnnualFromInterval(
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

	return (
		<Stack space={3} cssOverrides={pageTopCss}>
			<Heading sansSerif>Your current support</Heading>
			<Card>
				<Card.Header
					backgroundColor={palette.brand[600]}
					headerHeight={0}
				>
					<div css={cardHeaderDivCss}>
						<h3 css={productTitleCss}>{monthlyOrAnnual} support</h3>
						<p css={productSubtitleCss}>
							{mainPlan.currency}
							{currentAmount}/{mainPlan.billingPeriod}
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
			<div css={pageTopCss}>
				<Heading sansSerif>
					{aboveThreshold ? 'Add extras' : 'Change your support'}
				</Heading>
				<p
					css={css`
						${textSans.medium()}
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
									{threshold}/{mainPlan.billingPeriod}
								</p>
							)}
						</div>
					</Card.Header>
					<Card.Section>
						<SupporterPlusBenefitsSection />
					</Card.Section>
				</Card>
			</div>
			<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
				<div css={buttonCss}>
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
				</div>
			</ThemeProvider>
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
		</Stack>
	);
};

export default SwitchOptions;
