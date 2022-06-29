import { Context, createContext } from 'react';
import { ProductType } from '../../../shared/productTypes';

type BillingFrequency = 'Weeks' | 'Months' | 'Years';

interface Currency {
	symbol: string;
	code: string;
}

export interface Billing {
	amount: number;
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
		dayCount: number;
	};
	introOffer?: {
		billing: Billing & {
			amount?: number;
			percentage?: number;
		};
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
	productType: ProductType;
}

export const ProductSwitchContext: Context<ProductSwitchContextInterface | {}> =
	createContext({});
