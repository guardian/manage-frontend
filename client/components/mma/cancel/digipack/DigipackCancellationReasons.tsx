import { shuffleArray } from '@/client/utilities/utils';
import {
	type CancellationReason,
	otherCancellationReason1,
	reasonBenefits3,
	reasonBetterOffer,
	reasonBreakFromNews4,
	reasonEditorial2,
	reasonFinancialCircumstances1,
	reasonHealth1,
	reasonIssue3,
	reasonSharedSubscriptionCancellation,
	reasonSupportAnotherWay1,
	reasonTime1,
	reasonValueForMoney,
	reasonValues1,
} from '../cancellationReason';

export const digipackCancellationReasons: CancellationReason[] = [
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

export const shuffledDigipackCancellationReasons: CancellationReason[] = [
	...(shuffleArray(digipackCancellationReasons) as CancellationReason[]),
	otherCancellationReason1,
];
