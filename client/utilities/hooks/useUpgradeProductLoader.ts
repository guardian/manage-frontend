import * as Sentry from '@sentry/browser';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { MembersDataApiResponse } from '../../../shared/productResponse';
import {
	getMainPlan,
	isPaidSubscriptionPlan,
	isProduct,
} from '../../../shared/productResponse';
import type { UpgradePreviewResponse } from '../../../shared/productSwitchTypes';
import { useUpgradeProductStore } from '../../stores/UpgradeProductStore';
import { changePlanFetch } from '../productUtils';

interface LoaderState {
	isLoading: boolean;
	shouldRedirect: boolean;
}

/**
 * Handles populating the UpgradeProductStore when the user deep-links
 * into the upgrade flow with a `subscriptionId` query parameter.
 *
 * If the store already has data (normal navigation from account overview),
 * this hook is a no-op. If the store is empty and a valid `subscriptionId`
 * is present, it fetches the subscription details and upgrade preview,
 * then populates the store. On any failure or missing param, it signals
 * a redirect back to `/`.
 */
export const useUpgradeProductLoader = (): LoaderState => {
	const [searchParams] = useSearchParams();
	const subscriptionId = searchParams.get('subscriptionId');

	const {
		mainPlan,
		subscription,
		setMainPlan,
		setSubscription,
		setPreviewResponse,
	} = useUpgradeProductStore();

	const storeHasData = !!mainPlan && !!subscription;

	const [state, setState] = useState<LoaderState>({
		isLoading: !storeHasData && !!subscriptionId,
		shouldRedirect: !storeHasData && !subscriptionId,
	});

	const hasStartedLoading = useRef(false);

	useEffect(() => {
		if (storeHasData || !subscriptionId || hasStartedLoading.current) {
			return;
		}

		hasStartedLoading.current = true;

		const loadData = async () => {
			try {
				const response = await fetch(`/api/me/mma/${subscriptionId}`, {
					credentials: 'include',
				});

				if (!response.ok) {
					throw new Error(
						`Failed to fetch subscription: ${response.status}`,
					);
				}

				const mdapiResponse =
					(await response.json()) as MembersDataApiResponse;

				const productDetail = mdapiResponse.products
					.filter(isProduct)
					.find(
						(p) => p.subscription.subscriptionId === subscriptionId,
					);

				if (!productDetail) {
					throw new Error(
						'No matching product found for subscriptionId',
					);
				}

				if (productDetail.mmaProductKey !== 'Supporter Plus') {
					throw new Error(
						`Product type "${productDetail.mmaProductKey}" is not eligible for upgrade`,
					);
				}

				const fetchedMainPlan = getMainPlan(productDetail.subscription);

				if (!isPaidSubscriptionPlan(fetchedMainPlan)) {
					throw new Error('Subscription does not have a paid plan');
				}

				const previewResponse = await changePlanFetch({
					subscriptionId,
					isTestUser: productDetail.isTestUser,
					mode: 'switchToBasePrice',
					targetProduct: 'DigitalSubscription',
					preview: true,
				});

				if (!previewResponse.ok) {
					throw new Error(
						`Failed to fetch upgrade preview: ${previewResponse.status}`,
					);
				}

				const preview =
					(await previewResponse.json()) as UpgradePreviewResponse;

				setMainPlan(fetchedMainPlan);
				setSubscription(productDetail.subscription);
				setPreviewResponse(preview);

				setState({ isLoading: false, shouldRedirect: false });
			} catch (error) {
				Sentry.captureException(
					error instanceof Error
						? error
						: new Error(
								'Failed to load upgrade data from deep link',
						  ),
					{ extra: { subscriptionId } },
				);
				setState({ isLoading: false, shouldRedirect: true });
			}
		};

		void loadData();
	}, [
		storeHasData,
		subscriptionId,
		setMainPlan,
		setSubscription,
		setPreviewResponse,
	]);

	if (storeHasData) {
		return { isLoading: false, shouldRedirect: false };
	}

	return state;
};
