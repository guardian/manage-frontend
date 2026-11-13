import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ProductDetail } from '../../shared/productResponse';
import type { OptionalCancellationReasonId } from '../components/mma/cancel/cancellationReason';
import type { SelfServeCancellationMode } from '../components/mma/cancel/selfServeCancellation/selfServeCancellationTiming';
import type { DeliveryRecordDetail } from '../components/mma/delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../components/mma/holiday/HolidayStopApi';

interface SelfServeCancellationState {
	productDetail: ProductDetail | null;
	selectedReasonId: OptionalCancellationReasonId;
	cancellationFeedback: string;
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
	cancellationMode: SelfServeCancellationMode | null;
	cancellationEffectiveDate: string | null;
}

interface SelfServeCancellationActions {
	setProductDetail: (productDetail: ProductDetail) => void;
	setSelectedReasonId: (
		selectedReasonId: OptionalCancellationReasonId,
	) => void;
	setCancellationFeedback: (feedback: string) => void;
	setCaseData: (data: {
		caseId: string;
		holidayStops?: OutstandingHolidayStop[];
		deliveryCredits?: DeliveryRecordDetail[];
	}) => void;
	setCancellationTiming: (timing: {
		cancellationMode: SelfServeCancellationMode;
		cancellationEffectiveDate: string | null;
	}) => void;
	resetJourneyState: () => void;
	clearAll: () => void;
}

type SelfServeCancellationStore = SelfServeCancellationState &
	SelfServeCancellationActions;

const initialJourneyState = {
	selectedReasonId: undefined,
	cancellationFeedback: '',
	caseId: '',
	holidayStops: undefined,
	deliveryCredits: undefined,
	cancellationMode: null,
	cancellationEffectiveDate: null,
};

const initialState: SelfServeCancellationState = {
	productDetail: null,
	...initialJourneyState,
};

export const useSelfServeCancellationStore =
	create<SelfServeCancellationStore>()(
		devtools(
			(set) => ({
				...initialState,
				setProductDetail: (productDetail) =>
					set({ productDetail }, false, 'setProductDetail'),
				setSelectedReasonId: (selectedReasonId) =>
					set({ selectedReasonId }, false, 'setSelectedReasonId'),
				setCancellationFeedback: (cancellationFeedback) =>
					set(
						{ cancellationFeedback },
						false,
						'setCancellationFeedback',
					),
				setCaseData: ({ caseId, holidayStops, deliveryCredits }) =>
					set(
						{ caseId, holidayStops, deliveryCredits },
						false,
						'setCaseData',
					),
				setCancellationTiming: ({
					cancellationMode,
					cancellationEffectiveDate,
				}) =>
					set(
						{ cancellationMode, cancellationEffectiveDate },
						false,
						'setCancellationTiming',
					),
				resetJourneyState: () =>
					set(
						{
							...initialJourneyState,
						},
						false,
						'resetJourneyState',
					),
				clearAll: () => set(initialState, false, 'clearAll'),
			}),
			{ name: 'SelfServeCancellationStore' },
		),
	);
