import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { type ProductType } from '@/shared/productTypes';
import type { ProductTier, Subscription } from '../../shared/productResponse';
import {
	getSpecificProductTypeFromProductKey,
	type PaidSubscriptionPlan,
} from '../../shared/productResponse';
import type { UpgradePreviewResponse } from '../../shared/productSwitchTypes';

export enum UpgradePreviewLoadingState {
	NotStarted = 'NotStarted',
	Loading = 'Loading',
	Loaded = 'Loaded',
	Error = 'Error',
}

interface UpgradeProductState {
	mainPlan: PaidSubscriptionPlan | null;
	specificProductType: ProductType | null;
	subscription: Subscription | null;
	previewResponse: UpgradePreviewResponse | null;
	previewLoadingState: UpgradePreviewLoadingState;
	previewError: string | null;
}

interface UpgradeProductActions {
	setMainPlan: (plan: PaidSubscriptionPlan) => void;
	setSubscription: (subscription: Subscription) => void;
	setPreviewResponse: (response: UpgradePreviewResponse) => void;
	setPreviewLoadingState: (state: UpgradePreviewLoadingState) => void;
	setPreviewError: (error: string | null) => void;
	clearStore: () => void;
}

type UpgradeProductStore = UpgradeProductState & UpgradeProductActions;

const initialState: UpgradeProductState = {
	mainPlan: null,
	specificProductType: null,
	subscription: null,
	previewResponse: null,
	previewLoadingState: UpgradePreviewLoadingState.NotStarted,
	previewError: null,
};

export const useUpgradeProductStore = create<UpgradeProductStore>()(
	devtools(
		(set) => ({
			...initialState,
			setMainPlan: (plan) => {
				const specificProductType =
					getSpecificProductTypeFromProductKey(
						plan.mmaProductKey as ProductTier,
					);

				set(
					{ mainPlan: plan, specificProductType },
					false,
					'setMainPlan',
				);
			},
			setSubscription: (subscription) =>
				set({ subscription }, false, 'setSubscription'),
			setPreviewResponse: (response) =>
				set(
					{
						previewResponse: response,
						previewLoadingState: UpgradePreviewLoadingState.Loaded,
						previewError: null,
					},
					false,
					'setPreviewResponse',
				),
			setPreviewLoadingState: (state) =>
				set(
					{ previewLoadingState: state },
					false,
					'setPreviewLoadingState',
				),
			setPreviewError: (error) =>
				set(
					{
						previewError: error,
						previewLoadingState: UpgradePreviewLoadingState.Error,
					},
					false,
					'setPreviewError',
				),
			clearStore: () => set(initialState, false, 'clearMainPlan'),
		}),
		{ name: 'UpgradeProductStore' },
	),
);
