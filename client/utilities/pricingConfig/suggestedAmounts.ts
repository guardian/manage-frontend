import type { PaidSubscriptionPlan } from '../../../shared/productResponse';
import type { CurrencyIso } from '../currencyIso';
import { isCurrencyIso } from '../currencyIso';

/* Recurring Contributions */

type SuggestedAmountsLookup = Record<
	CurrencyIso | 'international',
	{
		month: (amount: number) => number[];
		year: (amount: number) => number[];
	}
>;

export function getContributionSuggestedAmounts(
	mainPlan: PaidSubscriptionPlan,
) {
	const currentAmount = mainPlan.price / 100;
	const currencyISO = isCurrencyIso(mainPlan.currencyISO)
		? mainPlan.currencyISO
		: 'international';

	return suggestedAmountsLookup[currencyISO][
		mainPlan.billingPeriod as 'month' | 'year'
	](currentAmount);
}

/* 
	ToDo: we need a more flexible way of calculating these suggested amounts, which came from a spreadsheet
*/

const suggestedAmountsLookup: SuggestedAmountsLookup = {
	GBP: {
		month: getGbpMonthly,
		year: getGbpAnnual,
	},
	USD: {
		month: getUsdMonthly,
		year: getUsdAnnual,
	},
	EUR: {
		month: getEuroMonthly,
		year: getEuroAnnual,
	},
	AUD: {
		month: getAusMonthly,
		year: getAusAnnual,
	},
	NZD: {
		month: getAusMonthly,
		year: getAusAnnual,
	},
	CAD: {
		month: getUsdMonthly,
		year: getUsdAnnual,
	},
	international: {
		month: getUsdMonthly,
		year: getUsdAnnual,
	},
};

function getGbpMonthly(amount: number) {
	if (amount <= 3) {
		return [5, 7, 10];
	}
	if (amount <= 8) {
		return [10, 12, 15];
	}
	if (amount <= 9) {
		return [12, 15, 17];
	}
	if (amount <= 13) {
		return [15, 17, 20];
	}
	if (amount <= 18) {
		return [20, 22, 25];
	}
	if (amount <= 23) {
		return [25, 27, 30];
	}
	if (amount <= 28) {
		return [30, 32, 35];
	}
	if (amount <= 29) {
		return [35, 37, 40];
	}
	if (amount <= 35) {
		return [40, 42, 45];
	} else {
		return getSupporterPlusSuggestedAmountsMonthly(amount);
	}
}

function getGbpAnnual(amount: number) {
	if (amount <= 11) {
		return [20, 30, 95];
	}
	if (amount <= 13) {
		return [25, 40, 95];
	}
	if (amount <= 16) {
		return [30, 40, 95];
	}
	if (amount <= 18) {
		return [35, 40, 95];
	}
	if (amount <= 19) {
		return [40, 50, 95];
	}
	if (amount <= 50) {
		return [60, 70, 95];
	}
	if (amount <= 59) {
		return [70, 80, 95];
	}
	if (amount <= 69) {
		return [80, 90, 95];
	}
	if (amount <= 80) {
		return [95, 100, 110];
	}
	if (amount <= 89) {
		return [99, 110, 120];
	}
	if (amount <= 100) {
		return [120, 130, 140];
	}
	if (amount <= 119) {
		return [150, 160, 170];
	}
	if (amount <= 140) {
		return [240, 250, 260];
	} else {
		return getSupporterPlusSuggestedAmountsAnnual(amount);
	}
}

function getUsdMonthly(amount: number) {
	if (amount <= 4) {
		return [5, 7, 13];
	}
	if (amount <= 8) {
		return [10, 13, 15];
	}
	if (amount <= 9) {
		return [13, 15, 17];
	}
	if (amount <= 18) {
		return [20, 22, 25];
	}
	if (amount <= 23) {
		return [25, 27, 30];
	}
	if (amount <= 28) {
		return [30, 32, 35];
	}
	if (amount <= 29) {
		return [35, 37, 40];
	}
	if (amount <= 35) {
		return [40, 42, 45];
	} else {
		return getSupporterPlusSuggestedAmountsMonthly(amount);
	}
}

