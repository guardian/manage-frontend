import { render } from '@testing-library/react';
import { Lines } from '../../../components/mma/identity/Lines';

describe('Lines', () => {
	it('draws one line when n = 1', () => {
		const { container } = render(<Lines n={1} />);
		expect(container).toMatchSnapshot();
	});
	it('draws one line when n = 2', () => {
		const { container } = render(<Lines n={2} />);
		expect(container).toMatchSnapshot();
	});
});
