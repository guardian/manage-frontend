import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import type { ContributionInterval } from '../../accountoverview/contributionUpdateAmountForm';
import { contributionAmountsLookup } from '../../accountoverview/contributionUpdateAmountForm';

export const getIsPayingMinAmount = (mainPlan: PaidSubscriptionPlan) => {
	const currentContributionOptions = (contributionAmountsLookup[
		mainPlan.currencyISO
	] || contributionAmountsLookup.international)[
		mainPlan.interval as ContributionInterval
	];

	return mainPlan.amount / 100 <= currentContributionOptions.minAmount;
};
