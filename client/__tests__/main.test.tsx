import { create } from 'react-test-renderer';
import { Main } from '../components/main';

describe('Main', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		jest.setSystemTime(new Date('2022-01-01'));
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('renders something', () => {
		const rendered = create(
			<Main>
				<p>hi</p>
			</Main>,
		);

		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
