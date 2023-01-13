import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { useContext } from 'react';
import type {
	PaidSubscriptionPlan} from '../../../../shared/productResponse';
import {
	getMainPlan
} from '../../../../shared/productResponse';
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

const SwitchReview = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;
	const productDetail = switchContext.productDetail;
	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		mainPlan.billingPeriod,
	);
	const supporterPlusTitle = `${monthlyOrAnnual} + extras`;

	return (
		<>
			<section css={sectionSpacing}>
				<Heading
					sansSerif
					cssOverrides={css`
						margin-bottom: ${space[3]}px;
					`}
				>
					Your new support
				</Heading>
				<Card>
					<Card.Header backgroundColor={palette.brand[500]}>
						<h3 css={productTitleCss}>{supporterPlusTitle}</h3>
					</Card.Header>
					<Card.Section>
						<div
							css={css`
								${textSans.medium()}
							`}
						>
							Monthly support with exclusive extras including
							unlimited access to the App
						</div>
						<SupporterPlusBenefitsToggle />
						<div>£10</div>
					</Card.Section>
				</Card>
			</section>
		</>
	);
};

export default SwitchReview;
