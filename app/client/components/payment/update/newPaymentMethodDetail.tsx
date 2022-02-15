import React from 'react';
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

type MaybeNewPaymentMethodDetail = NewPaymentMethodDetail | {};

export function isNewPaymentMethodDetail(
	maybeDetail: MaybeNewPaymentMethodDetail,
): maybeDetail is NewPaymentMethodDetail {
	return (
		maybeDetail.hasOwnProperty('name') &&
		maybeDetail.hasOwnProperty('detailToPayloadObject')
	);
}

export const NewPaymentMethodContext: React.Context<MaybeNewPaymentMethodDetail> =
	React.createContext({});

export class PaymentUpdateAsyncLoader extends AsyncLoader<object> {}
