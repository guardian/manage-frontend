import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MarketingToggle } from '../../../components/mma/identity/MarketingToggle';

afterEach(cleanup);

describe('MarketingToggle component', () => {
	const input = {
		id: '13',
		description: 'Test description',
		title: 'Test title',
		clickHandler: jest.fn(),
	};

	const marketingToggle = (selected: boolean) => (
		<MarketingToggle
			id={input.id}
			description={input.description}
			title={input.title}
			selected={selected}
			onClick={input.clickHandler}
		/>
	);

	it('renders correctly', () => {
		render(marketingToggle(false));

		expect(screen.getByRole('switch')).toBeInTheDocument();
		expect(
			screen.getByRole('switch', { name: 'Test title' }),
		).not.toBeChecked();
		expect(screen.getByText('Test description')).toBeVisible();
	});

	it('will select the checkbox when the selected prop is passed', () => {
		render(marketingToggle(true));

		expect(screen.getByRole('switch')).toBeChecked();
	});

	it('will call the click handler when it is clicked', () => {
		render(marketingToggle(false));
		fireEvent.click(screen.getByRole('switch'));

		expect(input.clickHandler).toHaveBeenCalledTimes(1);
		expect(input.clickHandler).toHaveBeenLastCalledWith(input.id);
	});
});
