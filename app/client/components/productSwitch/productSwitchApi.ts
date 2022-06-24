import { Context, createContext, Dispatch, SetStateAction } from 'react';

type BillingFrequency = 'Weeks' | 'Months' | 'Years';

interface Currency {
	symbol: string;
	code: string;
}

export interface Billing {
	amount: number;
	percentage: number;
	currency: Currency;
	frequency: {
		name: BillingFrequency;
		count: number;
	};
	startDate: string;
}

export interface AvailableProductsResponse {
	id: string;
	name: string;
	billing: Billing;
	trial?: {
		duration: {
			name: BillingFrequency;
			count: number;
		};
	};
	introOffer: {
		billing: Billing;
		duration: {
			name: BillingFrequency;
			count: number;
		};
	};
}

export interface ProductSwitchResponse {
	newSubscriptionName: string;
	newProduct: AvailableProductsResponse;
}

export interface ProductSwitchContextInterface {
	availableProductsToSwitch: AvailableProductsResponse[];
	setAvailableProductsToSwitch: Dispatch<
		SetStateAction<AvailableProductsResponse[]>
	>;
	chosenProductIndex: number;
	setChosenProductIndex: Dispatch<SetStateAction<number>>;
	newProductInfo: ProductSwitchResponse;
	setNewProductInfo: Dispatch<SetStateAction<ProductSwitchResponse>>;
}

export const ProductSwitchContext: Context<ProductSwitchContextInterface | {}> =
	createContext({});
