import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OptOutSection } from '../../../components/identity/EmailAndMarketing/OptOutSection';
import {
	ConsentOption,
	ConsentOptionType,
} from '../../../components/identity/models';

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
	});
});

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
];