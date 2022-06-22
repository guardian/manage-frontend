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

export interface ProductSwitchResponse {
	newSubscriptionName: string;
	newProduct: {
		id: string;
		name: string;
		billing: {
			amount: number;
			currency: Currency;
			frequency: {
				name: BillingFrequency;
				count: number;
			};
			startDate: string; // i.e.: 2022-02-02
		};
		introOffer: {
			billing: {
				amount: number;
				currency: Currency;
				frequency: {
					name: BillingFrequency;
					count: number;
				};
				startDate: string; // i.e.: 2022-02-02
			};
			duration: {
				name: BillingFrequency;
				count: number;
			};
		};
	};
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
