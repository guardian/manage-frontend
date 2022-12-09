import type {
	AvailableProductsResponse,
	ProductSwitchResponse,
} from '../components/mma/cancel/productSwitch/productSwitchApi';

export const availableProductMovesResponse: AvailableProductsResponse[] = [
	{
		id: '123',
		name: 'digital subscription',
		billing: {
			amount: 1199,
			currency: {
				symbol: '£',
				code: 'GBP',
			},
			frequency: {
				name: 'month',
				count: 1,
			},
			startDate: '2022-06-21',
		},
		trial: {
			dayCount: 14,
		},
		introOffer: {
			billing: {
				percentage: 50,
				currency: {
					symbol: '£',
					code: 'GBP',
				},
				frequency: {
					name: 'month',
					count: 1,
				},
				startDate: '2022-06-21',
			},
			duration: {
				name: 'month',
				count: 3,
			},
		},
	},
];

export const productMoveResponse: ProductSwitchResponse = {
	newSubscriptionName: 'asdf',
	newProduct: {
		id: '123',
		name: 'digital subscription',
		billing: {
			amount: 1199,
			currency: {
				symbol: '£',
				code: 'GBP',
			},
			frequency: {
				name: 'month',
				count: 1,
			},
			startDate: '2022-09-21',
		},
		trial: {
			dayCount: 14,
		},
		introOffer: {
			billing: {
				percentage: 50,
				currency: {
					symbol: '£',
					code: 'GBP',
				},
				frequency: {
					name: 'month',
					count: 1,
				},
				startDate: '2022-06-21',
			},
			duration: {
				name: 'month',
				count: 3,
			},
		},
	},
};
