import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BenefitsCtas } from '../../../../components/mma/accountoverview/AccountOverview';

describe('BenefitsCtas', () => {
	it('shows app, editions, and archive benefits for a secondary account', () => {
		render(<BenefitsCtas email="invitee@example.com" isSecondaryAccount />);

		expect(
			screen.getByRole('heading', {
				name: 'Get the most out of your benefits',
			}),
		).toBeInTheDocument();
		expect(
			screen.getByRole('heading', { name: 'The Guardian News app' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('heading', { name: 'The Guardian Feast app' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('heading', { name: 'The Guardian Editions app' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('heading', {
				name: 'The Guardian Newspaper archive',
			}),
		).toBeInTheDocument();
		expect(
			screen.queryByRole('heading', { name: 'Extra accounts' }),
		).not.toBeInTheDocument();
	});

	it('hides benefits when the account is not a secondary account and has no eligible products', () => {
		render(<BenefitsCtas email="reader@example.com" />);

		expect(
			screen.queryByRole('heading', {
				name: 'Get the most out of your benefits',
			}),
		).not.toBeInTheDocument();
	});
});
