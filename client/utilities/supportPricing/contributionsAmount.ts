export type ContributionInterval = 'month' | 'year';

interface ContributionAmountOptions {
	amounts: number[];
	otherDefaultAmount: number;
	minAmount: number;
	maxAmount: number;
}

type ContributionAmountsLookup = Record<
	string,
	{
		month: ContributionAmountOptions;
		year: ContributionAmountOptions;
	}
>;

export const contributionAmountsLookup: ContributionAmountsLookup = {
	GBP: {
		month: {
			amounts: [3, 7, 12],
			otherDefaultAmount: 2,
			minAmount: 2,
			maxAmount: 166,
		},
		year: {
			amounts: [60, 120, 240, 480],
			otherDefaultAmount: 10,
			minAmount: 10,
			maxAmount: 2000,
		},
	},
	USD: {
		month: {
			amounts: [5, 10, 20],
			otherDefaultAmount: 2,
			minAmount: 2,
			maxAmount: 800,
		},
		year: {
			amounts: [50, 100, 250, 500],
			otherDefaultAmount: 20,
			minAmount: 10,
			maxAmount: 10000,
		},
	},
	EUR: {
		month: {
			amounts: [6, 10, 20],
			otherDefaultAmount: 2,
			minAmount: 2,
			maxAmount: 166,
		},
		year: {
			amounts: [50, 100, 250, 500],
			otherDefaultAmount: 10,
			minAmount: 10,
			maxAmount: 2000,
		},
	},
	AUD: {
		month: {
			amounts: [10, 20, 40],
			otherDefaultAmount: 10,
			minAmount: 2,
			maxAmount: 200,
		},
		year: {
			amounts: [80, 250, 500, 750],
			otherDefaultAmount: 10,
			minAmount: 10,
			maxAmount: 2000,
		},
	},
	NZD: {
		month: {
			amounts: [10, 20, 50],
			otherDefaultAmount: 10,
			minAmount: 2,
			maxAmount: 200,
		},
		year: {
			amounts: [50, 100, 250, 500],
			otherDefaultAmount: 10,
			minAmount: 10,
			maxAmount: 2000,
		},
	},
	CAD: {
		month: {
			amounts: [5, 10, 20],
			otherDefaultAmount: 5,
			minAmount: 2,
			maxAmount: 166,
		},
		year: {
			amounts: [60, 100, 250, 500],
			otherDefaultAmount: 10,
			minAmount: 10,
			maxAmount: 2000,
		},
	},
	international: {
		month: {
			amounts: [5, 10, 20],
			otherDefaultAmount: 5,
			minAmount: 2,
			maxAmount: 166,
		},
		year: {
			amounts: [60, 100, 250, 500],
			otherDefaultAmount: 10,
			minAmount: 10,
			maxAmount: 2000,
		},
	},
};
