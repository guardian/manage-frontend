import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import type { ProductDetail } from '@/shared/productResponse';
import type { ProductType } from '@/shared/productTypes';
import { useAccountStore } from '../../stores/AccountStore';
import { usePrintCancellationStore } from '../../stores/PrintCancellationStore';
import { usePrintCancellationLoader } from '../../utilities/hooks/usePrintCancellationLoader';

jest.mock('@sentry/browser', () => ({
	captureException: jest.fn(),
}));

const productType = {
	productType: 'guardianweekly',
	allProductsProductTypeFilterString: 'GuardianWeekly',
} as unknown as ProductType;

const productDetail = (subscriptionId: string) =>
	({
		subscription: { subscriptionId },
	} as unknown as ProductDetail);

beforeEach(() => {
	usePrintCancellationStore.getState().clearAll();
	useAccountStore.getState().clearAccount();
});

describe('usePrintCancellationLoader', () => {
	it('hydrates the print store from routerProductDetail and resets the journey on first entry', () => {
		const { setSelectedReasonId } = usePrintCancellationStore.getState();
		// Pretend a previous journey left state behind.
		setSelectedReasonId('mma_editorial');

		const route = productDetail('A-S0001');
		const { result } = renderHook(() =>
			usePrintCancellationLoader({
				productType,
				routerProductDetail: route,
			}),
		);

		expect(result.current).toEqual({
			isLoading: false,
			shouldRedirect: false,
		});
		const state = usePrintCancellationStore.getState();
		expect(state.productDetail).toBe(route);
		// Stale journey data was cleared on entry.
		expect(state.selectedReasonId).toBeUndefined();
	});

	it('does not re-reset journey state on re-render with the same subscription', () => {
		const route = productDetail('A-S0001');
		const { rerender } = renderHook(
			(props: { routerProductDetail: ProductDetail }) =>
				usePrintCancellationLoader({
					productType,
					routerProductDetail: props.routerProductDetail,
				}),
			{
				initialProps: { routerProductDetail: route },
			},
		);

		// Simulate progress through the journey after initial hydration.
		act(() => {
			usePrintCancellationStore
				.getState()
				.setSelectedReasonId('mma_editorial');
		});

		rerender({ routerProductDetail: route });

		expect(usePrintCancellationStore.getState().selectedReasonId).toBe(
			'mma_editorial',
		);
	});

	it('resets the journey when the routerProductDetail subscription changes', () => {
		const initial = productDetail('A-S0001');
		const next = productDetail('A-S0002');

		const { rerender } = renderHook(
			(props: { routerProductDetail: ProductDetail }) =>
				usePrintCancellationLoader({
					productType,
					routerProductDetail: props.routerProductDetail,
				}),
			{
				initialProps: { routerProductDetail: initial },
			},
		);

		act(() => {
			usePrintCancellationStore
				.getState()
				.setSelectedReasonId('mma_editorial');
		});

		rerender({ routerProductDetail: next });

		const state = usePrintCancellationStore.getState();
		expect(state.productDetail).toBe(next);
		expect(state.selectedReasonId).toBeUndefined();
	});
});
