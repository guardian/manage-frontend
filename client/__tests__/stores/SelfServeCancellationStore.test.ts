import type { ProductDetail } from '@/shared/productResponse';
import { useSelfServeCancellationStore } from '../../stores/SelfServeCancellationStore';

const productDetail = {
	subscription: { subscriptionId: 'A-S00000001' },
} as unknown as ProductDetail;

const otherProductDetail = {
	subscription: { subscriptionId: 'A-S00000002' },
} as unknown as ProductDetail;

beforeEach(() => {
	useSelfServeCancellationStore.getState().clearAll();
});

describe('SelfServeCancellationStore', () => {
	it('starts in the initial state', () => {
		const state = useSelfServeCancellationStore.getState();
		expect(state.productDetail).toBeNull();
		expect(state.selectedReasonId).toBeUndefined();
		expect(state.cancellationFeedback).toBe('');
		expect(state.caseId).toBe('');
		expect(state.holidayStops).toBeUndefined();
		expect(state.deliveryCredits).toBeUndefined();
		expect(state.cancellationMode).toBeNull();
		expect(state.cancellationEffectiveDate).toBeNull();
	});

	it('updates journey fields through their setters', () => {
		const {
			setProductDetail,
			setSelectedReasonId,
			setCancellationFeedback,
			setCaseData,
		} = useSelfServeCancellationStore.getState();

		setProductDetail(productDetail);
		setSelectedReasonId('mma_editorial');
		setCancellationFeedback('Reason text');
		setCaseData({
			caseId: 'caseId-1',
			holidayStops: [{}],
			deliveryCredits: [],
		});

		const state = useSelfServeCancellationStore.getState();
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
		} = useSelfServeCancellationStore.getState();

		setProductDetail(productDetail);
		setSelectedReasonId('mma_editorial');
		setCancellationFeedback('Reason text');
		setCaseData({ caseId: 'caseId-1' });

		resetJourneyState();

		const state = useSelfServeCancellationStore.getState();
		expect(state.productDetail).toBe(productDetail);
		expect(state.selectedReasonId).toBeUndefined();
		expect(state.cancellationFeedback).toBe('');
		expect(state.caseId).toBe('');
		expect(state.holidayStops).toBeUndefined();
		expect(state.deliveryCredits).toBeUndefined();
		expect(state.cancellationMode).toBeNull();
		expect(state.cancellationEffectiveDate).toBeNull();
	});

	it('records whether cancellation is immediate or end of period', () => {
		useSelfServeCancellationStore.getState().setCancellationTiming({
			cancellationMode: 'soft',
			cancellationEffectiveDate: '2026-06-01',
		});

		const state = useSelfServeCancellationStore.getState();
		expect(state.cancellationMode).toBe('soft');
		expect(state.cancellationEffectiveDate).toBe('2026-06-01');
	});

	it('clearAll resets every field including productDetail', () => {
		const { setProductDetail, setSelectedReasonId, clearAll } =
			useSelfServeCancellationStore.getState();

		setProductDetail(otherProductDetail);
		setSelectedReasonId('mma_editorial');

		clearAll();

		const state = useSelfServeCancellationStore.getState();
		expect(state.productDetail).toBeNull();
		expect(state.selectedReasonId).toBeUndefined();
	});
});
