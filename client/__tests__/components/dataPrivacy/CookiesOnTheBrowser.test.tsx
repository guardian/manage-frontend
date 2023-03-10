import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CookiesOnThisBrowserSection } from '../../../components/mma/dataPrivacy/CookiesOnTheBrowserSection';

afterEach(cleanup);

describe('CookiesOnThisBrowserSection', () => {
	const onClick = () => {
		return;
	};
	it('correctly displays the heading', () => {
		render(<CookiesOnThisBrowserSection onClick={onClick} />);
		expect(screen.getAllByText('Cookies on this browser')).toBeDefined();
	});

	it('correctly displays the manage cookies on this browser button', () => {
		render(<CookiesOnThisBrowserSection onClick={onClick} />);
		expect(
			screen.getAllByText('Manage cookies on this browser'),
		).toBeDefined();
	});
});
