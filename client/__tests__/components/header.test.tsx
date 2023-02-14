import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Header } from '../../components/shared/Header';

describe('Header', () => {
	it('renders the header in a signed out state', () => {
		render(
			<MemoryRouter>
				<Header signInStatus="signedOut" />
			</MemoryRouter>,
		);
		expect(
			screen.queryByRole('link', { name: 'Sign in' }),
		).toBeInTheDocument();
	});

	it('renders the header in a signed in state', () => {
		render(
			<MemoryRouter>
				<Header signInStatus="signedIn" />
			</MemoryRouter>,
		);
		expect(
			screen.queryByRole('button', { name: 'My account' }),
		).toBeInTheDocument();
	});
});
