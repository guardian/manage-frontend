import * as Sentry from '@sentry/browser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type {
	PaidSubscriptionPlan,
	Subscription,
} from '../../../shared/productResponse';
import { useAccountStore } from '../../stores/AccountStore';
import {
	UpgradePreviewLoadingState,
	useUpgradeProductStore,
} from '../../stores/UpgradeProductStore';
import { changePlanFetch, fetchUpgradePreviewData } from '../productUtils';

interface FetchUpgradePreviewParams {
	subscriptionId: string;
	subscription: Subscription;
	mainPlan: PaidSubscriptionPlan;
	navigationPath: string;
}

export const useUpgradeProduct = () => {
	const navigate = useNavigate();
	const {
		subscription: storeSubscription,
		previewLoadingState,
		previewError,
		setMainPlan,
		setSubscription,
		setPreviewResponse,
		setPreviewLoadingState,
		setPreviewError,
		clearStore,
	} = useUpgradeProductStore();
	const { getIsTestUser } = useAccountStore();

	const [isUpgrading, setIsUpgrading] = useState(false);
	const [upgradeError, setUpgradeError] = useState<string | null>(null);

	const fetchUpgradePreview = async ({
		subscriptionId,
		subscription,
		mainPlan,
		navigationPath,
	}: FetchUpgradePreviewParams) => {
		clearStore();
		setPreviewLoadingState(UpgradePreviewLoadingState.Loading);

		const isTestUser = getIsTestUser();

		try {
			const previewResponse = await fetchUpgradePreviewData({
				subscriptionId,
				isTestUser,
			});

			setMainPlan(mainPlan);
			setSubscription(subscription);
			setPreviewResponse(previewResponse);

			navigate(navigationPath);
		} catch (error) {
			Sentry.captureException(
				error instanceof Error
					? error
					: new Error('Failed to fetch upgrade preview'),
				{
					extra: {
						subscriptionId,
						isTestUser,
					},
				},
			);

			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error';
			setPreviewError(errorMessage);
		}
	};

	const executeUpgrade = async (navigationPath: string) => {
		if (!storeSubscription || isUpgrading) {
			return;
		}

		setIsUpgrading(true);
		setUpgradeError(null);

		const isTestUser = getIsTestUser();

		try {
			const response = await changePlanFetch({
				subscriptionId: storeSubscription.subscriptionId,
				isTestUser,
				mode: 'switchToBasePrice',
				targetProduct: 'DigitalSubscription',
				preview: false,
			});

			if (!response.ok) {
				throw new Error(
					`Failed to upgrade subscription: ${response.status}`,
				);
			}

			navigate(navigationPath);
		} catch (error) {
			Sentry.captureException(
				error instanceof Error
					? error
					: new Error('Failed to upgrade subscription'),
				{
					extra: {
						subscriptionId: storeSubscription.subscriptionId,
						isTestUser,
					},
				},
			);
			setUpgradeError(
				error instanceof Error
					? error.message
					: 'Something went wrong. Please try again.',
			);
			setIsUpgrading(false);
		}
	};

	return {
		fetchUpgradePreview,
		executeUpgrade,
		isPreviewLoading:
			previewLoadingState === UpgradePreviewLoadingState.Loading,
		hasPreviewError:
			previewLoadingState === UpgradePreviewLoadingState.Error,
		previewError,
		isUpgrading,
		upgradeError,
	};
};
