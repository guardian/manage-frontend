import type * as React from 'react';
import type { Subscription } from '../../../../shared/productResponse';

type PaymentUpdateTypeName = 'card' | 'direct_debit';
type PaymentUpdateTypeApiUrlPart = 'card' | 'dd';

export interface NewPaymentMethodDetail {
	readonly name: PaymentUpdateTypeName;
	readonly apiUrlPart: PaymentUpdateTypeApiUrlPart;
	readonly detailToPayloadObject: () => object;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we're assuming the matchesResponse argument can be anything?
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
