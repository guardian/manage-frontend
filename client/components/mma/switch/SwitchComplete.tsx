import { css } from '@emotion/react';
import { from, palette, until } from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
import { useContext } from 'react';
import type {
	PaidSubscriptionPlan} from '../../../../shared/productResponse';
import {
	getMainPlan
} from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
import { sectionSpacing } from '../../../styles/spacing';
import { Heading } from '../shared/Heading';
import type { SwitchContextInterface } from './SwitchContainer';
import { SwitchContext } from './SwitchContainer';

export const SwitchComplete = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;
	const productDetail = switchContext.productDetail;
	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;

	// ToDo: hardcoding this for now; need to find out where to get this from for each currency
	const monthlyThreshold = 10;
	const annualThreshold = 95;
	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		mainPlan.billingPeriod,
	);

	const threshold =
		monthlyOrAnnual == 'Monthly' ? monthlyThreshold : annualThreshold;
	const newAmount = Math.max(threshold, mainPlan.price / 100);

	return (
		<section css={sectionSpacing}>
			<Stack space={3}>
				{!switchContext.isFromApp && (
					<ThankYouMessaging
						mainPlan={mainPlan}
						newAmount={newAmount}
					/>
				)}
			</Stack>
		</section>
	);
};

const extrasStyling = css`
	${from.tablet} {
		color: ${palette.brand['500']};

		::before {
			content: '\\a';
			white-space: pre;
		}
	}
`;

const ThankYouMessaging = (props: {
	mainPlan: PaidSubscriptionPlan;
	newAmount: number;
}) => {
	return (
		<>
			<Heading
				cssOverrides={css`
					${until.mobile} {
						max-width: 350px;
					}
				`}
				noDivider
			>
				Thank you for upgrading to {props.mainPlan.currency}
				{props.newAmount} per {props.mainPlan.billingPeriod}.{' '}
				<span css={extrasStyling}>Enjoy your exclusive extras.</span>
			</Heading>
		</>
	);
};
