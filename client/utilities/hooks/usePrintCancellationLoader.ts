import * as Sentry from '@sentry/browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../../shared/productResponse';
import { isProduct } from '../../../shared/productResponse';
import type { ProductType } from '../../../shared/productTypes';
import type { CancellationDateResponse } from '../../components/mma/cancel/cancellationDateResponse';
import { cancellationDateFetcher } from '../../components/mma/cancel/cancellationDateResponse';
import { cancellationModeFromEffectiveDate } from '../../components/mma/cancel/cancellationPrint/printCancellationTiming';
import { JsonResponseHandler } from '../../components/mma/shared/asyncComponents/DefaultApiResponseHandler';
import { useAccountStore } from '../../stores/AccountStore';
import { usePrintCancellationStore } from '../../stores/PrintCancellationStore';
import { createProductDetailFetcher } from '../productUtils';

const resolveCancellationTiming = async (
	subscriptionId: string,
): Promise<boolean> => {
	const stillCurrent = () =>
		usePrintCancellationStore.getState().productDetail?.subscription
			.subscriptionId === subscriptionId;

	try {
		const response = await cancellationDateFetcher(subscriptionId)();
		const data = (await JsonResponseHandler(
			response,
		)) as CancellationDateResponse | null;
		if (!stillCurrent()) {
			return true;
		}
		const cancellationEffectiveDate =
			data?.cancellationEffectiveDate ?? null;
		usePrintCancellationStore.getState().setCancellationTiming({
			cancellationMode: cancellationModeFromEffectiveDate(
				cancellationEffectiveDate,
			),
			cancellationEffectiveDate,
		});
		return true;
	} catch (error) {
		Sentry.captureException(
			error instanceof Error
				? error
				: new Error('Failed to load print cancellation date'),
			{
				extra: { subscriptionId },
			},
		);
		return !stillCurrent();
	}
};

interface LoaderState {
	isLoading: boolean;
	shouldRedirect: boolean;
	hasTimingError: boolean;
}

interface PrintCancellationLoaderResult extends LoaderState {
	retryTiming: () => void;
}

interface UsePrintCancellationLoaderProps {
	productType: ProductType;
	routerProductDetail?: ProductDetail;
}

export const usePrintCancellationLoader = ({
	productType,
	routerProductDetail,
}: UsePrintCancellationLoaderProps): PrintCancellationLoaderResult => {
	const productDetail = usePrintCancellationStore(
		(state) => state.productDetail,
	);
	const setProductDetail = usePrintCancellationStore(
		(state) => state.setProductDetail,
	);
	const resetJourneyState = usePrintCancellationStore(
		(state) => state.resetJourneyState,
	);
	const cancellationMode = usePrintCancellationStore(
		(state) => state.cancellationMode,
	);
	const { mdapiResponse: accountMdapiResponse, setMdapiResponse } =
		useAccountStore();

	const storeHasProduct = !!productDetail;
	const [state, setState] = useState<LoaderState>({
		isLoading: !storeHasProduct && !routerProductDetail,
		shouldRedirect: false,
		hasTimingError: false,
	});
	const hasStartedLoading = useRef(false);
	const hydratedSubscriptionId = useRef<string | null>(null);

	const loadTiming = useCallback((subscriptionId: string) => {
		setState((current) => ({
			...current,
			hasTimingError: false,
		}));
		void resolveCancellationTiming(subscriptionId).then((loaded) => {
			const currentSubscriptionId =
				usePrintCancellationStore.getState().productDetail?.subscription
					.subscriptionId;
			if (currentSubscriptionId !== subscriptionId) {
				return;
			}
			setState((current) => ({
				...current,
				isLoading: false,
				hasTimingError: !loaded,
			}));
		});
	}, []);

	useEffect(() => {
		if (routerProductDetail) {
			const storeSubscriptionId =
				productDetail?.subscription.subscriptionId;
			const routeSubscriptionId =
				routerProductDetail.subscription.subscriptionId;

			// Reset per entry into the print journey so stale reason/case data
			// from previous attempts is not reused for the same subscription.
			if (hydratedSubscriptionId.current !== routeSubscriptionId) {
				setProductDetail(routerProductDetail);
				resetJourneyState();
				hydratedSubscriptionId.current = routeSubscriptionId;
				loadTiming(routeSubscriptionId);
			} else if (storeSubscriptionId !== routeSubscriptionId) {
				setProductDetail(routerProductDetail);
			}

			return;
		}

		if (storeHasProduct || hasStartedLoading.current) {
			return;
		}

		hasStartedLoading.current = true;

		const loadPrintProduct = async () => {
			try {
				const request = createProductDetailFetcher(
					productType.allProductsProductTypeFilterString,
				);
				const response = await request();
				const mdapiResponse = (await JsonResponseHandler(
					response,
				)) as MembersDataApiResponse;
				if (!accountMdapiResponse) {
					setMdapiResponse(mdapiResponse);
				}

				const activeProducts = mdapiResponse.products
					.filter(isProduct)
					.filter((p) => !p.subscription.cancelledAt);

				if (activeProducts.length !== 1) {
					throw new Error(
						'Print cancellation product resolution failed',
					);
				}

				setProductDetail(activeProducts[0]);
				resetJourneyState();
				hydratedSubscriptionId.current =
					activeProducts[0].subscription.subscriptionId;
				const timingLoaded = await resolveCancellationTiming(
					activeProducts[0].subscription.subscriptionId,
				);
				setState({
					isLoading: false,
					shouldRedirect: false,
					hasTimingError: !timingLoaded,
				});
			} catch (error) {
				Sentry.captureException(
					error instanceof Error
						? error
						: new Error(
								'Failed to load print cancellation product',
						  ),
					{
						extra: {
							productType: productType.productType,
						},
					},
				);
				setState({
					isLoading: false,
					shouldRedirect: true,
					hasTimingError: false,
				});
			}
		};

		void loadPrintProduct();
	}, [
		productType.allProductsProductTypeFilterString,
		productType.productType,
		productDetail,
		routerProductDetail,
		accountMdapiResponse,
		resetJourneyState,
		setMdapiResponse,
		setProductDetail,
		storeHasProduct,
		loadTiming,
	]);

	if (state.shouldRedirect) {
		return {
			isLoading: false,
			shouldRedirect: true,
			hasTimingError: false,
			retryTiming: () => undefined,
		};
	}

	const subscriptionId = productDetail?.subscription.subscriptionId;
	const retryTiming = () => {
		if (subscriptionId) {
			loadTiming(subscriptionId);
		}
	};

	if (state.hasTimingError) {
		return {
			isLoading: false,
			shouldRedirect: false,
			hasTimingError: true,
			retryTiming,
		};
	}

	if (!cancellationMode) {
		return {
			isLoading: true,
			shouldRedirect: false,
			hasTimingError: false,
			retryTiming,
		};
	}

	return {
		isLoading: false,
		shouldRedirect: false,
		hasTimingError: false,
		retryTiming,
	};
};
