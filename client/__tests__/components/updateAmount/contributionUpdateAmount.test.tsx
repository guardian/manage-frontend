// @ts-nocheck
import { fireEvent, render, screen } from '@testing-library/react';
import { ContributionUpdateAmount } from '../../../components/mma/accountoverview/updateAmount/ContributionUpdateAmount';

const mainPlan = (billingPeriod) => ({
	start: '2019-10-30',
	end: '2050-10-30',
	amount: 500,
	name: '',
	shouldBeVisible: false,
	currency: '£',
	currencyISO: 'GBP',
	billingPeriod,
});

const productType = {
	productTitle: () => 'contribution test',
	friendlyName: 'recurring contribution',
	urlPart: 'contributions',
};

it.each([
	['month', 2],
	['year', 10],
])(
	'renders validation error if %s amount below %i',
	(billingPeriod, expectedMinAmount) => {
		const { container } = render(
			<ContributionUpdateAmount
				subscriptionId="A-123"
				mainPlan={mainPlan(billingPeriod)}
				amountUpdateStateChange={jest.fn()}
				nextPaymentDate="2050-10-29"
				productType={productType}
			/>,
		);

		fireEvent.click(screen.queryByText('Change amount'));

		fireEvent.click(screen.getByLabelText('Other'));

		const otherInputElem = container.querySelector('input[type="number"]');
		fireEvent.change(otherInputElem, {
			target: { value: expectedMinAmount - 1 },
		});

		// click on the change amount button again and then check to make sure that the validation error message shows up
		fireEvent.click(screen.queryByText('Change amount'));

		// assert that the minimum amount validation error message is shown
		expect(
			screen.queryByText(
				`There is a minimum ${billingPeriod}ly contribution amount of £${expectedMinAmount.toFixed(
					2,
				)} GBP`,
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
		const { container } = render(
			<ContributionUpdateAmount
				subscriptionId="A-123"
				mainPlan={mainPlan(billingPeriod)}
				amountUpdateStateChange={jest.fn()}
				nextPaymentDate="2050-10-29"
				productType={productType}
			/>,
		);

		fireEvent.click(screen.queryByText('Change amount'));

		fireEvent.click(screen.getByLabelText('Other'));

		const otherInputElem = container.querySelector('input[type="number"]');
		fireEvent.change(otherInputElem, {
			target: { value: expectedMaxAmount + 1 },
		});

		// click on the change amount button again and then check to make sure that the validation error message shows up
		fireEvent.click(screen.queryByText('Change amount'));

		// assert that the maximum amount validation error message is shown
		expect(
			screen.queryByText(
				`There is a maximum ${billingPeriod}ly contribution amount of £${expectedMaxAmount.toFixed(
					2,
				)} GBP`,
			),
		).toBeTruthy();
	},
);

it('renders validation error if blank input is provided', () => {
	const { container } = render(
		<ContributionUpdateAmount
			subscriptionId="A-123"
			mainPlan={mainPlan('month')}
			amountUpdateStateChange={jest.fn()}
			nextPaymentDate="2050-10-29"
			productType={productType}
		/>,
	);

	fireEvent.click(screen.queryByText('Change amount'));

	fireEvent.click(screen.getByLabelText('Other'));

	const otherInputElem = container.querySelector('input[type="number"]');
	fireEvent.change(otherInputElem, {
		target: { value: '' },
	});

	// click on the change amount button again and then check to make sure that the validation error message shows up
	fireEvent.click(screen.queryByText('Change amount'));

	// assert that the maximum amount validation error message is shown
	expect(
		screen.queryByText(
			'There is a problem with the amount you have selected, please make sure it is a valid amount',
		),
	).toBeTruthy();
});

it('renders validation error if a string is attempted to be input', () => {
	const { container } = render(
		<ContributionUpdateAmount
			subscriptionId="A-123"
			mainPlan={mainPlan('month')}
			amountUpdateStateChange={jest.fn()}
			nextPaymentDate="2050-10-29"
			productType={productType}
		/>,
	);

	fireEvent.click(screen.queryByText('Change amount'));

	fireEvent.click(screen.getByLabelText('Other'));

	const otherInputElem = container.querySelector('input[type="number"]');
	fireEvent.change(otherInputElem, {
		target: { value: 'twelfty' },
	});

	// click on the change amount button again and then check to make sure that the validation error message shows up
	fireEvent.click(screen.queryByText('Change amount'));

	// assert that the maximum amount validation error message is shown
	expect(
		screen.queryByText(
			'There is a problem with the amount you have selected, please make sure it is a valid amount',
		),
	).toBeTruthy();
});

it('updates amount is valid value is input', () => {
	// mock the console error for this test case to mute "Cannot update a component (`Unknown`) while rendering a different component" error
	const mockedError = () => true;
	// tslint:disable-next-line
	console.error = mockedError; // tslint:disable-line:no-console

	const { container } = render(
		<ContributionUpdateAmount
			subscriptionId="A-123"
			mainPlan={mainPlan('month')}
			amountUpdateStateChange={jest.fn()}
			nextPaymentDate="2050-10-29"
			productType={productType}
		/>,
	);

	fireEvent.click(screen.queryByText('Change amount'));

	fireEvent.click(screen.getByLabelText('Other'));

	const otherInputElem = container.querySelector('input[type="number"]');
	fireEvent.change(otherInputElem, {
		target: { value: 4 },
	});

	// click on the change amount button again and then check to make sure that the validation error message shows up
	fireEvent.click(screen.queryByText('Change amount'));
	expect(screen.queryByText('Updating...')).toBeTruthy();
});
