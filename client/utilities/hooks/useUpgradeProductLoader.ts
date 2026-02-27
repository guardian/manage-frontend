import * as Sentry from '@sentry/browser';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
	getMainPlan,
	isPaidSubscriptionPlan,
	isProduct,
} from '../../../shared/productResponse';
import { useUpgradeProductStore } from '../../stores/UpgradeProductStore';
import { fetchUpgradePreviewData } from '../productUtils';
import { useAccountDataLoader } from './useAccountDataLoader';

interface LoaderState {
	isLoading: boolean;
	shouldRedirect: boolean;
}

/**
 * Handles populating the UpgradeProductStore when the user deep-links
 * into the upgrade flow with a `subscriptionId` query parameter.
 *
 * Uses `useAccountDataLoader` to get the account data (shared with
 * AccountOverview), avoiding duplicate API calls when navigating from
 * the overview page.
 *
 * If the store already has data (normal navigation from account overview),
 * this hook is a no-op. If the store is empty and a valid `subscriptionId`
 * is present, it triggers account data loading, then extracts subscription
 * details and fetches the upgrade preview. On any failure or missing param,
 * it signals a redirect back to `/`.
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

	const {
		loadAccountData,
		isLoading: isAccountLoading,
		hasError: hasAccountError,
		mdapiResponse,
	} = useAccountDataLoader();

	const [state, setState] = useState<LoaderState>({
		isLoading: !storeHasData && !!subscriptionId,
		shouldRedirect: !storeHasData && !subscriptionId,
	});

	const hasStartedLoading = useRef(false);

	useEffect(() => {
		if (storeHasData || !subscriptionId || hasStartedLoading.current) {
			return;
		}

		if (hasAccountError) {
			setState({ isLoading: false, shouldRedirect: true });
			return;
		}

		if (!mdapiResponse && !isAccountLoading) {
			void loadAccountData();
			return;
		}

		if (isAccountLoading || !mdapiResponse) {
			return;
		}

		hasStartedLoading.current = true;

		const loadUpgradeData = async () => {
			try {
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

				const fetchedMainPlan = getMainPlan(productDetail.subscription);

				if (!isPaidSubscriptionPlan(fetchedMainPlan)) {
					throw new Error('Subscription does not have a paid plan');
				}

				const preview = await fetchUpgradePreviewData({
					subscriptionId,
					isTestUser: productDetail.isTestUser,
				});

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

		void loadUpgradeData();
	}, [
		storeHasData,
		subscriptionId,
		isAccountLoading,
		hasAccountError,
		mdapiResponse,
		loadAccountData,
		setMainPlan,
		setSubscription,
		setPreviewResponse,
	]);

	if (storeHasData) {
		return { isLoading: false, shouldRedirect: false };
	}

	return state;
};
