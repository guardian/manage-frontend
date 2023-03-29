import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { YourDataSection } from '../../../components/mma/dataPrivacy/YourDataSection';
import type { ConsentOption } from '../../../components/mma/identity/models';
import { ConsentOptionType } from '../../../components/mma/identity/models';

afterEach(cleanup);

describe('YourDataSection', () => {
	const consents: ConsentOption[] = [
		{
			id: 'personalised_advertising',
			isChannel: false,
			isProduct: false,
			name: 'Allow personalised advertising using this data - this supports the Guardian',
			subscribed: false,
			type: ConsentOptionType.OPT_OUT,
		},
		{
			id: 'profiling_optout',
			isChannel: false,
			isProduct: false,
			name: 'Allow the Guardian to analyse this data to improve marketing content',
			subscribed: true,
			type: ConsentOptionType.OPT_OUT,
		},
	];
	const toggleConsent = (id: string) => {
		return {
			id,
		};
	};
	it('correctly displays the heading', () => {
		render(
			<YourDataSection
				consents={consents}
				toggleConsent={toggleConsent}
			/>,
		);
		expect(screen.getAllByText('Your account data')).toBeDefined();
	});

	it('correctly displays the toggle buttons', () => {
		render(
			<YourDataSection
				consents={consents}
				toggleConsent={toggleConsent}
			/>,
		);
		expect(
			screen.getAllByText(
				'Allow personalised advertising using this data - this supports the Guardian',
			),
		).toBeDefined();
		expect(
			screen.getAllByText(
				'Allow the Guardian to analyse this data to improve marketing content',
			),
		).toBeDefined();
		expect(screen.findByRole('switch')).toBeDefined();
	});
});
