import * as React from 'react';
import type { DeliveryRecordDetail } from '../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../holiday/holidayStopApi';
import type { OptionalCancellationReasonId } from './cancellationReason';

export const CancellationReasonContext: React.Context<OptionalCancellationReasonId> =
	React.createContext(undefined as OptionalCancellationReasonId);

export const CancellationCaseIdContext: React.Context<string> =
	React.createContext('');

export const cancellationEffectiveToday = 'Today';
export const cancellationEffectiveEndOfLastInvoicePeriod =
	'EndOfLastInvoicePeriod';
type OptionalCancellationPolicy = string | undefined;
export const CancellationPolicyContext: React.Context<OptionalCancellationPolicy> =
	React.createContext(undefined as OptionalCancellationPolicy);

type OptionalOutstandingCredits =
	| undefined
	| {
			holidayStops?: OutstandingHolidayStop[];
			deliveryCredits?: DeliveryRecordDetail[];
	  };
export const CancellationOutstandingCreditsContext: React.Context<OptionalOutstandingCredits> =
	React.createContext(undefined as OptionalOutstandingCredits);
