import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { type ProductType } from '@/shared/productTypes';
import type { ProductTier } from '../../shared/productResponse';
import {
	getSpecificProductTypeFromProductKey,
	type SubscriptionPlan,
} from '../../shared/productResponse';

interface UpgradeProductState {
	mainPlan: SubscriptionPlan | null;
	specificProductType: ProductType | null;
}

interface UpgradeProductActions {
	setMainPlan: (plan: SubscriptionPlan) => void;
	clearMainPlan: () => void;
}

type UpgradeProductStore = UpgradeProductState & UpgradeProductActions;

const initialState: UpgradeProductState = {
	mainPlan: null,
	specificProductType: null,
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
			clearMainPlan: () =>
				set({ mainPlan: null }, false, 'clearMainPlan'),
		}),
		{ name: 'UpgradeProductStore' },
	),
);
