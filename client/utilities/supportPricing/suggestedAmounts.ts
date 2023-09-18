import type { PaidSubscriptionPlan } from '../../../shared/productResponse';
import type { CurrencyIso } from '../currencyIso';
import { isCurrencyIso } from '../currencyIso';
import {
	getSuggestedAmountsAnnual,
	getSuggestedAmountsMonthly,
} from './supporterPlusPricing';

type SuggestedAmountsLookup = Record<
	CurrencyIso | 'international',
	{
		month: (amount: number) => number[];
		year: (amount: number) => number[];
	}
>;

export function getSuggestedSupportAmounts(mainPlan: PaidSubscriptionPlan) {
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
	switch (true) {
		case amount <= 3:
			return [5, 7, 10];
		case amount <= 8:
			return [10, 12, 15];
		case amount <= 9:
			return [12, 15, 17];
		case amount <= 13:
			return [15, 17, 20];
		case amount <= 18:
			return [20, 22, 25];
		case amount <= 23:
			return [25, 27, 30];
		case amount <= 28:
			return [30, 32, 35];
		case amount <= 29:
			return [35, 37, 40];
		case amount <= 35:
			return [40, 42, 45];
		default:
			return getSuggestedAmountsMonthly(amount);
	}
}

function getGbpAnnual(amount: number) {
	switch (true) {
		case amount <= 11:
			return [20, 30, 40];
		case amount <= 13:
			return [25, 40, 50];
		case amount <= 16:
			return [30, 40, 50];
		case amount <= 18:
			return [35, 40, 50];
		case amount <= 19:
			return [40, 50, 60];
		case amount <= 50:
			return [60, 70, 80];
		case amount <= 69:
			return [80, 90, 100];
		case amount <= 80:
			return [95, 100, 110];
		case amount <= 89:
			return [99, 110, 120];
		case amount <= 100:
			return [120, 130, 140];
		case amount <= 119:
			return [150, 160, 170];
		case amount <= 140:
			return [240, 250, 260];
		default:
			return getSuggestedAmountsAnnual(amount);
	}
}

function getUsdMonthly(amount: number) {
	switch (true) {
		case amount <= 4:
			return [5, 7, 13];
		case amount <= 8:
			return [10, 13, 15];
		case amount <= 9:
			return [13, 15, 17];
		case amount <= 18:
			return [20, 22, 25];
		case amount <= 23:
			return [25, 27, 30];
		case amount <= 28:
			return [30, 32, 35];
		case amount <= 29:
			return [35, 37, 40];
		case amount <= 35:
			return [40, 42, 45];
		default:
			return getSuggestedAmountsMonthly(amount);
	}
}

function getUsdAnnual(amount: number) {
	switch (true) {
		case amount <= 10:
			return [20, 30, 40];
		case amount <= 20:
			return [40, 50, 60];
		case amount <= 30:
			return [50, 60, 70];
		case amount <= 39:
			return [60, 70, 80];
		case amount <= 50:
			return [75, 80, 90];
		case amount <= 55:
			return [80, 90, 100];
		case amount <= 59:
			return [90, 100, 110];
		case amount <= 70:
			return [100, 110, 120];
		case amount <= 89:
			return [120, 130, 140];
		case amount <= 99:
			return [130, 140, 150];
		case amount <= 114:
			return [150, 160, 170];
		case amount <= 119:
			return [160, 170, 180];
		case amount <= 139:
			return [180, 190, 200];
		case amount <= 150:
			return [200, 210, 220];
		default:
			return getSuggestedAmountsAnnual(amount);
	}
}

function getEuroMonthly(amount: number) {
	switch (true) {
		case amount <= 4:
			return [6, 8, 10];
		case amount <= 8:
			return [10, 12, 15];
		case amount <= 9:
			return [15, 17, 20];
		case amount <= 18:
			return [20, 22, 25];
		case amount <= 28:
			return [30, 32, 35];
		case amount <= 29:
			return [35, 37, 40];
		case amount <= 35:
			return [40, 42, 45];
		default:
			return getSuggestedAmountsMonthly(amount);
	}
}

function getEuroAnnual(amount: number) {
	switch (true) {
		case amount <= 14:
			return [25, 30, 40];
		case amount <= 19:
			return [30, 40, 50];
		case amount <= 44:
			return [60, 70, 80];
		case amount <= 49:
			return [75, 80, 90];
		case amount <= 89:
			return [100, 110, 120];
		case amount <= 99:
			return [120, 130, 140];
		case amount <= 119:
			return [150, 160, 170];
		case amount <= 149:
			return [240, 250, 260];
		case amount <= 150:
			return [250, 260, 270];
		default:
			return getSuggestedAmountsAnnual(amount);
	}
}

function getAusMonthly(amount: number) {
	switch (true) {
		case amount <= 9:
			return [15, 17, 20];
		case amount <= 18:
			return [20, 22, 25];
		case amount <= 27:
			return [30, 32, 35];
		case amount <= 29:
			return [35, 37, 40];
		case amount <= 35:
			return [40, 42, 45];
		case amount <= 39:
			return [45, 47, 50];
		case amount <= 45:
			return [50, 52, 55];
		case amount <= 50:
			return [60, 62, 65];
		default:
			return getSuggestedAmountsMonthly(amount);
	}
}

function getAusAnnual(amount: number) {
	switch (true) {
		case amount <= 19:
			return [40, 50, 60];
		case amount <= 29:
			return [50, 60, 70];
		case amount <= 44:
			return [60, 70, 80];
		case amount <= 49:
			return [70, 80, 90];
		case amount <= 69:
			return [80, 90, 100];
		case amount <= 79:
			return [100, 110, 120];
		case amount <= 151:
			return [160, 170, 180];
		case amount <= 169:
			return [180, 190, 200];
		case amount <= 179:
			return [200, 210, 220];
		case amount <= 190:
			return [230, 240, 250];
		case amount <= 199:
			return [250, 260, 270];
		case amount <= 250:
			return [300, 310, 320];
		default:
			return getSuggestedAmountsAnnual(amount);
	}
}
