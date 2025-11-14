import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import type { Subscription } from '../../../../shared/productResponse';
import type { CardUpdateResponse } from '../../../components/mma/paymentUpdate/card/NewCardPaymentMethodDetail';
import type { NewPaymentMethodDetail } from '../../../components/mma/paymentUpdate/NewPaymentMethodDetail';
import {
	ConfirmedNewPaymentDetailsRenderer,
	PaymentMethodUpdated,
} from '../../../components/mma/paymentUpdate/PaymentDetailUpdateConfirmation';
import {
	digitalPackPaidByDirectDebit,
	guardianWeeklyExpiredCard,
	guardianWeeklyPaidByCard,
} from '../../../fixtures/productBuilder/testProducts';
import {
	digitalSubscriptionDD,
	guardianWeeklySubscriptionCard,
} from '../../../fixtures/subscription';

// mock functions for NewPaymentMethodDetail type
const matchesResponse = (_: CardUpdateResponse) => true;
const subHasExpectedPaymentType = (_?: Subscription) => true;
const detailToPayloadObject = () => {
	return {};
};
const newPaymentMethodDetailRender = () => <></>;
const confirmButtonWrapper = () => <></>;

const failureMessage =
	'We will take the outstanding payment within 24 hours, using your new card details.';

const newPaymentMethodDetailCard: NewPaymentMethodDetail = {
	apiUrlPart: 'card',
	name: 'card',
	friendlyName: 'payment card',
	paymentFailureRecoveryMessage: failureMessage,
	matchesResponse,
	subHasExpectedPaymentType,
	render: newPaymentMethodDetailRender,
	detailToPayloadObject,
	confirmButtonWrapper,
};

const newPaymentMethodDetailDD: NewPaymentMethodDetail = {
	apiUrlPart: 'dd',
	name: 'direct_debit',
	friendlyName: 'direct debit',
	matchesResponse,
	subHasExpectedPaymentType,
	render: newPaymentMethodDetailRender,
	detailToPayloadObject,
	confirmButtonWrapper,
};

const tests = [
	{
		data: {
			subscription: guardianWeeklySubscriptionCard,
			newPaymentMethodDetail: newPaymentMethodDetailCard,
			previousProductDetail: guardianWeeklyPaidByCard(),
		},
		expectations: [
			'Guardian Weekly',
			'ending 4242',
			'4 / 2024',
			'£135.00 / annual',
			'10 December 2021',
		],
	},
	{
		data: {
			subscription: digitalSubscriptionDD,
			newPaymentMethodDetail: newPaymentMethodDetailDD,
			previousProductDetail: digitalPackPaidByDirectDebit(),
		},
		expectations: [
			'Digital Plus',
			'ending 911',
			'20-00-00',
			'£99.00 / annual',
			'18 December 2021',
		],
	},
];

describe('ConfirmedNewPaymentDetailsRenderer component', () => {
	test.each(tests)(
		'Summary table shows correct data for %s',
		({ data, expectations }) => {
			render(
				<ConfirmedNewPaymentDetailsRenderer
					subscription={data.subscription}
					subHasExpectedPaymentType={true}
					previousProductDetail={data.previousProductDetail}
				/>,
			);

			expectations.map((toTest) =>
				expect(screen.queryByText(toTest)).toBeInTheDocument(),
			);
		},
	);
});

test('PaymentMethodUpdated component does not display failure message', () => {
	render(
		<MemoryRouter>
			<PaymentMethodUpdated
				subs={[{ subscription: guardianWeeklySubscriptionCard }]}
				subHasExpectedPaymentType={true}
				previousProductDetail={guardianWeeklyPaidByCard()}
				paymentFailureRecoveryMessage={failureMessage}
			/>
		</MemoryRouter>,
	);

	expect(screen.queryByText(failureMessage)).not.toBeInTheDocument();
});

test('PaymentMethodUpdated component displays failure message when necessary', () => {
	render(
		<MemoryRouter>
			<PaymentMethodUpdated
				subs={[{ subscription: guardianWeeklySubscriptionCard }]}
				subHasExpectedPaymentType={true}
				previousProductDetail={guardianWeeklyExpiredCard()}
				paymentFailureRecoveryMessage={failureMessage}
			/>
		</MemoryRouter>,
	);

	expect(screen.queryByText(failureMessage)).toBeInTheDocument();
});
