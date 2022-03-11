import * as React from 'react';
import { Subscription } from '../../../../shared/productResponse';
import AsyncLoader from '../../asyncLoader';

type PaymentUpdateTypeName = 'card' | 'direct_debit';
type PaymentUpdateTypeApiUrlPart = 'card' | 'dd';

export interface NewPaymentMethodDetail {
	readonly name: PaymentUpdateTypeName;
	readonly apiUrlPart: PaymentUpdateTypeApiUrlPart;
	readonly detailToPayloadObject: () => object;
	readonly matchesResponse: (response: any) => boolean;
	readonly subHasExpectedPaymentType: (
		subscription?: Subscription,
	) => boolean;
	readonly render: (subscription?: Subscription) => React.ReactNode;
	readonly friendlyName: string;
	readonly paymentFailureRecoveryMessage?: string;
	readonly confirmButtonWrapper: (confirmButton: JSX.Element) => JSX.Element;
	readonly updatedSuccessExtras?: JSX.Element;
}

export function isNewPaymentMethodDetail(
	newPaymentMethodDetail: NewPaymentMethodDetail,
) {
	return (
		newPaymentMethodDetail.hasOwnProperty('name') &&
		newPaymentMethodDetail.hasOwnProperty('detailToPayloadObject')
	);
}

export class PaymentUpdateAsyncLoader extends AsyncLoader<object> {}
