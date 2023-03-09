import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LearnMoreSection } from '../../../components/mma/dataPrivacy/LearnMoreSection';

afterEach(cleanup);

describe('LearnMoreSection', () => {
	it('correctly displays the heading', () => {
		render(<LearnMoreSection />);
		expect(
			screen.getAllByText('Learn more about our privacy policy'),
		).toBeDefined();
	});
});
