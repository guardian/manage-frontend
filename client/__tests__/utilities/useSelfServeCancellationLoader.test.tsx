import '@testing-library/jest-dom';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ProductDetail } from '@/shared/productResponse';
import type { ProductType } from '@/shared/productTypes';
import { cancellationDateFetcher } from '../../components/mma/cancel/cancellationDateResponse';
import { useAccountStore } from '../../stores/AccountStore';
import { useSelfServeCancellationStore } from '../../stores/SelfServeCancellationStore';
import { useSelfServeCancellationLoader } from '../../utilities/hooks/useSelfServeCancellationLoader';

jest.mock('@sentry/browser', () => ({
	captureException: jest.fn(),
}));

jest.mock('../../components/mma/cancel/cancellationDateResponse', () => ({
	cancellationDateFetcher: jest.fn(),
}));

const mockCancellationDate = (cancellationEffectiveDate: string | null) => {
	(cancellationDateFetcher as jest.Mock).mockImplementation(
		() => async () =>
			({
				ok: true,
				headers: { get: () => null },
				json: async () => ({ cancellationEffectiveDate }),
			} as unknown as Response),
	);
};

const productType = {
	productType: 'guardianweekly',
	allProductsProductTypeFilterString: 'GuardianWeekly',
} as unknown as ProductType;

const productDetail = (subscriptionId: string) =>
	({
		subscription: { subscriptionId },
	} as unknown as ProductDetail);

beforeEach(() => {
	useSelfServeCancellationStore.getState().clearAll();
	useAccountStore.getState().clearAccount();
	mockCancellationDate('2026-06-01');
});

const waitForTiming = async () => {
	await waitFor(() => {
		expect(
			useSelfServeCancellationStore.getState().cancellationMode,
		).not.toBe(null);
	});
};

describe('useSelfServeCancellationLoader', () => {
	it('hydrates the store from routerProductDetail and resets the journey on first entry', async () => {
		const { setSelectedReasonId } =
			useSelfServeCancellationStore.getState();
		// Pretend a previous journey left state behind.
		setSelectedReasonId('mma_editorial');

		const route = productDetail('A-S0001');
		const { result } = renderHook(() =>
			useSelfServeCancellationLoader({
				productType,
				routerProductDetail: route,
			}),
		);

		await waitForTiming();

		expect(result.current).toEqual({
			isLoading: false,
			shouldRedirect: false,
			hasTimingError: false,
			retryTiming: expect.any(Function),
		});
		const state = useSelfServeCancellationStore.getState();
		expect(state.productDetail).toBe(route);
		// Stale journey data was cleared on entry.
		expect(state.selectedReasonId).toBeUndefined();
		expect(state.cancellationMode).toBe('soft');
		expect(state.cancellationEffectiveDate).toBe('2026-06-01');
	});

	it('treats an immediate cancellation date as a hard cancellation', async () => {
		mockCancellationDate('now');
		const route = productDetail('A-S0001');
		renderHook(() =>
			useSelfServeCancellationLoader({
				productType,
				routerProductDetail: route,
			}),
		);

		await waitForTiming();

		const state = useSelfServeCancellationStore.getState();
		expect(state.cancellationMode).toBe('hard');
		expect(state.cancellationEffectiveDate).toBe('now');
	});

	it('does not treat a failed cancellation date as a hard cancellation', async () => {
		(cancellationDateFetcher as jest.Mock).mockImplementation(
			() => async () => {
				throw new Error('cancellation date failed');
			},
		);
		const { result } = renderHook(() =>
			useSelfServeCancellationLoader({
				productType,
				routerProductDetail: productDetail('A-S0001'),
			}),
		);

		await waitFor(() => {
			expect(result.current.hasTimingError).toBe(true);
		});

		expect(
			useSelfServeCancellationStore.getState().cancellationMode,
		).toBeNull();
		expect(result.current.isLoading).toBe(false);

		mockCancellationDate('2026-06-01');
		act(() => {
			result.current.retryTiming();
		});

		await waitForTiming();
		expect(result.current.hasTimingError).toBe(false);
		expect(useSelfServeCancellationStore.getState().cancellationMode).toBe(
			'soft',
		);
	});

	it('does not re-reset journey state on re-render with the same subscription', async () => {
		const route = productDetail('A-S0001');
		const { rerender } = renderHook(
			(props: { routerProductDetail: ProductDetail }) =>
				useSelfServeCancellationLoader({
					productType,
					routerProductDetail: props.routerProductDetail,
				}),
			{
				initialProps: { routerProductDetail: route },
			},
		);

		await waitForTiming();

		// Simulate progress through the journey after initial hydration.
		act(() => {
			useSelfServeCancellationStore
				.getState()
				.setSelectedReasonId('mma_editorial');
		});

		rerender({ routerProductDetail: route });

		expect(useSelfServeCancellationStore.getState().selectedReasonId).toBe(
			'mma_editorial',
		);
	});

	it('resets the journey when the routerProductDetail subscription changes', async () => {
		const initial = productDetail('A-S0001');
		const next = productDetail('A-S0002');

		const { rerender } = renderHook(
			(props: { routerProductDetail: ProductDetail }) =>
				useSelfServeCancellationLoader({
					productType,
					routerProductDetail: props.routerProductDetail,
				}),
			{
				initialProps: { routerProductDetail: initial },
			},
		);

		await waitForTiming();

		act(() => {
			useSelfServeCancellationStore
				.getState()
				.setSelectedReasonId('mma_editorial');
		});

		mockCancellationDate('2026-07-01');
		rerender({ routerProductDetail: next });
		await waitFor(() => {
			expect(
				useSelfServeCancellationStore.getState()
					.cancellationEffectiveDate,
			).toBe('2026-07-01');
		});

		const state = useSelfServeCancellationStore.getState();
		expect(state.productDetail).toBe(next);
		expect(state.selectedReasonId).toBeUndefined();
	});
});
