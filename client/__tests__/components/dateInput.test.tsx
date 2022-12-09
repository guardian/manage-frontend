import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateInput } from '../../components/DateInput';

describe('DateInput', () => {
	it.each([
		{
			givenDate: '2022-01-10',
			expectedDay: '10',
			expectedMonth: '1',
			expectedYear: '2022',
		},
		{
			givenDate: '2022-03-16',
			expectedDay: '16',
			expectedMonth: '3',
			expectedYear: '2022',
		},
		{
			givenDate: '2023-12-04',
			expectedDay: '4',
			expectedMonth: '12',
			expectedYear: '2023',
		},
	])(
		'Displays the correct day, month and year for $givenDate',
		({ givenDate, expectedDay, expectedMonth, expectedYear }) => {
			const date = new Date(givenDate);
			render(<DateInput date={date} labelText="My Label" />);

			expect(screen.getByRole('textbox', { name: 'day' })).toHaveValue(
				expectedDay,
			);
			expect(screen.getByRole('textbox', { name: 'month' })).toHaveValue(
				expectedMonth,
			);
			expect(screen.getByRole('textbox', { name: 'year' })).toHaveValue(
				expectedYear,
			);
		},
	);
});
