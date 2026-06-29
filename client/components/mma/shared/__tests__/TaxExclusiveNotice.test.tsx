import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TaxExclusiveNotice } from '../TaxExclusiveNotice';

describe('TaxExclusiveNotice', () => {
	const copy = 'Taxes may apply to future payments.';

	it('shows the tax notice when taxExclusive is true', () => {
		render(<TaxExclusiveNotice taxExclusive={true} />);
		expect(screen.getByText(copy)).toBeInTheDocument();
	});

	it('renders nothing when taxExclusive is false', () => {
		const { container } = render(
			<TaxExclusiveNotice taxExclusive={false} />,
		);
		expect(screen.queryByText(copy)).not.toBeInTheDocument();
		expect(container).toBeEmptyDOMElement();
	});

	it('renders nothing when taxExclusive is undefined', () => {
		const { container } = render(<TaxExclusiveNotice />);
		expect(container).toBeEmptyDOMElement();
	});
});
