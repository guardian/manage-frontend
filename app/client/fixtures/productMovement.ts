export const availableProductMovesResponse = [
	{
		id: '123',
		name: 'digital subscription',
		billing: {
			amount: 11.99,
			currency: {
				symbol: '£',
				code: 'GBP',
			},
			frequency: {
				name: 'Months',
				count: 1,
			},
			startDate: '2022-09-21',
		},
		trial: {
			duration: {
				name: 'Days',
				count: 14,
			},
		},
		introOffer: {
			billing: {
				percentage: 50,
				currency: {
					symbol: '£',
					code: 'GBP',
				},
				frequency: {
					name: 'Months',
					count: 1,
				},
				startDate: '2022-06-21',
			},
			duration: {
				name: 'Months',
				count: 3,
			},
		},
	},
];
