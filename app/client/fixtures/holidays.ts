export const noPotentialDeliveries = {
	nextInvoiceDateAfterToday: '2023-02-01',
	potentials: [],
};

export const potentialDeliveries = {
	nextInvoiceDateAfterToday: '2023-02-01',
	potentials: [
		{
			publicationDate: '2022-02-11',
			credit: -2.89,
			invoiceDate: '2023-02-01',
		},
	],
};

export const multiplePotentialDeliveries = {
	nextInvoiceDateAfterToday: '2023-02-01',
	potentials: [
		{
			publicationDate: '2022-03-18',
			credit: -2.89,
			invoiceDate: '2023-02-01',
		},
		{
			publicationDate: '2022-03-25',
			credit: -2.89,
			invoiceDate: '2023-02-01',
		},
		{
			publicationDate: '2022-04-01',
			credit: -2.89,
			invoiceDate: '2023-02-01',
		},
		{
			publicationDate: '2022-04-08',
			credit: -2.89,
			invoiceDate: '2023-02-01',
		},
		{
			publicationDate: '2022-04-15',
			credit: -2.89,
			invoiceDate: '2023-02-01',
		},
		{
			publicationDate: '2022-04-22',
			credit: -2.89,
			invoiceDate: '2023-02-01',
		},
	],
};

export const yearSpanningPotentialDeliveries = {
	nextInvoiceDateAfterToday: '2023-02-01',
	potentials: [
		{
			publicationDate: '2022-12-23',
			credit: -2.89,
			invoiceDate: '2023-02-01',
		},
		{
			publicationDate: '2022-12-30',
			credit: -2.89,
			invoiceDate: '2023-02-01',
		},
		{
			publicationDate: '2023-01-06',
			credit: -2.89,
			invoiceDate: '2023-02-01',
		},
		{
			publicationDate: '2023-01-13',
			credit: -2.89,
			invoiceDate: '2023-02-01',
		},
	],
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
					estimatedPrice: -2.89,
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
					estimatedPrice: -2.89,
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

export const existingHolidaysFirstIssueDecember = {
	existing: [],
	issueSpecifics: [
		{
			firstAvailableDate: '2022-12-16',
			issueDayOfWeek: 5,
		},
	],
	annualIssueLimit: 6,
	firstAvailableDate: '2022-12-16',
};
