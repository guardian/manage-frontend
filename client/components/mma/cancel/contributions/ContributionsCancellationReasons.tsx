import { shuffleArray } from '@/client/utilities/utils';
import {
	type CancellationReason,
	otherCancellationReason2,
	reasonBenefits4,
	reasonBreakFromNews2,
	reasonDontReadEnough1,
	reasonEditorial1,
	reasonFinancialCircumstances4,
	reasonHealth2,
	reasonIssue2,
	reasonPriceIncrease2,
	reasonSharedSubscriptionCancellation,
	reasonSupportAnotherWay4,
	reasonValues2,
} from '../cancellationReason';

export const contributionsCancellationReasons: CancellationReason[] = [
	reasonEditorial1,
	reasonIssue2,
	reasonFinancialCircumstances4,
	reasonPriceIncrease2,
	reasonDontReadEnough1,
	reasonBenefits4,
	reasonSupportAnotherWay4,
	reasonHealth2,
	reasonBreakFromNews2,
	reasonValues2,
	reasonSharedSubscriptionCancellation,
];

export const shuffledContributionsCancellationReasons: CancellationReason[] = [
	...(shuffleArray(contributionsCancellationReasons) as CancellationReason[]),
	otherCancellationReason2,
];
