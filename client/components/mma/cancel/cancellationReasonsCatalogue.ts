import { shuffleArray } from '@/client/utilities/utils';
import type { CancellationReason } from './cancellationReason';
import { reasonBenefits3, reasonPaymentIssue } from './cancellationReason';
import {
	otherCancellationReason1,
	otherCancellationReason2,
	otherCancellationReason3,
	otherCancellationReason4,
	reasonAutoRenew,
	reasonBenefits1,
	reasonBenefits2,
	reasonBenefits4,
	reasonBenefits5,
	reasonBetterOffer,
	reasonBreakFromNews1,
	reasonBreakFromNews2,
	reasonBreakFromNews3,
	reasonBreakFromNews4,
	reasonCovid,
	reasonDeliveryIssue,
	reasonDontReadEnough1,
	reasonDontReadEnough2,
	reasonDuplicateSubscription,
	reasonEditorial1,
	reasonEditorial2,
	reasonEditorial3,
	reasonFinancialCircumstances1,
	reasonFinancialCircumstances2,
	reasonFinancialCircumstances3,
	reasonFinancialCircumstances4,
	reasonFinancialCircumstances5,
	reasonHealth1,
	reasonHealth2,
	reasonHealth3,
	reasonIssue1,
	reasonIssue2,
	reasonIssue3,
	reasonPriceIncrease1,
	reasonPriceIncrease2,
	reasonRedemptionIssue,
	reasonSharedSubscriptionCancellation,
	reasonSupportAnotherWay1,
	reasonSupportAnotherWay2,
	reasonSupportAnotherWay3,
	reasonSupportAnotherWay4,
	reasonTime1,
	reasonTime2,
	reasonValueForMoney,
	reasonValues1,
	reasonValues2,
	reasonValues3,
} from './cancellationReason';

const shuffleCancellationReasons: (
	reasons: CancellationReason[],
	otherReason: CancellationReason,
) => CancellationReason[] = (
	reasons: CancellationReason[],
	otherReason: CancellationReason,
): CancellationReason[] => {
	return [...(shuffleArray(reasons) as CancellationReason[]), otherReason];
};

const membershipCancellationReasons: CancellationReason[] = [
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

const supporterplusCancellationReasons: CancellationReason[] = [
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

const tierThreeCancellationReasons: CancellationReason[] = [
	reasonValueForMoney,
	reasonBetterOffer,
	reasonCovid,
	reasonEditorial2,
	reasonAutoRenew,
	reasonDeliveryIssue,
	reasonTime1,
	reasonFinancialCircumstances1,
	reasonSupportAnotherWay1,
	reasonHealth1,
	reasonBreakFromNews1,
	reasonValues1,
	reasonSharedSubscriptionCancellation,
];

const voucherCancellationReasons: CancellationReason[] = [
	reasonRedemptionIssue,
	reasonValueForMoney,
	reasonBetterOffer,
	reasonCovid,
	reasonEditorial2,
	reasonDeliveryIssue,
	reasonTime1,
	reasonFinancialCircumstances1,
	reasonSupportAnotherWay1,
	reasonHealth1,
	reasonBreakFromNews1,
	reasonValues1,
	reasonSharedSubscriptionCancellation,
];

const digipackCancellationReasons: CancellationReason[] = [
	reasonValueForMoney,
	reasonBetterOffer,
	reasonEditorial2,
	reasonTime1,
	reasonIssue3,
	reasonFinancialCircumstances1,
	reasonBenefits3,
	reasonSupportAnotherWay1,
	reasonHealth1,
	reasonBreakFromNews4,
	reasonValues1,
	reasonSharedSubscriptionCancellation,
];

const contributionsCancellationReasons: CancellationReason[] = [
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

export const CANCELLATION_REASONS: Record<string, CancellationReason[]> = {
	supporterplus: shuffleCancellationReasons(
		supporterplusCancellationReasons,
		otherCancellationReason2,
	),
	tierThree: shuffleCancellationReasons(
		tierThreeCancellationReasons,
		otherCancellationReason1,
	),
	voucher: shuffleCancellationReasons(
		voucherCancellationReasons,
		otherCancellationReason1,
	),
	digipack: shuffleCancellationReasons(
		digipackCancellationReasons,
		otherCancellationReason1,
	),
	contributions: shuffleCancellationReasons(
		contributionsCancellationReasons,
		otherCancellationReason2,
	),
	membership: shuffleCancellationReasons(
		membershipCancellationReasons,
		otherCancellationReason3,
	),
	printProducts: shuffleCancellationReasons(
		printProductsCancellationReasons,
		otherCancellationReason4,
	),
};
