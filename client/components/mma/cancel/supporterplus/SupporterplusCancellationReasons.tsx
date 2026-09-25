import { shuffleArray } from '@/client/utilities/utils';
import {
	type CancellationReason,
	otherCancellationReason2,
	reasonBenefits1,
	reasonBreakFromNews2,
	reasonDontReadEnough1,
	reasonEditorial1,
	reasonFinancialCircumstances2,
	reasonHealth2,
	reasonIssue2,
	reasonPriceIncrease1,
	reasonSharedSubscriptionCancellation,
	reasonSupportAnotherWay2,
	reasonValues2,
} from '../cancellationReason';

export const supporterplusCancellationReasons: CancellationReason[] = [
	reasonEditorial1,
	reasonDontReadEnough1,
	reasonIssue2,
	reasonFinancialCircumstances2,
	reasonPriceIncrease1,
	reasonBenefits1,
	reasonSupportAnotherWay2,
	reasonHealth2,
	reasonBreakFromNews2,
	reasonValues2,
	reasonSharedSubscriptionCancellation,
];

export const shuffledSupporterPlusCancellationReasons: CancellationReason[] = [
	...(shuffleArray(supporterplusCancellationReasons) as CancellationReason[]),
	otherCancellationReason2,
];
