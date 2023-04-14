import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ValueOfSupport } from '../../../components/mma/cancel/cancellationSaves/ValueOfSupport';

afterEach(cleanup);

describe('Value of Support page', () => {
	it('displays all central components', () => {
		const { getByTestId } = render(<ValueOfSupport />);
		expect(getByTestId('thanks-heading')).toBeInTheDocument();
		expect(getByTestId('thanks-copy')).toBeInTheDocument();
		expect(getByTestId('thanks-banner')).toBeInTheDocument();
		expect(getByTestId('continue-cancellation-button')).toBeInTheDocument();
		expect(getByTestId('back-button')).toBeInTheDocument();
		expect(getByTestId('progress-bar')).toBeInTheDocument();
	});
});
