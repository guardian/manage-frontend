import * as Sentry from '@sentry/browser';
import { useEffect, useRef, useState } from 'react';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../../shared/productResponse';
import { isProduct } from '../../../shared/productResponse';
import type { ProductType } from '../../../shared/productTypes';
import { JsonResponseHandler } from '../../components/mma/shared/asyncComponents/DefaultApiResponseHandler';
import { useAccountStore } from '../../stores/AccountStore';
import { usePrintCancellationStore } from '../../stores/PrintCancellationStore';
import { createProductDetailFetcher } from '../productUtils';

interface LoaderState {
	isLoading: boolean;
	shouldRedirect: boolean;
}

interface UsePrintCancellationLoaderProps {
	productType: ProductType;
	routerProductDetail?: ProductDetail;
}

export const usePrintCancellationLoader = ({
	productType,
	routerProductDetail,
}: UsePrintCancellationLoaderProps): LoaderState => {
	const { productDetail, setProductDetail, resetJourneyState } =
		usePrintCancellationStore();
	const { mdapiResponse: accountMdapiResponse, setMdapiResponse } =
		useAccountStore();

	const storeHasProduct = !!productDetail;
	const [state, setState] = useState<LoaderState>({
		isLoading: !storeHasProduct && !routerProductDetail,
		shouldRedirect: false,
	});
	const hasStartedLoading = useRef(false);
	const hydratedSubscriptionId = useRef<string | null>(null);

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
			} else if (storeSubscriptionId !== routeSubscriptionId) {
				setProductDetail(routerProductDetail);
			}

			setState({ isLoading: false, shouldRedirect: false });
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
				setState({ isLoading: false, shouldRedirect: false });
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
				setState({ isLoading: false, shouldRedirect: true });
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
	]);

	if (routerProductDetail || storeHasProduct) {
		return { isLoading: false, shouldRedirect: false };
	}

	return state;
};
