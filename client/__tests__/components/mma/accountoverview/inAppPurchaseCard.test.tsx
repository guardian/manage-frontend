import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { InAppPurchaseCard } from '../../../../components/mma/accountoverview/InAppPurchaseCard';
import {
	CancelledInAppPurchase,
	InAppPurchase,
} from '../../../../fixtures/inAppPurchase';

describe('InAppPurchaseCard', () => {
	it('does not render cancellation copy when cancellation timestamp is invalid', () => {
		const subscription = {
			...CancelledInAppPurchase,
			cancellationTimestamp: 'invalid-date',
		};

		expect(() =>
			render(
				<MemoryRouter>
					<InAppPurchaseCard subscription={subscription} />
				</MemoryRouter>,
			),
		).not.toThrow();

		expect(
			screen.queryByText(/Your app subscription was cancelled in/i),
		).not.toBeInTheDocument();
	});

	it('renders cancellation copy when cancellation timestamp is valid', () => {
		render(
			<MemoryRouter>
				<InAppPurchaseCard subscription={CancelledInAppPurchase} />
			</MemoryRouter>,
		);

		expect(
			screen.getByText(
				'Your app subscription was cancelled in January 2023.',
			),
		).toBeInTheDocument();
	});

	it('renders card without cancellation copy for active subscriptions', () => {
		render(
			<MemoryRouter>
				<InAppPurchaseCard subscription={InAppPurchase} />
			</MemoryRouter>,
		);

		expect(screen.getByText('News app')).toBeInTheDocument();
		expect(
			screen.queryByText(/Your app subscription was cancelled in/i),
		).not.toBeInTheDocument();
	});
});
