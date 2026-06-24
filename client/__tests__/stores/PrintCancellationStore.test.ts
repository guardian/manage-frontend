import type { ProductDetail } from '@/shared/productResponse';
import { usePrintCancellationStore } from '../../stores/PrintCancellationStore';

const productDetail = {
	subscription: { subscriptionId: 'A-S00000001' },
} as unknown as ProductDetail;

const otherProductDetail = {
	subscription: { subscriptionId: 'A-S00000002' },
} as unknown as ProductDetail;

beforeEach(() => {
	usePrintCancellationStore.getState().clearAll();
});

describe('PrintCancellationStore', () => {
	it('starts in the initial state', () => {
		const state = usePrintCancellationStore.getState();
		expect(state.productDetail).toBeNull();
		expect(state.selectedReasonId).toBeUndefined();
		expect(state.cancellationFeedback).toBe('');
		expect(state.caseId).toBe('');
		expect(state.holidayStops).toBeUndefined();
		expect(state.deliveryCredits).toBeUndefined();
	});

	it('updates journey fields through their setters', () => {
		const {
			setProductDetail,
			setSelectedReasonId,
			setCancellationFeedback,
			setCaseData,
		} = usePrintCancellationStore.getState();

		setProductDetail(productDetail);
		setSelectedReasonId('mma_editorial');
		setCancellationFeedback('Reason text');
		setCaseData({
			caseId: 'caseId-1',
			holidayStops: [{}],
			deliveryCredits: [],
		});

		const state = usePrintCancellationStore.getState();
		expect(state.productDetail).toBe(productDetail);
		expect(state.selectedReasonId).toBe('mma_editorial');
		expect(state.cancellationFeedback).toBe('Reason text');
		expect(state.caseId).toBe('caseId-1');
		expect(state.holidayStops).toEqual([{}]);
		expect(state.deliveryCredits).toEqual([]);
	});

	it('resetJourneyState clears the journey fields but preserves productDetail', () => {
		const {
			setProductDetail,
			setSelectedReasonId,
			setCancellationFeedback,
			setCaseData,
			resetJourneyState,
		} = usePrintCancellationStore.getState();

		setProductDetail(productDetail);
		setSelectedReasonId('mma_editorial');
		setCancellationFeedback('Reason text');
		setCaseData({ caseId: 'caseId-1' });

		resetJourneyState();

		const state = usePrintCancellationStore.getState();
		expect(state.productDetail).toBe(productDetail);
		expect(state.selectedReasonId).toBeUndefined();
		expect(state.cancellationFeedback).toBe('');
		expect(state.caseId).toBe('');
		expect(state.holidayStops).toBeUndefined();
		expect(state.deliveryCredits).toBeUndefined();
	});

	it('clearAll resets every field including productDetail', () => {
		const { setProductDetail, setSelectedReasonId, clearAll } =
			usePrintCancellationStore.getState();

		setProductDetail(otherProductDetail);
		setSelectedReasonId('mma_editorial');

		clearAll();

		const state = usePrintCancellationStore.getState();
		expect(state.productDetail).toBeNull();
		expect(state.selectedReasonId).toBeUndefined();
	});
});
