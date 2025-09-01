import { create } from 'react-test-renderer';
import { Main } from '../components/shared/Main';

// Mock ophan to return consistent viewId
jest.mock('@guardian/ophan-tracker-js/MMA', () => ({
	init: jest.fn(),
	record: jest.fn(),
	sendInitialEvent: jest.fn(),
	viewId: 'test-view-id-123',
}));

describe('Main', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		jest.setSystemTime(new Date('2022-01-01'));

		// Set up window.guardian mock
		Object.defineProperty(window, 'guardian', {
			writable: true,
			value: {
				domain: 'theguardian.com',
				ophan: {
					viewId: 'test-view-id-123',
				},
			},
		});
	});

	afterEach(() => {
		jest.useRealTimers();
		// Clean up the guardian mock
		Object.defineProperty(window, 'guardian', {
			writable: true,
			value: undefined,
		});
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
