import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { type ProductType } from '@/shared/productTypes';
import type { ProductTier } from '../../shared/productResponse';
import {
	getSpecificProductTypeFromProductKey,
	type SubscriptionPlan,
} from '../../shared/productResponse';

interface UpgradeAllAccessState {
	mainPlan: SubscriptionPlan | null;
	specificProductType: ProductType | null;
}

interface UpgradeAllAccessActions {
	setMainPlan: (plan: SubscriptionPlan) => void;
	clearMainPlan: () => void;
}

type UpgradeAllAccessStore = UpgradeAllAccessState & UpgradeAllAccessActions;

const initialState: UpgradeAllAccessState = {
	mainPlan: null,
	specificProductType: null,
};

export const useUpgradeAllAccessStore = create<UpgradeAllAccessStore>()(
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
		{ name: 'UpgradeAllAccessStore' },
	),
);
