import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ProductDetail } from '../../shared/productResponse';
import type { OptionalCancellationReasonId } from '../components/mma/cancel/cancellationReason';
import type { DeliveryRecordDetail } from '../components/mma/delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../components/mma/holiday/HolidayStopApi';

interface PrintCancellationState {
	productDetail: ProductDetail | null;
	selectedReasonId: OptionalCancellationReasonId;
	cancellationFeedback: string;
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
}

interface PrintCancellationActions {
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
	resetJourneyState: () => void;
	clearAll: () => void;
}

type PrintCancellationStore = PrintCancellationState & PrintCancellationActions;

const initialJourneyState = {
	selectedReasonId: undefined,
	cancellationFeedback: '',
	caseId: '',
	holidayStops: undefined,
	deliveryCredits: undefined,
};

const initialState: PrintCancellationState = {
	productDetail: null,
	...initialJourneyState,
};

export const usePrintCancellationStore = create<PrintCancellationStore>()(
	devtools(
		(set) => ({
			...initialState,
			setProductDetail: (productDetail) =>
				set({ productDetail }, false, 'setProductDetail'),
			setSelectedReasonId: (selectedReasonId) =>
				set({ selectedReasonId }, false, 'setSelectedReasonId'),
			setCancellationFeedback: (cancellationFeedback) =>
				set({ cancellationFeedback }, false, 'setCancellationFeedback'),
			setCaseData: ({ caseId, holidayStops, deliveryCredits }) =>
				set(
					{ caseId, holidayStops, deliveryCredits },
					false,
					'setCaseData',
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
		{ name: 'PrintCancellationStore' },
	),
);
