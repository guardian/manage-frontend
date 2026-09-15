import { shuffleArray } from '@/client/utilities/utils';
import {
	type CancellationReason,
	otherCancellationReason1,
	reasonAutoRenew,
	reasonBetterOffer,
	reasonBreakFromNews1,
	reasonCovid,
	reasonDeliveryIssue,
	reasonEditorial2,
	reasonFinancialCircumstances1,
	reasonHealth1,
	reasonSharedSubscriptionCancellation,
	reasonSupportAnotherWay1,
	reasonTime1,
	reasonValueForMoney,
	reasonValues1,
} from '../cancellationReason';

export const tierThreeCancellationReasons: CancellationReason[] = [
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

export const shuffledTierThreeCancellationReasons: CancellationReason[] = [
	...(shuffleArray(tierThreeCancellationReasons) as CancellationReason[]),
	otherCancellationReason1,
];
