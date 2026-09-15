import { shuffleArray } from '@/client/utilities/utils';
import {
	type CancellationReason,
	otherCancellationReason4,
	reasonBenefits5,
	reasonDontReadEnough2,
	reasonDuplicateSubscription,
	reasonEditorial1,
	reasonFinancialCircumstances5,
	reasonIssue1,
	reasonSharedSubscriptionCancellation,
	reasonTime2,
} from './cancellationReason';

const printProductsCancellationReasons: CancellationReason[] = [
	reasonEditorial1,
	reasonTime2,
	reasonDontReadEnough2,
	reasonIssue1,
	reasonFinancialCircumstances5,
	reasonBenefits5,
	reasonDuplicateSubscription,
	reasonSharedSubscriptionCancellation,
];

export const shuffledPrintProductsCancellationReasons: CancellationReason[] = [
	...(shuffleArray(printProductsCancellationReasons) as CancellationReason[]),
	otherCancellationReason4,
];
