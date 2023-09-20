import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import type { ContributionInterval } from '../../../../utilities/supportPricing/contributionsAmount';
import { contributionAmountsLookup } from '../../../../utilities/supportPricing/contributionsAmount';

export const getIsPayingMinAmount = (mainPlan: PaidSubscriptionPlan) => {
	const currentContributionOptions = (contributionAmountsLookup[
		mainPlan.currencyISO
	] || contributionAmountsLookup.international)[
		mainPlan.billingPeriod as ContributionInterval
	];

	return mainPlan.price / 100 <= currentContributionOptions.minAmount;
};
