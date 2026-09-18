import { shuffleArray } from '@/client/utilities/utils';
import {
	type CancellationReason,
	otherCancellationReason1,
	reasonBetterOffer,
	reasonBreakFromNews1,
	reasonCovid,
	reasonDeliveryIssue,
	reasonEditorial2,
	reasonFinancialCircumstances1,
	reasonHealth1,
	reasonRedemptionIssue,
	reasonSharedSubscriptionCancellation,
	reasonSupportAnotherWay1,
	reasonTime1,
	reasonValueForMoney,
	reasonValues1,
} from '../cancellationReason';

export const voucherCancellationReasons: CancellationReason[] = [
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

export const shuffledVoucherCancellationReasons: CancellationReason[] = [
	...(shuffleArray(voucherCancellationReasons) as CancellationReason[]),
	otherCancellationReason1,
];
