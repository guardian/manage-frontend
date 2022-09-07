import { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import {
	contributionAmountsLookup,
	ContributionInterval,
} from '../../accountoverview/contributionUpdateAmountForm';

export const getIsPayingMinAmount = (mainPlan: PaidSubscriptionPlan) => {
	const currentContributionOptions = (contributionAmountsLookup[
		mainPlan.currencyISO
	] || contributionAmountsLookup.international)[
		mainPlan.interval as ContributionInterval
	];

	return mainPlan.amount / 100 <= currentContributionOptions.minAmount;
};