function getUsdAnnual(amount: number) {
	if (amount <= 10) {
		return [20, 30, 120];
	}
	if (amount <= 20) {
		return [40, 50, 120];
	}
	if (amount <= 30) {
		return [50, 60, 120];
	}
	if (amount <= 39) {
		return [60, 70, 120];
	}
	if (amount <= 50) {
		return [75, 80, 120];
	}
	if (amount <= 55) {
		return [80, 90, 120];
	}
	if (amount <= 59) {
		return [90, 100, 120];
	}
	if (amount <= 70) {
		return [100, 110, 120];
	}
	if (amount <= 89) {
		return [120, 130, 140];
	}
	if (amount <= 99) {
		return [130, 140, 150];
	}
	if (amount <= 114) {
		return [150, 160, 170];
	}
	if (amount <= 119) {
		return [160, 170, 180];
	}
	if (amount <= 139) {
		return [180, 190, 200];
	}
	if (amount <= 150) {
		return [200, 210, 220];
	} else {
		return getSupporterPlusSuggestedAmountsAnnual(amount);
	}
}

function getEuroMonthly(amount: number) {
	if (amount <= 4) {
		return [6, 8, 10];
	}
	if (amount <= 8) {
		return [10, 12, 15];
	}
	if (amount <= 9) {
		return [15, 17, 20];
	}
	if (amount <= 18) {
		return [20, 22, 25];
	}
	if (amount <= 28) {
		return [30, 32, 35];
	}
	if (amount <= 29) {
		return [35, 37, 40];
	}
	if (amount <= 35) {
		return [40, 42, 45];
	} else {
		return getSupporterPlusSuggestedAmountsMonthly(amount);
	}
}

function getEuroAnnual(amount: number) {
	if (amount <= 11) {
		return [20, 30, 95];
	}
	if (amount <= 14) {
		return [25, 30, 95];
	}
	if (amount <= 19) {
		return [30, 40, 95];
	}
	if (amount <= 44) {
		return [60, 70, 95];
	}
	if (amount <= 49) {
		return [75, 80, 95];
	}
	if (amount <= 89) {
		return [95, 110, 120];
	}
	if (amount <= 99) {
		return [120, 130, 140];
	}
	if (amount <= 119) {
		return [150, 160, 170];
	}
	if (amount <= 149) {
		return [240, 250, 260];
	}
	if (amount <= 150) {
		return [250, 260, 270];
	} else {
		return getSupporterPlusSuggestedAmountsAnnual(amount);
	}
}

function getAusMonthly(amount: number) {
	if (amount <= 9) {
		return [15, 17, 20];
	}
	if (amount <= 18) {
		return [20, 22, 25];
	}
	if (amount <= 27) {
		return [30, 32, 35];
	}
	if (amount <= 29) {
		return [35, 37, 40];
	}
	if (amount <= 35) {
		return [40, 42, 45];
	}
	if (amount <= 39) {
		return [45, 47, 50];
	}
	if (amount <= 45) {
		return [50, 52, 55];
	}
	if (amount <= 50) {
		return [60, 62, 65];
	} else {
		return getSupporterPlusSuggestedAmountsMonthly(amount);
	}
}

function getAusAnnual(amount: number) {
	if (amount <= 19) {
		return [40, 50, 160];
	}
	if (amount <= 29) {
		return [50, 60, 160];
	}
	if (amount <= 44) {
		return [60, 70, 160];
	}
	if (amount <= 49) {
		return [70, 80, 160];
	}
	if (amount <= 69) {
		return [80, 90, 160];
	}
	if (amount <= 79) {
		return [100, 110, 160];
	}
	if (amount <= 151) {
		return [160, 170, 180];
	}
	if (amount <= 169) {
		return [180, 190, 200];
	}
	if (amount <= 179) {
		return [200, 210, 220];
	}
	if (amount <= 190) {
		return [230, 240, 250];
	}
	if (amount <= 199) {
		return [250, 260, 270];
	}
	if (amount <= 250) {
		return [300, 310, 320];
	} else {
		return getSupporterPlusSuggestedAmountsAnnual(amount);
	}
}

/* Supporter Plus */

export function getSupporterPlusSuggestedAmountsFromMainPlan(
	mainPlan: PaidSubscriptionPlan,
) {
	const currentAmount = mainPlan.price / 100;

	return mainPlan.billingPeriod === 'month'
		? getSupporterPlusSuggestedAmountsMonthly(currentAmount)
		: getSupporterPlusSuggestedAmountsAnnual(currentAmount);
}

export function getSupporterPlusSuggestedAmountsMonthly(currentAmount: number) {
	const firstValue = currentAmount + 2;

	const secondValue = Math.ceil((firstValue + 1) / 5) * 5;

	const thirdValue = secondValue + 5;

	return [firstValue, secondValue, thirdValue];
}

export function getSupporterPlusSuggestedAmountsAnnual(currentAmount: number) {
	// ToDo: what if this goes over the max?
	const percentageStepUps = [1.1, 1.25, 1.5];

	return percentageStepUps.map(
		(p) => Math.round((currentAmount * p) / 5) * 5,
	);
}
