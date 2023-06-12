import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CallCentreEmailAndNumbers } from '../../components/shared/CallCenterEmailAndNumbers';

afterEach(cleanup);

describe('Call Center Email and Numbers', () => {
	it('displays default options with first option open', () => {
		render(<CallCentreEmailAndNumbers />);
		expect(screen.getAllByText('Email:')).toBeDefined();
		expect(screen.getAllByText('Hide')).toBeDefined();
		expect(screen.getByText(/United Kingdom/)).toHaveStyle({
			'font-weight': 'bold',
		});
	});

	it('has no details when collapsed', () => {
		render(<CallCentreEmailAndNumbers collapsed />);
		screen
			.getAllByText('Email:')
			.forEach((e) => expect(e).not.toBeVisible());
		expect(screen.queryByText('Hide')).not.toBeInTheDocument();
		expect(screen.getByText(/United Kingdom/)).toHaveStyle({
			'font-weight': '400',
		});
	});

	it('displays compact layout', () => {
		render(<CallCentreEmailAndNumbers compactLayout />);
		expect(screen.getByText('Hide')).not.toBeVisible();
		screen.getAllByText('Show').forEach((e) => expect(e).not.toBeVisible());
	});

	it('filters phone regions', () => {
		render(<CallCentreEmailAndNumbers phoneRegionFilterKeys={['US']} />);
		expect(screen.queryByText(/United Kingdom/)).not.toBeInTheDocument();
		expect(screen.queryByText(/Australia/)).not.toBeInTheDocument();
		expect(screen.getByText(/Canada and USA/)).toHaveStyle({
			'font-weight': 'bold',
		});
	});

	it('opens specific region', () => {
		render(<CallCentreEmailAndNumbers openPhoneRegion={'US'} />);
		expect(
			screen.queryByText(/United Kingdom, Europe and rest of world/),
		).toHaveStyle({
			'font-weight': 400,
		});
		expect(
			screen.queryByText(/Australia, New Zealand, and Asia Pacific/),
		).toHaveStyle({
			'font-weight': 400,
		});
		expect(screen.getByText(/Canada and USA/)).toHaveStyle({
			'font-weight': 'bold',
		});
	});
});
