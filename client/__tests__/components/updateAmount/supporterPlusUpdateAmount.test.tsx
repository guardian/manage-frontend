import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type { CurrencyIso } from '@/client/utilities/currencyIso';
import type { BillingPeriod } from '@/shared/productResponse';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import { UpdateAmount } from '../../../components/mma/accountoverview/updateAmount/UpdateAmount';

const mainPlan = (billingPeriod: BillingPeriod) => ({
	start: '2019-10-30',
	end: '2050-10-30',
	name: '',
	shouldBeVisible: false,
	currency: '£',
	currencyISO: 'GBP' as CurrencyIso,
	billingPeriod,
	price: 500,
	features: '',
});

const productType = PRODUCT_TYPES['supporterplus'];

beforeEach(() => {
	globalThis.fetch = jest.fn().mockImplementation(() => {
		return new Promise((resolve) => {
			resolve({
				ok: true,
				status: 200,
				headers: {
					get: () => 'pass',
				},
				json: () => {
					'success';
				},
			});
		});
	});
});

it.each([
	['month', 2],
	['year', 10],
])(
	'renders validation error if %s amount below %i',
	(billingPeriod, expectedMinAmount) => {
		render(
			<UpdateAmount
				subscriptionId="A-123"
				mainPlan={mainPlan(billingPeriod as BillingPeriod)}
				amountUpdateStateChange={jest.fn()}
				nextPaymentDate="2050-10-29"
				productType={productType}
				isTestUser={false}
			/>,
		);

		fireEvent.click(screen.getByText('Change amount'));
		fireEvent.click(screen.getByLabelText('Other'));

		const otherInputElem = screen.getByRole('textbox', {
			name: /other amount/i,
		});
		fireEvent.change(otherInputElem, {
			target: { value: expectedMinAmount - 1 },
		});

		// click on the change amount button again and then check to make sure that the validation error message shows up
		fireEvent.click(screen.getByText('Change amount'));

		// assert that the minimum amount validation error message is shown
		expect(
			screen.findByText(
				/minimum payment to receive this subscription. Please call our customer service team/i,
			),
		).toBeTruthy();
	},
);

it.each([
	['month', 166],
	['year', 2000],
])(
	'renders validation error if %s amount above %i',
	(billingPeriod, expectedMaxAmount) => {
		render(
			<UpdateAmount
				subscriptionId="A-123"
				mainPlan={mainPlan(billingPeriod as BillingPeriod)}
				amountUpdateStateChange={jest.fn()}
				nextPaymentDate="2050-10-29"
				productType={productType}
				isTestUser={false}
			/>,
		);

		fireEvent.click(screen.getByText('Change amount'));

		fireEvent.click(screen.getByLabelText('Other'));

		const otherInputElem = screen.getByRole('textbox', {
			name: /other amount/i,
		});
		fireEvent.change(otherInputElem, {
			target: { value: expectedMaxAmount + 1 },
		});

		// click on the change amount button again and then check to make sure that the validation error message shows up
		fireEvent.click(screen.getByText('Change amount'));

		// assert that the maximum amount validation error message is shown
		expect(
			screen.queryByText(
				`There is a maximum ${billingPeriod}ly amount of £${expectedMaxAmount} GBP`,
			),
		).toBeTruthy();
	},
);

it('renders validation error if blank input is provided', () => {
	render(
		<UpdateAmount
			subscriptionId="A-123"
			mainPlan={mainPlan('month')}
			amountUpdateStateChange={jest.fn()}
			nextPaymentDate="2050-10-29"
			productType={productType}
			isTestUser={false}
		/>,
	);

	fireEvent.click(screen.getByText('Change amount'));

	fireEvent.click(screen.getByLabelText('Other'));

	const otherInputElem = screen.getByRole('textbox', {
		name: /other amount/i,
	});
	fireEvent.change(otherInputElem, {
		target: { value: '' },
	});

	// click on the change amount button again and then check to make sure that the validation error message shows up
	fireEvent.click(screen.getByText('Change amount'));

	// assert that the maximum amount validation error message is shown
	expect(
		screen.queryByText(
			'There is a problem with the amount you have selected, please make sure it is a valid amount',
		),
	).toBeTruthy();
});

it('ignores non-numeric input in the Other amount field', () => {
	render(
		<UpdateAmount
			subscriptionId="A-123"
			mainPlan={mainPlan('month')}
			amountUpdateStateChange={jest.fn()}
			nextPaymentDate="2050-10-29"
			productType={productType}
			isTestUser={false}
		/>,
	);

	fireEvent.click(screen.getByText('Change amount'));

	fireEvent.click(screen.getByLabelText('Other'));

	const otherInputElem = screen.getByRole('textbox', {
		name: /other amount/i,
	});

	// capture initial value (SupporterPlus pre-fills Other with a default)
	const initial = (otherInputElem as HTMLInputElement).value;

	// attempt to type letters
	fireEvent.change(otherInputElem, { target: { value: 'twelfty' } });

	// assert: value is unchanged because invalid input is rejected
	expect((otherInputElem as HTMLInputElement).value).toBe(initial);

	// and no "invalid amount" validation error is shown
	expect(
		screen.queryByText(
			'There is a problem with the amount you have selected, please make sure it is a valid amount',
		),
	).not.toBeInTheDocument();
});

it('updates amount is valid value is input', async () => {
	render(
		<UpdateAmount
			subscriptionId="A-123"
			mainPlan={mainPlan('month')}
			amountUpdateStateChange={jest.fn()}
			nextPaymentDate="2050-10-29"
			productType={productType}
			isTestUser={false}
		/>,
	);

	fireEvent.click(screen.getByText('Change amount'));

	fireEvent.click(screen.getByLabelText('Other'));

	const otherInputElem = screen.getByRole('textbox', {
		name: /other amount/i,
	});
	fireEvent.change(otherInputElem, {
		target: { value: 14 },
	});

	// click on the change amount button again and then check to make sure that the validation error message shows up
	fireEvent.click(screen.getByText('Change amount'));

	expect(await screen.findByText(/Updating/)).toBeTruthy();
	expect(await screen.findByText(/successfully updated/)).toBeTruthy();
});
