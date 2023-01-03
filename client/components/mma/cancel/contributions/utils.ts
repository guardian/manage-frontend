import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import type { ContributionInterval } from '../../accountoverview/ContributionUpdateAmountForm';
import { contributionAmountsLookup } from '../../accountoverview/ContributionUpdateAmountForm';

export const getIsPayingMinAmount = (mainPlan: PaidSubscriptionPlan) => {
	const currentContributionOptions = (contributionAmountsLookup[
		mainPlan.currencyISO
	] || contributionAmountsLookup.international)[
		mainPlan.interval as ContributionInterval
	];

	return mainPlan.price / 100 <= currentContributionOptions.minAmount;
};
