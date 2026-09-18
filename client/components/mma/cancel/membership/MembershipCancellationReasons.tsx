import { shuffleArray } from '@/client/utilities/utils';
import {
	type CancellationReason,
	otherCancellationReason3,
	reasonBenefits2,
	reasonBreakFromNews3,
	reasonEditorial3,
	reasonFinancialCircumstances3,
	reasonHealth3,
	reasonPaymentIssue,
	reasonSharedSubscriptionCancellation,
	reasonSupportAnotherWay3,
	reasonValues3,
} from '../cancellationReason';

export const membershipCancellationReasons: CancellationReason[] = [
	reasonPaymentIssue,
	reasonEditorial3,
	reasonFinancialCircumstances3,
	reasonBenefits2,
	reasonSupportAnotherWay3,
	reasonHealth3,
	reasonBreakFromNews3,
	reasonValues3,
	reasonSharedSubscriptionCancellation,
];

export const shuffledMembershipCancellationReasons: CancellationReason[] = [
	...(shuffleArray(membershipCancellationReasons) as CancellationReason[]),
	otherCancellationReason3,
];
