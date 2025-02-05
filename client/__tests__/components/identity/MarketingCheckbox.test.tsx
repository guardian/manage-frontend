import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MarketingCheckbox } from '../../../components/mma/identity/MarketingCheckbox';

afterEach(cleanup);

describe('MarketingCheckbox component', () => {
	const input = {
		id: '13',
		description: 'Test description',
		title: 'Test title',
		clickHandler: jest.fn(),
	};

	const marketingCheckbox = (selected: boolean) => (
		<MarketingCheckbox
			id={input.id}
			description={input.description}
			title={input.title}
			selected={selected}
			onClick={input.clickHandler}
		/>
	);

	it('renders correctly and displays marketing information', () => {
		render(marketingCheckbox(false));

		const checkboxRoles = screen.getAllByRole('checkbox');
		expect(checkboxRoles).toHaveLength(1);
		checkboxRoles.map((role) => expect(role).not.toBeChecked());

		expect(screen.getByText('Test title')).toBeVisible();
		expect(screen.getByText('Test description')).toBeVisible();
	});

	it('will select the checkbox when the selected prop is passed', () => {
		render(marketingCheckbox(true));

		const checkboxRoles = screen.getAllByRole('checkbox');
		checkboxRoles.map((role) => expect(role).toBeChecked());
	});

	it('will call the click handler when it is clicked', () => {
		render(marketingCheckbox(false));

		const checkboxRoles = screen.getAllByRole('checkbox');
		fireEvent.click(checkboxRoles[0]);

		expect(input.clickHandler).toHaveBeenCalledTimes(1);
		expect(input.clickHandler).toHaveBeenLastCalledWith(input.id);
	});
});
