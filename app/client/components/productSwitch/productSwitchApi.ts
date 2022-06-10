import { Context, createContext, Dispatch, SetStateAction } from 'react';

type BillingFrequency = 'Weeks' | 'Months' | 'Years';

interface Currency {
	symbol: string;
	code: string;
}

export interface AvailableProductsResponse {
	id: string;
	name: string;
	billing: {
		amount: number;
		currency: Currency;
		frequency: {
			name: BillingFrequency;
			count: number;
		};
	};
	introOffer: {
		billing: {
			amount: number;
			currency: Currency;
			frequency: {
				name: BillingFrequency;
				count: number;
			};
		};
		duration: {
			name: BillingFrequency;
			count: number;
		};
	};
}

export interface ProductSwitchContextInterface {
	availableProductsToSwitch: AvailableProductsResponse[];
	setAvailableProductsToSwitch: Dispatch<
		SetStateAction<AvailableProductsResponse[]>
	>;
}

export const ProductSwitchContext: Context<ProductSwitchContextInterface | {}> =
	createContext({});
