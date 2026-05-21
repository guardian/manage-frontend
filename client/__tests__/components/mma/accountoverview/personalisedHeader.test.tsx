import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import type { MPAPIResponse } from '../../../../../shared/mpapiResponse';
import { PersonalisedHeader } from '../../../../components/mma/accountoverview/PersonalisedHeader';
import { toMembersDataApiResponse } from '../../../../fixtures/mdapiResponse';
import { monthlyContributionPaidByCard } from '../../../../fixtures/productBuilder/testProducts';

describe('PersonalisedHeader', () => {
	it('renders nothing when there are no products and app subscriptions cannot be loaded', () => {
		const mdapiResponse = toMembersDataApiResponse();

		expect(() =>
			render(
				<PersonalisedHeader
					mdapiResponse={mdapiResponse}
					mpapiResponse={null}
				/>,
			),
		).not.toThrow();

		expect(screen.queryByText(/^Hi,/)).not.toBeInTheDocument();
	});

	it('ignores invalid dates and still renders when a valid product date exists', () => {
		const product = monthlyContributionPaidByCard();
		product.joinDate = '2023-04-01';

		const mpapiResponse = {
			subscriptions: [
				{
					subscriptionId: 'sub-id',
					valid: true,
					from: 'not-a-date',
					productId: 'uk.co.guardian.gia.1month',
				},
			],
		} as MPAPIResponse;

		render(
			<PersonalisedHeader
				mdapiResponse={toMembersDataApiResponse(product)}
				mpapiResponse={mpapiResponse}
			/>,
		);

		expect(screen.getByText('Hi, test')).toBeInTheDocument();
		expect(
			screen.getByText(
				"Thank you for funding the Guardian's independent journalism since April 2023",
			),
		).toBeInTheDocument();
	});
});
