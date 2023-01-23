import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
import { useContext } from 'react';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
import { sectionSpacing } from '../../../styles/spacing';
import { Card } from '../shared/Card';
import { Heading } from '../shared/Heading';
import { SupporterPlusBenefitsToggle } from '../shared/SupporterPlusBenefits';
import type { SwitchContextInterface } from './SwitchContainer';
import { SwitchContext } from './SwitchContainer';

// TODO: this is copied from SwitchOptions, share it
const productTitleCss = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;
	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}
`;

export const SwitchReview = () => {
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

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<section>
						<Heading sansSerif>Review change</Heading>
						<p
							css={css`
								${textSans.medium()};
							`}
						>
							You will now support us with {mainPlan.currency}
							{threshold} every {mainPlan.billingPeriod}, giving
							you exclusive supporter extras, including unlimited
							reading in our news app
						</p>
					</section>
					<Heading sansSerif>Your new support</Heading>
					<Card>
						<Card.Header backgroundColor={palette.brand[500]}>
							<h3 css={productTitleCss}>{supporterPlusTitle}</h3>
						</Card.Header>
						<Card.Section>
							<p
								css={css`
									${textSans.medium()};
									margin: 0;
									max-width: 40ch;
								`}
							>
								{monthlyOrAnnual} support with exclusive extras
								including unlimited access to the App
							</p>
							<SupporterPlusBenefitsToggle />
							<p
								css={css`
									${textSans.medium({ fontWeight: 'bold' })};
									padding-top: ${space[3]}px;
									margin-top: ${space[4]}px;
									margin-bottom: 0;
									border-top: 1px solid ${palette.neutral[86]};
								`}
							>
								{mainPlan.currency}
								{threshold}/{mainPlan.billingPeriod}
							</p>
						</Card.Section>
					</Card>
				</Stack>
			</section>
		</>
	);
};
