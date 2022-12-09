import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OptOutSection } from '../../../components/identity/emailAndMarketing/OptOutSection';
import type { ConsentOption } from '../../../components/identity/models';
import { ConsentOptionType } from '../../../components/identity/models';

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
			screen.getByLabelText(
				'Allow the Guardian to send communications by post',
			),
		).toBeChecked();
		expect(
			screen.getByLabelText(
				'Allow the Guardian to send communications by telephone',
			),
		).not.toBeChecked();
		expect(screen.getByLabelText('Allow optin consent')).toBeChecked();
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
