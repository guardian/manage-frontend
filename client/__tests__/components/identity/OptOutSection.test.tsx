import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OptOutSection } from '../../../components/mma/identity/emailAndMarketing/OptOutSection';
import type { ConsentOption } from '../../../components/mma/identity/models';
import { ConsentOptionType } from '../../../components/mma/identity/models';

afterEach(cleanup);

const mockClickHandler = jest.fn();

describe('OptOutSection component', () => {
	it('correctly displays toggle switch values for OPT OUT consent types', () => {
		render(
			<OptOutSection
				consents={idapiConsentsFixture}
				clickHandler={mockClickHandler}
			/>,
		);

		expect(
			screen.getByRole('switch', {
				name: 'Allow the Guardian to send communications by post',
			}),
		).toBeChecked();
		expect(
			screen.getByRole('switch', {
				name: 'Allow the Guardian to send communications by telephone',
			}),
		).not.toBeChecked();
	});
});

// ID values are hardcoded in the component
const idapiConsentsFixture: ConsentOption[] = [
	{
		id: 'post_optout',
		name: 'Allow the Guardian to send communications by post',
		isProduct: false,
		isChannel: false,
		type: ConsentOptionType.OPT_OUT,
		subscribed: false,
	},
	{
		id: 'phone_optout',
		name: 'Allow the Guardian to send communications by telephone',
		isProduct: false,
		isChannel: false,
		type: ConsentOptionType.OPT_OUT,
		subscribed: true,
	},
	{
		id: 'personalised_advertising',
		name: 'Allow optin consent',
		isProduct: false,
		isChannel: false,
		type: ConsentOptionType.EMAIL,
		subscribed: true,
	},
];
