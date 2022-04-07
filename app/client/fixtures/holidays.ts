export const potentialDeliveries = {
	nextInvoiceDateAfterToday: '2023-02-01',
	potentials: [
		{
			publicationDate: '2022-02-11',
			credit: -8.13,
			invoiceDate: '2023-02-01',
		},
	],
};

export const noPotentialDeliveries = {
	nextInvoiceDateAfterToday: '2023-02-01',
	potentials: [],
};

export const existingHolidays = {
	existing: [
		{
			id: 'a2k9E000005NnbrQAC',
			startDate: '2022-03-11',
			endDate: '2022-03-12',
			subscriptionName: 'A-S00293857',
			publicationsImpacted: [
				{
					publicationDate: '2022-03-11',
					estimatedPrice: -8.13,
					invoiceDate: '2022-03-24',
					isActioned: false,
				},
			],
			mutabilityFlags: {
				isFullyMutable: true,
				isEndDateEditable: true,
			},
		},
	],
	issueSpecifics: [
		{
			firstAvailableDate: '2022-02-05',
			issueDayOfWeek: 5,
		},
	],
	annualIssueLimit: 6,
	firstAvailableDate: '2022-02-05',
};

export const existingHolidaysWithDeletion = {
	existing: [
		{
			id: 'a2k9E000005NnbrQAC',
			startDate: '2022-03-11',
			endDate: '2022-03-12',
			subscriptionName: 'A-S00293857',
			publicationsImpacted: [
				{
					publicationDate: '2022-03-11',
					estimatedPrice: -8.13,
					invoiceDate: '2022-03-24',
					isActioned: false,
				},
			],
			withdrawnTime: '2022-04-07T14:37:15.000Z',
			mutabilityFlags: {
				isFullyMutable: true,
				isEndDateEditable: true,
			},
		},
	],
	issueSpecifics: [
		{
			firstAvailableDate: '2022-02-05',
			issueDayOfWeek: 5,
		},
	],
	annualIssueLimit: 6,
	firstAvailableDate: '2022-02-05',
};
