import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LearnMoreSection } from '../../../components/mma/dataPrivacy/LearnMoreSection';

afterEach(cleanup);

describe('DataPrivacyPage', () => {
	it('correctly displays Your Data', () => {
		render(<LearnMoreSection />);
		expect(
			screen.getAllByText('Learn more about our privacy policy'),
		).toBeDefined();
	});
});
