export const deliveryRecordsWithNoDeliveries = {
	results: [],
	deliveryProblemMap: {},
	contactPhoneNumbers: {
		Id: '0039E00001Mw6DCQAZ',
		Phone: null,
		HomePhone: null,
		MobilePhone: null,
		OtherPhone: null,
	},
};

export const deliveryRecordsWithDelivery = (
	withDeliveryInstructions: boolean = false,
) => {
	return {
		results: [
			{
				id: 'a339E000000KDOMQA4',
				deliveryDate: '2022-04-15',
				deliveryInstruction:
					withDeliveryInstructions && 'example delivery instructions',
				deliveryAddress: 'Kings Place, London, 90 York Way',
				addressLine1: 'Kings Place',
				addressLine2: null,
				addressLine3: null,
				addressTown: 'London',
				addressCountry: null,
				addressPostcode: '90 York Way',
				hasHolidayStop: false,
				bulkSuspensionReason: null,
				problemCaseId: null,
				isChangedAddress: false,
				isChangedDeliveryInstruction: null,
				credit: null,
			},
		],
		deliveryProblemMap: {},
		contactPhoneNumbers: {
			Id: '0039E00001Mw6DCQAZ',
			Phone: null,
			HomePhone: null,
			MobilePhone: null,
			OtherPhone: null,
		},
	};
};

export const deliveryRecordsWithReportedProblem = {
	results: [
		{
			id: 'a339E000000KDOMQA4',
			deliveryDate: '2022-04-15',
			deliveryInstruction: null,
			deliveryAddress: 'Kings Place, London, 90 York Way',
			addressLine1: 'Kings Place',
			addressLine2: null,
			addressLine3: null,
			addressTown: 'London',
			addressCountry: null,
			addressPostcode: '90 York Way',
			hasHolidayStop: false,
			bulkSuspensionReason: null,
			problemCaseId: '5009E00000KU9yBQAT',
			isChangedAddress: false,
			isChangedDeliveryInstruction: null,
			credit: {
				amount: -2.89,
				invoiceDate: '2023-03-25',
				isActioned: false,
			},
		},
	],
	deliveryProblemMap: {
		'5009E00000KU9yBQAT': {
			id: '5009E00000KU9yBQAT',
			ref: '01573148',
			subject:
				'[Self Service] Delivery Problem : Damaged Paper (Guardian Weekly - A-S00333617)',
			description: 'Pages torn',
			problemType: 'Damaged Paper',
		},
	},
	contactPhoneNumbers: {
		Id: '0039E00001Mw6DCQAZ',
		Phone: null,
		HomePhone: null,
		MobilePhone: null,
		OtherPhone: null,
	},
};
