import type { DeliveryRecordDetail } from '../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../holiday/holidayStopApi';
import { cancellationEffectiveToday } from './cancellationContexts';

export const generateEscalationCausesList = (_: {
	isEffectiveToday: boolean;
	hasOutstandingHolidayStops: boolean;
	hasOutstandingDeliveryProblemCredits: boolean;
}) => [
	...(_.isEffectiveToday ? ['Requested Effective Today'] : []),
	...(_.hasOutstandingHolidayStops
		? ['Outstanding Holiday Stop Credits']
		: []),
	...(_.hasOutstandingDeliveryProblemCredits
		? ['Outstanding Delivery Problem Credits']
		: []),
];

export const requiresCancellationEscalation = (
	holidayStops: OutstandingHolidayStop[] | undefined,
	deliveryCredits: DeliveryRecordDetail[] | undefined,
	cancellationPolicy: string,
) => {
	const escalationCauses = generateEscalationCausesList({
		isEffectiveToday: cancellationPolicy === cancellationEffectiveToday,
		hasOutstandingHolidayStops: !!holidayStops && holidayStops.length > 0,
		hasOutstandingDeliveryProblemCredits:
			!!deliveryCredits && deliveryCredits.length > 0,
	});

	return escalationCauses.length > 0;
};
