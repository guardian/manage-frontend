import type { Context } from 'react';
import { createContext } from 'react';
import type { ProductType } from '../../../../../shared/productTypes';

type BillingFrequency = 'week' | 'month' | 'year';

interface Currency {
	symbol: string;
	code: string;
}

export interface Billing {
	price: number;
	currency: Currency;
	billingPeriod: {
		name: BillingFrequency;
		count: number;
	};
	startDate: string;
}

export interface IntroOfferBilling {
	price?: number;
	percentage?: number;
	currency: Currency;
	billingPeriod: {
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
		billing: IntroOfferBilling;
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
